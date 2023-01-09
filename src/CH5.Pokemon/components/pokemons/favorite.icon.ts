import { Component } from '../../../lib/component/component';
import { consoleDebug } from '../../../lib/tools/debug';
import { State } from '../../services/state/state';
import { MyPokeList } from '../lists/my.poke.list';

export class FavoriteIcon extends Component {
  constructor(
    private selector: string,
    private state: State,
    private pokeId: number
  ) {
    super();
    this.template = this.createTemplate();
    this.render();
    this.manageComponent();
  }

  render() {
    return super.innRender(this.selector);
  }

  createTemplate() {
    const template = `
      <i role="button" class="icon--score far fa-heart"></i>`;
    return template;
  }

  private manageComponent() {
    const icon = this.element as HTMLElement;
    if (this.state.favorites.find((item) => +item.id === +this.pokeId)) {
      icon.classList.remove('far');
      icon.classList.add('fas');
    } else {
      icon.classList.add('far');
      icon.classList.remove('fas');
    }
    icon.addEventListener('click', this.handleIconFavorite.bind(this));
  }

  private async handleIconFavorite(ev: Event) {
    ev.preventDefault();
    const element = ev.target as HTMLElement;
    element.classList.toggle('far');
    element.classList.toggle('fas');
    const newState = await this.state.changeFavorites(this.pokeId);
    let favoritesList: Component | null = null;
    if (document.querySelector('.my-poke-list')) {
      favoritesList = new MyPokeList('.my-poke-list', newState as State);
    }
    const target = favoritesList ? 'In Favorites page' : 'In Other page';
    consoleDebug('Favorite state changed' + target);
  }
}
