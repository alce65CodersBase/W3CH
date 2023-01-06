import { Component } from '../../../lib/component/component';
import { Header } from '../../components/header/header';
import { List } from '../../components/list/list';
import series__ from './series.module.css';

export class SeriesPage extends Component {
  children: Array<Component>;
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.children = [];
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    const child = new Header('.header-slot');
    this.children.push(child);
    const child2 = new List('section.list-slot');
    this.children.push(child2);
    // Segunda lista para series vistas
    // const child3 = new List('main');
    // this.children.push(child3);
    return element;
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
