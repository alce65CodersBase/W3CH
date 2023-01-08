import { Component } from '../../../lib/component/component';
import { MyPokeList } from '../../components/pokemons/my.poke.list';
import { StateStructure } from '../../services/state/state';

export class FavoritesPage extends Component {
  constructor(private selector: string, private state: StateStructure) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    new MyPokeList('.my-poke-list', this.state);
    return element;
  }

  private createTemplate() {
    return `
      <section class="my-poke-list">
        <h2 aria-label="Favorites">My Favorites Pokemon List</h2>
      </section>
    `;
  }
}
