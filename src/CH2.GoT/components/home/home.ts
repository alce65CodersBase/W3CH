import { Character } from '../../../CH1.GoT/models/character.js';
import { createCharacters } from '../../../CH1.GoT/services/characters.js';
import { Component } from '../../components/component/component.js';
import { consoleDebug } from '../../tools/debug.js';
import { Card } from '../card/card.js';
import { Communicate } from '../communicate/communicate.js';

export class HomePage extends Component {
  characters: Array<Character>;
  cards: Array<Card>;
  constructor(private selector: string) {
    super();
    this.characters = createCharacters();
    this.cards = [];
    consoleDebug(this.characters);
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    super.cleanHtml(this.selector);
    const element = super.innRender(this.selector);
    const communicate = this.handleCommunicate.bind(this);
    const dead = this.handleDead.bind(this);
    this.characters.forEach((item) => {
      const card = new Card('.characters-list', item, dead, communicate);
      this.cards.push(card);
    });
    return element;
  }

  private createTemplate() {
    return `<main class='container' aria-label="Home">
      <ul class="characters-list row list-unstyled"></ul>
      <div class="communications"></div>
    </main>`;
  }

  handleCommunicate(characterName: string) {
    consoleDebug('Habla ' + characterName);
    const character = this.characters.find(
      (item) => item.name === characterName
    ) as Character;

    const component = new Communicate('.communications', character);
    const element = component.getElement() as HTMLElement;
    element.classList.toggle('on');
    setTimeout(() => {
      element.classList.toggle('on');
      element.innerHTML = '';
    }, 2000);
  }

  handleDead(characterName: string) {
    consoleDebug('Muere' + characterName);
    const id = this.characters.findIndex((item) => item.name === characterName);
    this.characters[id].dead();
    this.render();
  }
}
