import { HomePage } from '../../pages/home/home';
import { App } from './app.js';
import { consoleDebug } from '../../../lib/tools/debug';

jest.mock('../../../lib/tools/debug');
jest.mock('../../pages/home/home');

describe('Given "App" class', () => {
  describe('When we instantiate it', () => {
    test('Then the application components, included HomePage, should be rendered ', () => {
      const appPokemon = new App();
      expect(appPokemon).toBeInstanceOf(App);
      expect(HomePage).toHaveBeenCalled();
    });
  });

  describe('When any component can be instantiated', () => {
    beforeEach(() => {
      (HomePage as jest.Mock).mockImplementation(() => {
        throw new Error('');
      });
    });
    test('Then the consoleDebug should be call', () => {
      const appPokemon = new App();
      expect(appPokemon).toBeInstanceOf(App);
      expect(consoleDebug).toHaveBeenCalled();
    });
  });
});
