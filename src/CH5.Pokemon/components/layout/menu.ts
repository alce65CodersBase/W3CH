import { Component } from '../../../lib/component/component';
import { MenuOptionsType } from '../../types/menu.options';

export class Menu extends Component {
  constructor(private selector: string, private options: MenuOptionsType) {
    super();
    this.template = this.#createTemplate();
    this.render();
  }
  render() {
    super.innRender(this.selector);
  }
  #createTemplate() {
    let template = '';
    this.options.forEach((item) => {
      template += `
        <li class="poke-menu__item">
          <a href="${item.path}" class="poke-menu__link">${item.label}</a>
        </li>`;
    });

    return `
      <nav class="poke-menu">
        <ul class="poke-menu__list-items">
          ${template}
        </ul>
      </nav>
    `;
  }
}
