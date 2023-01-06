import { Component } from '../../../lib/component/component';
import { ScoreStars } from '../score.stars/score.stars';
import card__ from './serie.card.module.css';

export class SeriesCard extends Component {
  children: Array<Component>;
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.children = [];
    this.render();
  }
  render() {
    const element = super.innRender(this.selector);
    const child = new ScoreStars(`.serie-slot`);
    this.children.push(child);
    return element;
  }

  private createTemplate() {
    return `
        <div class="${card__.container} serie-slot" role="presentation" aria-label="Serie">
            Serie
        </div>
        `;
  }
}
