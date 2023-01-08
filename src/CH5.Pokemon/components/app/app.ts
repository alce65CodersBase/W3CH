import { HomePage } from '../../pages/home/home';
//import { MyPokeList } from '../components/my-poke-list.js';
//import { Pagination } from '../components/pagination.js';
//import { PokeDetail } from '../components/poke-detail.js';
//import { HomePokeList } from '../components/home-poke-list.js';
import { consoleDebug } from '../../../lib/tools/debug';
import { State } from '../../services/state/state';

import { lastFromLocation } from '../../services/helpers/helpers';
import { Layout } from '../layout/layout';
import { FavoritesPage } from '../../pages/favs/favorites';
import { DetailsPage } from '../../pages/details/details';

export class App {
  state: State;
  #menuItems;
  constructor(private selector = '.root') {
    this.#menuItems = [
      { path: 'index.html', label: 'Home' },
      { path: 'my-pokemons.html', label: 'Favorites' },
    ];
    this.state = new State();
    console.log('App loaded', location.pathname);

    try {
      new Layout('.root', this.#menuItems);
    } catch (error) {
      consoleDebug((error as Error).message);
    }
    document.addEventListener('stateLoaded', this.handleRoutes.bind(this));
  }

  handleRoutes() {
    const pathname = lastFromLocation();
    consoleDebug('State loaded ' + pathname);
    consoleDebug(this.state);
    switch (pathname) {
      case '/':
      case '/index.html':
        new HomePage('main', this.state);
        break;
      case '/my-pokemons.html':
        new FavoritesPage('main', this.state);
        break;
      default:
        new DetailsPage('main', this.state);
        break;
    }
  }
}
