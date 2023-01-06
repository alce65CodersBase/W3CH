import { Component } from '../../../lib/component/component';
import { SeriesCard } from '../serie.card/serie.card';
import list__ from './list.module.css';

export class List extends Component {
  children: Array<Component>;
  constructor(
    private selector: string,
    public filter: string = 'series-pending'
  ) {
    super();
    this.template = this.createTemplate();
    this.children = [];
    this.render();
  }
  render() {
    const filter = this.filter;
    const element = super.innRender(this.selector);
    const child = new SeriesCard(`ul.${filter}-cards-slot`);
    this.children.push(child);
    return element;
  }

  private createTemplate() {
    const filter = this.filter;
    const slot = this.filter + '-cards-slot';
    const title = filter.includes('pending')
      ? 'Pending series'
      : 'Watched series';
    return `
        <section class="${filter} ${list__.container} lista" role="region" aria-label="${filter}">
          <h3 class="${list__.subsectionTitle}">${title}</h3>
          <p class="${list__.info}">You have 4 series pending to watch</p>
          <!--<p class="${list__.info}">Congrats! You've watched all your series</p>-->
          <ul class="${list__.seriesList} ${slot}">
          <!--A continuación se inyectan los componentes SeriesCard-->
          </ul>
        </section>
        `;
  }
}
