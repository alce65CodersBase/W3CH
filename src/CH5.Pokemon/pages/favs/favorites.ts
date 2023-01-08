import { Component } from '../../../lib/component/component';
import { StateStructure } from '../../services/state/state';

export class FavoritesPage extends Component {
  constructor(private selector: string, private state: StateStructure) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
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
