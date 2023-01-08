import { Component } from '../../../lib/component/component';
import { StateStructure } from '../../services/state/state';
import { PokeList } from './poke.list';

export class HomePokeList extends Component {
  #state;
  constructor(private selector: string, state: StateStructure) {
    super();
    this.#state = state;
    this.template = this.#createTemplate();
    this.render();
    new PokeList('.poke-list__list', this.#state.pokeData, this.#state);
  }

  render() {
    const element = super.innRender(this.selector);
    return element;
  }

  #createTemplate() {
    const final = this.#state.nextUrl
      ? this.#state.nextUrl.split('=')[1].split('&')[0]
      : this.#state.count;
    const initial = +final - 19;
    const paginationText = `${initial} - ${final} / ${this.#state.count}`;
    const template = `
            <h2>Lista de Pokemons (${paginationText})</h2>
            <ul class="poke-list__list"></ul>
            <div class="pagination"></div>`;
    return template;
  }
}
