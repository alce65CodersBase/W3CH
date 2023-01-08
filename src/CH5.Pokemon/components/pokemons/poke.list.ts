import { Component } from '../../../lib/component/component';
import { Pokemon } from '../../models/pokemon';
import { StateStructure } from '../../services/state/state';
import { PokeItem } from './poke.item';

export class PokeList extends Component {
  #state;
  #pokeData;
  constructor(
    private selector: string,
    pokeData: Array<Pokemon>,
    state: StateStructure
  ) {
    super();
    this.#state = state;
    this.#pokeData = pokeData;
    this.render();
    this.#manageComponent();
  }

  render() {
    this.#pokeData.forEach(
      (poke: Pokemon) => new PokeItem(this.selector, poke)
    );
  }

  #manageComponent() {
    const componentElement = this.element as HTMLElement;
    const icons = [
      ...componentElement.querySelectorAll('.poke-item__fav'),
    ] as Array<HTMLElement>;
    icons.forEach((icon) => {
      // new FavoriteIcon('#' + icon.id, this.#state, icon.dataset.id);
    });
  }
}
