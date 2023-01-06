import { Component } from '../../../lib/component/component';
import header__ from './header.module.css';

export class Header extends Component {
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
        <div class="${header__.container}" role="presentation" aria-label="Header">
            Header
        </div>
        `;
  }
}
