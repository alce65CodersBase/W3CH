import { Component } from '../../../lib/component/component';
import card__ from './card.module.css';

export class SeriesCard extends Component {
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
        <div class="${card__.container}" role="generic">
            List
        </div>
        `;
  }
}
