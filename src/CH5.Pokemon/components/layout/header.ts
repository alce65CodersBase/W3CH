import { Component } from '../../../lib/component/component';
import logo from '../../pokemon.logo.svg';

export class Header extends Component {
  constructor(private selector: string, title = 'Pokemons') {
    super();
    this.template = this.#createTemplate(title);
    this.render();
  }
  render() {
    return super.innRender(this.selector);
  }
  #createTemplate(title: string) {
    return `
      <header class="header__main">
        <h1 class="header__title">
          <span class='header__text'>${title}</span>
          <img src=${logo} alt="SVG Pokemon Logo" />
        </h1>

      </header>
      `;
  }
}
