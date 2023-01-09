import { Component } from '../../../lib/component/component';
import { Sprites } from '../../models/pokemon';

type PokeItemStructure = {
  id: number;
  name: string;
  sprites: Sprites;
};

export class PokeItem extends Component {
  constructor(private selector: string, private poke: PokeItemStructure) {
    super();
    this.template = this.createTemplate();
    this.render();
  }
  render() {
    return super.innRender(this.selector);
  }

  private createTemplate() {
    return `
        <li class="poke-item">
          <a class="poke-item__link" href='./detail.html?id=${this.poke.id}&origin=${this.selector}'>
              <span class="poke-item__link-label">${this.poke.name}</span>
              <span class="poke-item__link-sprite">
                  <img class="poke-item__link-sprite-front"
                  src="${this.poke.sprites?.front_default}" alt="${this.poke.name}">
                  <img class="poke-item__link-sprite-back"
                  src="${this.poke.sprites?.back_default}" alt="${this.poke.name}">
              </span>
          </a>
          <span class="poke-item__fav" id="fav-${this.poke.id}" data-id="${this.poke.id}" ></span>
        </li>`;
  }
}
