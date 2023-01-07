import { Component } from '../../../lib/component/component';
import { Series } from '../../models/series';
import score__ from './score.stars.module.css';

const STARS = [1, 2, 3, 4, 5];

export class ScoreStars extends Component {
  constructor(
    private selector: string,
    private score: number,
    private handleScore: (score: number) => void
  ) {
    super();
    this.template = this.createTemplate();
    this.render();
  }
  render() {
    const element = super.innRender(this.selector);
    if (this.score === 0) {
      const stars = element.querySelectorAll('li');
      stars.forEach((item) =>
        item.addEventListener('click', this.handleClick.bind(this))
      );
    }
    return element;
  }

  handleClick(ev: Event) {
    const newScore = (ev.target as HTMLUListElement).dataset.id;
    this.handleScore(Number(newScore));
  }

  private createTemplate() {
    const stars = STARS.map((item) => {
      const iconType = item <= this.score ? 'fas' : 'far';
      const label = `Star${item}`;
      return `
        <li class="score__star" role="button" aria-label="${label}">
          <i class="icon--score ${iconType} fa-star" title="${item}/5" data-id='${item}'></i>
        </li>
      `;
    });
    return `<ul class="${score__.container}">${stars.join(' ')}</ul>`;
  }
}
