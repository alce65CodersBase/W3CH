import { Character } from '../../../CH1.GoT/models/character.js';
import { createCharacters } from '../../../CH1.GoT/services/characters.js';
import { Component } from '../../components/component/component.js';
import { consoleDebug } from '../../tools/debug.js';

export class HomePage extends Component {
  characters: Array<Character>;
  constructor(private selector: string) {
    super();
    this.characters = createCharacters();
    consoleDebug(this.characters);
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    return super.innRender(this.selector);
  }

  private createTemplate() {
    return `<main aria-label="Home"></main>`;
  }
}
