import { Component } from '../../../lib/component/component';
import score__ from './score.stars.module.css';

const STARS = [1, 2, 3, 4, 5];

export class ScoreStars extends Component {
  constructor(private selector: string, private score: number) {
    super();
    this.template = this.createTemplate();
    this.render();
  }
  render() {
    const element = super.innRender(this.selector);
    return element;
  }

  private createTemplate() {
    const stars = STARS.map((item) => {
      const iconType = item <= this.score ? 'fas' : 'far';
      const label = `Star${item}`;
      return `
        <li class="score__star" aria-label="${label}">
          <i class="icon--score ${iconType} fa-star" title="${item}/5"></i>
        </li>
      `;
    });
    return stars.join(' ');
  }
}
