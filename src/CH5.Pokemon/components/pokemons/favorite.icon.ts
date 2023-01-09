import { Component } from '../../../lib/component/component';
import { State } from '../../services/state/state';
import { MyPokeList } from './my.poke.list';

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
    const componentElement = this.element as HTMLElement;
    const icon = componentElement.querySelector('i') as HTMLElement;
    if (this.state.favorites.find((item) => +item.id === +this.pokeId)) {
      icon.classList.remove('far');
      icon.classList.add('fas');
    } else {
      icon.classList.add('far');
      icon.classList.remove('fas');
    }
    icon.addEventListener('click', this.handleIconFavorite.bind(this));
  }

  private handleIconFavorite(ev: Event) {
    ev.preventDefault();
    const element = ev.target as HTMLElement;
    element.classList.toggle('far');
    element.classList.toggle('fas');
    this.state.changeFavorites(this.pokeId).then((state) => {
      if (document.querySelector('.my-poke-list')) {
        new MyPokeList('.my-poke-list', state as State);
      }
      console.log('Favorite state changed');
    });
  }
}
