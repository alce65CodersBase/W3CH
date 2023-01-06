import { Component } from '../../../lib/component/component';
import { Header } from '../../components/header/header';
import { List } from '../../components/list/list';

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
    const child = new Header('main');
    this.children.push(child);
    const child2 = new List('main');
    this.children.push(child2);
    // Segunda lista para series vistas
    // const child3 = new List('main');
    // this.children.push(child3);
    return element;
  }

  private createTemplate() {
    return `
        <main>
          <h2 aria-label="Series">Series</h2>
        </main>
        `;
  }
}
