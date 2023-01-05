// import { List } from '../../components/todo.list/list.js';
import { Component } from '../../../lib/component/component';
import { consoleDebug } from '../../../lib/tools/debug';
import { List } from '../../components/some.list/list/list';

export class ListPage extends Component {
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.render();
    try {
      new List('.todo-wrapper');
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
            <h2 aria-label="List">Lista de ...</h2>
            <div class="todo-wrapper"></div>
        </main>
        `;
  }
}
