import { Component } from '../../../lib/component/component';
import logo from '../../pokemon.logo.svg';

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
          <h2 aria-label="Home">Pokemon</h2>
          <img src=${logo} alt="SVG Pokemon Logo" />
        </main>
        `;
  }
}
