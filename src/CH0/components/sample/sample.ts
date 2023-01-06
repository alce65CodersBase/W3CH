import { Component } from '../../../lib/component/component';
import sample from './sample.module.css';

export class Sample extends Component {
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
        <div class="${sample.container}" role="generic">
            Sample
        </div>
        `;
  }
}
