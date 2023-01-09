import { Component } from '../../../lib/component/component';
import { Pokemon } from '../../models/pokemon';
import { State } from '../../services/state/state';
import { FavoriteIcon } from '../pokemons/favorite.icon';
import { PokeItem } from '../pokemons/poke.item';

export class PokeList extends Component {
  constructor(
    private selector: string,
    private pokeData: Array<Pokemon>,
    private state: State
  ) {
    super();
    this.render();
    this.manageComponent();
  }

  render() {
    this.element = document.querySelector(this.selector) as HTMLElement;
    super.cleanHtml(this.selector);
    this.pokeData.forEach((poke: Pokemon) =>
      this.children.push(new PokeItem(this.selector, poke))
    );
    return this.element;
  }

  private manageComponent() {
    const componentElement = this.element as HTMLElement;
    const icons = [
      ...componentElement.querySelectorAll('.poke-item__fav'),
    ] as Array<HTMLElement>;
    icons.forEach((icon) => {
      this.children.push(
        new FavoriteIcon(
          '#' + icon.id,
          this.state,
          +(icon.dataset.id as string)
        )
      );
    });
  }
}
