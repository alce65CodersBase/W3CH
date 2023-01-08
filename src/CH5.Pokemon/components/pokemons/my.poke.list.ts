import { Component } from '../../../lib/component/component';
import { StateStructure } from '../../services/state/state';
import { PokeList } from './poke.list';

export class MyPokeList extends Component {
  #state;
  constructor(private selector: string, state: StateStructure) {
    super();
    this.#state = state;
    this.template = this.#createTemplate();
    this.render();
    new PokeList('.my-poke-list__list', this.#state.favorites, state);
  }

  render() {
    const element = super.innRender(this.selector);
    return element;
  }

  #createTemplate() {
    const template = `
      <h2>Pokemons favoritos</h2>
      <div class="my-poke-list">
        <ul class="my-poke-list__list"></ul>
      </div>`;
    return template;
  }
}
