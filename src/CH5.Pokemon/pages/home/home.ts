import { Component } from '../../../lib/component/component';
import { HomePokeList } from '../../components/lists/home.poke.list';
import { Pagination } from '../../components/pokemons/pagination';
import { State } from '../../services/state/state';

export class HomePage extends Component {
  constructor(private selector: string, private state: State) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    new HomePokeList('.home-poke-list', this.state);
    new Pagination('.pagination', this.state);
    return element;
  }

  private createTemplate() {
    return `
      <section class="home-poke-list" aria-label="Home">
      </section>
    `;
  }
}
