import { Component } from '../../../lib/component/component';
import { consoleDebug } from '../../../lib/tools/debug';
import { List } from '../../components/pet.list/list/list';

export class ListPage extends Component {
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.render();
    try {
      new List('div.list-slot');
    } catch (error) {
      consoleDebug((error as Error).message);
    }
  }

  render() {
    return super.innRender(this.selector);
  }

  private createTemplate() {
    return `
        <main>
            <h2 aria-label="Pets">Mascotas</h2>
            <div class="list-slot"></div>
        </main>
        `;
  }
}
