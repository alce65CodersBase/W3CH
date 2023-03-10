import { consoleDebug } from '../../../lib/tools/debug';
import { State } from '../../services/state/state';
import { lastFromLocation } from '../../services/helpers/helpers';
import { Layout } from '../layout/layout';
import { HomePage } from '../../pages/home/home';
import { FavoritesPage } from '../../pages/favs/favorites';
import { DetailsPage } from '../../pages/details/details';

export class App {
  state: State;
  private menuItems;
  constructor(private selector = '.root') {
    this.menuItems = [
      { path: 'index.html', label: 'Home' },
      { path: 'my-pokemons.html', label: 'Favorites' },
    ];
    this.state = new State();
    consoleDebug('App loaded: ' + location.pathname);

    try {
      new Layout('.root', this.menuItems);
    } catch (error) {
      consoleDebug((error as Error).message);
    }
    document.addEventListener('stateLoaded', this.handleRoutes.bind(this));
  }

  handleRoutes() {
    const pathname = lastFromLocation();
    consoleDebug('State loaded ' + pathname);
    consoleDebug(this.state);
    try {
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
    } catch (error) {
      consoleDebug((error as Error).message);
    }
  }
}
