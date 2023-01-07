import { Component } from '../../../lib/component/component';
import { consoleDebug } from '../../../lib/tools/debug';
import { Header } from '../../components/header/header';
import { List } from '../../components/list/list';
import { Series } from '../../models/series';
import { getSeries } from '../../services/mock.repo';
import series__ from './series.module.css';

export class SeriesPage extends Component {
  children: Array<Component>;
  series: Array<Series>;
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.children = [];
    this.series = [];
    this.loadSeries();
  }

  render() {
    const element = super.innRender(this.selector);
    const child = new Header('.header-slot');
    this.children.push(child);
    const pendingSeries = this.series.filter((item) => item.score === 0);
    const child2 = new List(
      'section.list-slot',
      'series-pending',
      pendingSeries
    );
    this.children.push(child2);
    // Segunda lista para series vistas
    const watchedSeries = this.series.filter((item) => item.score > 0);
    const child3 = new List(
      'section.list-slot',
      'series-watched',
      watchedSeries
    );
    this.children.push(child3);
    return element;
  }

  loadSeries() {
    this.series = getSeries();
    consoleDebug(this.series);
    this.render();
  }

  private createTemplate() {
    return `
      <div class="${series__.container} header-slot">
        <!--Antes Se inyecta el componente header-->
        <main class="main">
          <section class="list-slot">
            <h2 class="${series__.sectionTitle}">Series list</h2>
            <!--A continuación se inyecta el componente List-->
          </section>
        </main>
      </div>`;
  }
}
