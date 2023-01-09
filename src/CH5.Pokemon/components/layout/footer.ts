import { Component } from '../../../lib/component/component';

export class Footer extends Component {
  constructor(
    private selector: string,
    author = 'Alejandro Cerezo',
    brand = 'ISDI Coders'
  ) {
    super();
    this.template = this.#createTemplate(author, brand);
    this.render();
  }

  render() {
    return super.innRender(this.selector, 'end');
  }

  #createTemplate(author: string, brand: string) {
    return `
      <footer>
          <address>${author} - ${brand}</address>
      </footer>
      `;
  }
}
