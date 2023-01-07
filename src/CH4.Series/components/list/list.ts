import { Component } from '../../../lib/component/component';
import { Series } from '../../models/series';
import { SeriesCard } from '../serie.card/serie.card';
import list__ from './list.module.css';

export class List extends Component {
  children: Array<Component>;
  constructor(
    private selector: string,
    private filter: 'series-watched' | 'series-pending',
    private series: Array<Series>,
    private deleteSerie: (serie: Series) => void,
    private updateScore?: (serie: Series, score: number) => void
  ) {
    super();
    this.template = this.createTemplate();
    this.children = [];
    this.render();
  }
  render() {
    const filter = this.filter;
    const element = super.innRender(this.selector);
    this.series.forEach((item) => {
      const child = new SeriesCard(
        `ul.${filter}-cards-slot`,
        item,
        this.deleteSerie,
        this.updateScore
      );
      this.children.push(child);
    });
    return element;
  }

  private createTemplate() {
    const filter = this.filter;
    const slot = this.filter + '-cards-slot';
    let title = 'Pending series';
    let stateInfo = `You have ${this.series.length} series pending to watch`;
    if (filter.includes('watched')) {
      title = 'Watched series';
      stateInfo =
        this.series.length === 5
          ? `Congrats! You've watched all your series`
          : '';
    }

    return `
        <section class="${filter} ${list__.container} lista" role="region" aria-label="${filter}">
          <h3 class="${list__.subsectionTitle}">${title}</h3>
          <p class="${list__.info}">${stateInfo}</p>
          <ul class="${list__.seriesList} ${slot}">
          <!--A continuación se inyectan los componentes SeriesCard-->
          </ul>
        </section>
        `;
  }
}
