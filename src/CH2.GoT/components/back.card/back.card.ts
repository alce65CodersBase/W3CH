import { Component } from '../component/component.js';
import { Character } from '../../../CH1.GoT/models/character';
import { Counselor } from '../../../CH1.GoT/models/counselor';
import { Fighter } from '../../../CH1.GoT/models/fighter';
import { King } from '../../../CH1.GoT/models/king';
import { Squire } from '../../../CH1.GoT/models/squire';
import styles from './back.card.module.css';

type AnyCharacter = King & Fighter & Counselor & Squire;
type Actions = 'muere' | 'habla';

export class BackCard extends Component {
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
    const characterType: string = Object.getPrototypeOf(
      this.character
    ).constructor.name.toLowerCase();
    const overlay = this.createOverlay(
      this.character as AnyCharacter,
      characterType
    );
    const buttonClass = `${styles.action} btn`;
    const isDisable = !this.character.isAlive && 'disabled';

    return `
      <div class="${styles.overlay} character__overlay">
        <ul class="list-unstyled">
          ${overlay}
        </ul>
        <div class="${styles.actions}">
          <button class="${buttonClass}" ${isDisable}
            data-id=${styles.action + ' btn'}>
            habla</button>
          <button class="${buttonClass}" ${isDisable}
            data-id=${this.character.name}>
            muere</button>
        </div>
      </div>
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
