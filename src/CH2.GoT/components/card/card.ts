import { Component } from '../component/component.js';
import { Character } from '../../../CH1.GoT/models/character';
import { Counselor } from '../../../CH1.GoT/models/counselor';
import { Fighter } from '../../../CH1.GoT/models/fighter';
import { King } from '../../../CH1.GoT/models/king';
import { Squire } from '../../../CH1.GoT/models/squire';
import { emoji } from '../../../CH1.GoT/services/emojis';

type AnyCharacter = King & Fighter & Counselor & Squire;
type Actions = 'muere' | 'habla';

export class Card extends Component {
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
    const buttons = element.querySelectorAll('button');
    buttons.forEach((button) =>
      button.addEventListener('click', this.handleClick.bind(this))
    );
    return element;
  }

  private createOverlay = (item: AnyCharacter, characterType: string) => {
    const options = {
      king: `
      <li>Años de reinado: ${item?.kingdomYears?.toString()}</li>
      `,
      fighter: `
      <li>Arma: ${item?.weapon}</li>
      <li>Destreza: ${item?.skill}</li>
      `,
      counselor: `
      <li>Asesora a: ${item?.chief?.name}</li>
      `,
      squire: `
      <li>Servilismo: ${item?.submission}</li>
      <li>Sirve a: ${item?.master?.name}</li>
      `,
    };

    return options[characterType as keyof typeof options];
  };

  private createTemplate() {
    const fullName = `${this.character.name} ${this.character.family}`;
    const image = `img/${this.character.name.toLowerCase()}.jpg`;
    const state = this.character.isAlive
      ? '<i class="fas fa-thumbs-up"></i>'
      : '<i class="fas fa-thumbs-down"></i>';
    const characterType: string = Object.getPrototypeOf(
      this.character
    ).constructor.name.toLowerCase();
    const overlay = this.createOverlay(
      this.character as AnyCharacter,
      characterType
    );

    return `
      <li class="character col">
        <div class="card character__card">
          <img
            src="${image}"
            alt="${fullName}"
            class="character__picture card-img-top"
          />
          <div class="card-body">
            <h2 class="character__name card-title h4">${fullName}</h2>
            <div class="character__info">
              <ul class="list-unstyled">
                <li>Edad: ${this.character.age} años</li>
                <li>Estado: ${state}</li>
              </ul>
            </div>
            <div class="character__overlay">
              <ul class="list-unstyled">
                ${overlay}
              </ul>
              <div class="character__actions">
                <button class="character__action btn" ${
                  !this.character.isAlive && 'disabled'
                }
                  data-id=${this.character.name}>
                  habla</button>
                <button class="character__action btn" ${
                  !this.character.isAlive && 'disabled'
                }
                  data-id=${this.character.name}>
                  muere</button>
              </div>
            </div>
          </div>
          <i class="emoji">
            ${emoji[characterType as keyof typeof emoji]}
          </i>
        </div>
      </li>
    `;
  }

  private handleClick(ev: Event) {
    const element = <HTMLButtonElement>ev.target;
    const action = <Actions>element.textContent?.trim();
    const characterName = this.character.name;
    // <string>element.dataset.id;
    const possibleActions = {
      muere: () => this.handleDead(characterName),
      habla: () => this.handleCommunicate(characterName),
    };
    possibleActions[action]();
  }
}
