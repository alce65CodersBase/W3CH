import { consoleDebug } from '../../../lib/tools/debug';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';
import { App } from './app';

jest.mock('../header/header');
jest.mock('../footer/footer');
jest.mock('../menu/menu');
jest.mock('../../pages/home/home');
jest.mock('../../pages/list/list');
jest.mock('../../../lib/tools/debug');

describe('Given and instantiate "App" class', () => {
  beforeAll(() => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {},
    });
  });
  describe('When location include a pathname "./index.html"', () => {
    test('Then the application components, included HomePage, should be instantiated ', () => {
      global.window.location.pathname = './index.html';
      const app = new App();
      expect(app).toBeInstanceOf(App);
      expect(Header).toHaveBeenCalled();
      expect(Footer).toHaveBeenCalled();
      expect(Menu).toHaveBeenCalled();
      expect(HomePage).toHaveBeenCalled();
    });
  });
  describe('When location include a pathname "./list.html"', () => {
    test('Then the component AboutPage, should be instantiated', () => {
      global.window.location.pathname = './pets-list.html';
      const app = new App();
      expect(app).toBeInstanceOf(App);
      expect(ListPage).toHaveBeenCalled();
    });
  });
  // For future pages
  // describe('When location include a pathname "./about.html"', () => {
  //   test('Then the component AboutPage, should be instantiated', () => {
  //     global.window.location.pathname = './about.html';
  //     const app = new App();
  //     expect(app).toBeInstanceOf(App);
  //     expect(AboutPage).toHaveBeenCalled();
  //   });
  // });
  describe('When any component cannot be instantiated', () => {
    test('Then the component AboutPage, should be instantiated', () => {
      global.window.location.pathname = './bad_path.html';
      const app = new App();
      expect(app).toBeInstanceOf(App);
      expect(consoleDebug).toHaveBeenCalled();
    });
  });
});
