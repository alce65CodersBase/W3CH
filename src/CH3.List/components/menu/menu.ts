import { Component } from '../../../lib/component/component.js';
import { MenuOptionsType } from '../../types/menu.options.js';

export class Menu extends Component {
  constructor(private selector: string, private menuOptions: MenuOptionsType) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    return super.innRender(this.selector);
  }

  private createTemplate() {
    const options = this.menuOptions
      .map((item) => `<li><a href="${item.path}">${item.label}</a></li>`)
      .reduce((a, b) => a + b);

    return `
        <nav class="menu">
            <ul>
                ${options}
            </ul>
        </nav>
        `;
  }
}
