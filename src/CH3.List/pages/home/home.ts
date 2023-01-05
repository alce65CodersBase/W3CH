import { Component } from '../../../lib/component/component';

export class HomePage extends Component {
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    return super.innRender(this.selector);
  }

  private createTemplate() {
    return `
        <main>
          <h2 aria-label="Home">Listas de componentes</h2>
        </main>
        `;
  }
}
