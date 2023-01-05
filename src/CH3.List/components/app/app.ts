import { consoleDebug } from '../../../lib/tools/debug';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';
import { MenuOptionsType } from '../../types/menu.options';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';

export class App {
  menuOptions: MenuOptionsType;
  constructor() {
    this.menuOptions = [
      { path: './index.html', label: 'Home' },
      { path: './pets-list.html', label: 'Pets' },
      // Add more options { path: './about.html', label: 'About' },
    ];
    try {
      new Header('.root');
      new Menu('header', this.menuOptions);
      this.router();
      new Footer('.root');
    } catch (error) {
      consoleDebug((error as Error).message);
    }
  }

  router() {
    const path = './' + location.pathname.split('/').at(-1);
    switch (path) {
      case this.menuOptions[0].path:
        return new HomePage('.root');
      case this.menuOptions[1].path:
        return new ListPage('.root');
      // For add more options
      // case this.menuOptions[2].path:
      //   return new AboutPage('.root');
      default:
        throw new Error('Path no disponible');
    }
  }
}
