import { Component } from '../../../lib/component/component';
import { Series } from '../../models/series';
import { ScoreStars } from '../score.stars/score.stars';
import card__ from './serie.card.module.css';

export class SeriesCard extends Component {
  children: Array<Component>;
  constructor(
    private selector: string,
    private serie: Series,
    private updateScore?: (serie: Series, score: number) => void
  ) {
    super();
    this.template = this.createTemplate();
    this.children = [];
    this.render();
  }
  render() {
    const element = super.innRender(this.selector);
    const scoreSelector = `.score-slot-${this.serie.id}`;
    const child = new ScoreStars(
      scoreSelector,
      this.serie.score,
      this.handleScore.bind(this)
    );
    this.children.push(child);
    return element;
  }

  handleScore(newScore: number) {
    if (this.updateScore === undefined) return;
    this.updateScore(this.serie, newScore);
  }

  private createTemplate() {
    const scoreSlot = `score-slot-${this.serie.id}`;
    return `
        <li class="${card__.container}" aria-label="Serie">
          <img class="${card__.seriePoster}"
            src="${this.serie.poster}"
            alt="${this.serie.name}" />
          <h4 class="${card__.serieTitle}">${this.serie.name}</h4>
          <p class="${card__.serieInfo}">${this.serie.creator} (${this.serie.year})</p>
          <div class="${scoreSlot}"></div>
          <i class="fas fa-times-circle ${card__['icon--delete']}"></i>
        </li>
        `;
  }
}
