import { Component } from '../../../lib/component/component';
import header__ from './header.module.css';

export class Header extends Component {
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.render();
  }
  render() {
    return super.innRender(this.selector, 'start');
  }

  private createTemplate() {
    return `
      <header class="${header__.container} main-header"
        role="presentation" aria-label="Header">
        <h1 class="main-title">My Series</h1>
      </header>
    `;
  }
}
