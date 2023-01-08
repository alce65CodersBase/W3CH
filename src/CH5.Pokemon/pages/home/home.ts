import { Component } from '../../../lib/component/component';
import { HomePokeList } from '../../components/pokemons/home.poke.list';
import { StateStructure } from '../../services/state/state';

export class HomePage extends Component {
  constructor(private selector: string, private state: StateStructure) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    new HomePokeList('.home-poke-list', this.state);
    // new Pagination('.pagination', this.state);
    return element;
  }

  private createTemplate() {
    return `
      <section class="home-poke-list" aria-label="Home">
      </section>
    `;
  }
}
