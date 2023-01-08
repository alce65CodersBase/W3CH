import { Component } from '../../../lib/component/component';
import { PokeDetail } from '../../components/pokemons/poke.detail';
import { State } from '../../services/state/state';

export class DetailsPage extends Component {
  constructor(private selector: string, private state: State) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    new PokeDetail('.poke-detail', this.state);
    return element;
  }

  private createTemplate() {
    return `
      <section class="poke-detail">
        <h2 aria-label="Details">Pokemon Detail</h2>
      </section>
    `;
  }
}
