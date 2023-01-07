import { Component } from '../../../lib/component/component';

export class HomePage extends Component {
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    return element;
  }

  private createTemplate() {
    return `
        <main>
          <h2 aria-label="Home">Foo</h2>
        </main>
        `;
  }
}
