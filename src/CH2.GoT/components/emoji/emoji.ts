import { Component } from '../component/component.js';
import { Character } from '../../../CH1.GoT/models/character';

enum emoji {
  'king' = '👑',
  'fighter' = '🗡',
  'counselor' = '🎓',
  'squire' = '🛡',
}

export class Emoji extends Component {
  constructor(private selector: string, private character: Character) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    return element;
  }

  private createTemplate() {
    // const state = this.character.isAlive
    //   ? '<i class="fas fa-thumbs-up"></i>'
    //   : '<i class="fas fa-thumbs-down"></i>';
    const characterType: string = Object.getPrototypeOf(
      this.character
    ).constructor.name.toLowerCase();

    return `
      <i class="emoji">
        ${emoji[characterType as keyof typeof emoji]}
      </i>
    `;
  }
}
