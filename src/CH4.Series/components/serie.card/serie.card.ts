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
    const child = new ScoreStars(`.score`);
    this.children.push(child);
    return element;
  }

  private createTemplate() {
    return `
        <li class="${card__.container} serie-slot" role="presentation" aria-label="Serie">
          <img class="${card__.seriePoster}"
            src="https://m.media-amazon.com/images/M/MV5BZGJjYzhjYTYtMDBjYy00OWU1LTg5OTYtNmYwOTZmZjE3ZDdhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg"
            alt="The Sopranos poster" />
          <h4 class="${card__.serieTitle}">The Sopranos</h4>
          <p class="${card__.serieInfo}">David Chase (1999)</p>
          <ul class="${card__.score}"></ul>
          <i class="fas fa-times-circle ${card__['icon--delete']}"></i>
        </li>
        `;
  }
}
