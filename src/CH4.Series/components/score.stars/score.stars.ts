import { Component } from '../../../lib/component/component';
import score__ from './score.module.css';

export class ScoreStars extends Component {
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
        <div class="${score__.container}" role="generic">
            List
        </div>
        `;
  }
}
