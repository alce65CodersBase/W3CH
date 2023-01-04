import { HomePage } from '../home/home';
import { App } from './app.js';
import { consoleDebug } from '../../../lib/tools/debug';

jest.mock('../home/home');
jest.mock('../../../lib/tools/debug');

describe('Given "App" class', () => {
  describe('When we instantiate it', () => {
    test('Then the application components, included HomePage, should be rendered ', () => {
      const app = new App();
      expect(app).toBeInstanceOf(App);
      expect(HomePage).toHaveBeenCalled();
    });
  });

  describe('When any component can be instantiated', () => {
    test('Then the consoleDebug should be call', () => {
      (HomePage as jest.Mock).mockImplementation(() => {
        throw new Error('');
      });
      const app = new App();
      expect(app).toBeInstanceOf(App);
      expect(consoleDebug).toHaveBeenCalled();
    });
  });
});
