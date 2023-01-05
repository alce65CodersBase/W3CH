import { Component } from '../../../lib/component/component.js';
import { Character } from '../../../CH1.GoT/models/character';
import emoji__ from './emoji.module.css';

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
    const classCSS = [emoji__.emoji];
    if (!this.character.isAlive) classCSS.push(emoji__.rotate);
    const characterType: string = Object.getPrototypeOf(
      this.character
    ).constructor.name.toLowerCase();

    return `
      <i class="${classCSS.join(' ')}">
        ${emoji[characterType as keyof typeof emoji]}
      </i>
    `;
  }
}
