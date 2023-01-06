import { Component } from '../../../lib/component/component';
import list__ from './list.module.css';

export class List extends Component {
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
        <div class="${list__.container}" role="generic">
            List
        </div>
        `;
  }
}
