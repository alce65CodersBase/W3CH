import { Component } from '../../../lib/component/component';
import { State } from '../../services/state/state';
import { PokeList } from './poke.list';

export class MyPokeList extends Component {
  constructor(private selector: string, private state: State) {
    super();
    this.template = this.createTemplate();
    this.render();
    this.children.push(
      new PokeList('.my-poke-list__list', this.state.favorites, state)
    );
  }

  render() {
    const element = super.innRender(this.selector);
    return element;
  }

  private createTemplate() {
    const template = `
      <h2>Pokemons favoritos</h2>
      <div class="my-poke-list">
        <ul class="my-poke-list__list"></ul>
      </div>`;
    return template;
  }
}
