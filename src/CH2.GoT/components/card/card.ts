import { Component } from '../../../lib/component/component';
import { Character } from '../../../CH1.GoT/models/character';
import { BackCard } from '../back.card/back.card';
import { Emoji } from '../emoji/emoji';
import character__ from './card.module.css';

export class Card extends Component {
  back!: BackCard;
  emoji!: Emoji;
  constructor(
    private selector: string,
    private character: Character,
    private handleDead: (characterName: string) => void,
    private handleCommunicate: (characterName: string) => void
  ) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    this.back = new BackCard(
      `.card-${this.character.name} .card-body`,
      this.character,
      this.handleDead,
      this.handleCommunicate
    );
    this.emoji = new Emoji(`.card-${this.character.name}`, this.character);
    return element;
  }

  private createTemplate() {
    const fullName = `${this.character.name} ${this.character.family}`;
    const image = `img/${this.character.name.toLowerCase()}.jpg`;
    const state = this.character.isAlive
      ? '<i class="fas fa-thumbs-up"></i>'
      : '<i class="fas fa-thumbs-down"></i>';

    return `
      <li class="${character__.container} col character">
        <div class="card ${character__.card} card-${this.character.name}">
          <img
            src="${image}"
            alt="${fullName}"
            class="${character__.picture} card-img-top"
          />
          <div class="card-body">
            <h2 class="${character__.name} card-title h4">${fullName}</h2>
            <div class="${character__.info}">
              <ul class="list-unstyled">
                <li>Edad: ${this.character.age} años</li>
                <li>Estado: ${state}</li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    `;
  }
}
