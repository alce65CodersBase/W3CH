import { Component } from '../component/component.js';
import { Character } from '../../../CH1.GoT/models/character';
import style from './emoji.module.css';

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
    const classCSS = [style.emoji];
    if (!this.character.isAlive) classCSS.push(style.rotate);
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
