import { Component } from '../../../lib/component/component';
import score__ from './score.stars.module.css';

export class ScoreStars extends Component {
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
        <div class="${score__.container}" role="presentation" aria-label="Stars">
          Stars
        </div>
        `;
  }
}
