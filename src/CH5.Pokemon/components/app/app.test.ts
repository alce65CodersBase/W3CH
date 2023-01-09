import '@testing-library/jest-dom';
import { HomePage } from '../../pages/home/home';
import { App } from './app.js';
import { consoleDebug } from '../../../lib/tools/debug';
import { State } from '../../services/state/state';
import { lastFromLocation } from '../../services/helpers/helpers';
import { screen } from '@testing-library/dom';
import { FavoritesPage } from '../../pages/favs/favorites';
import { DetailsPage } from '../../pages/details/details';
import { Layout } from '../layout/layout';

jest.mock('../../../lib/tools/debug');
jest.mock('../../pages/home/home');
jest.mock('../../pages/favs/favorites');
jest.mock('../../pages/details/details');
jest.mock('../../services/helpers/helpers');
jest.mock('../layout/layout');

const startApp = () => {
  const appPokemon = new App();
  const slot = screen.getByText('Insert App');
  slot.dispatchEvent(new Event('stateLoaded', { bubbles: true }));
  return appPokemon;
};

describe('Given "App" class', () => {
  beforeEach(() => {
    State.prototype.updateState = jest.fn().mockImplementation(() => {
      document.body.innerHTML = '<slot class="root">Insert App</slot>';
    });
  });
  describe('When we instantiate it with "/" route', () => {
    test('Then the application components, included HomePage, should be rendered ', () => {
      (lastFromLocation as jest.Mock).mockReturnValue('/');
      const appPokemon = startApp();
      expect(appPokemon).toBeInstanceOf(App);
      expect(lastFromLocation).toHaveBeenCalled();
      expect(HomePage).toHaveBeenCalled();
    });
  });

  describe('When we instantiate it with "/my-pokemons.html" route', () => {
    test('Then the application components, included FavoritesPage, should be rendered ', () => {
      (lastFromLocation as jest.Mock).mockReturnValue('/my-pokemons.html');
      startApp();
      expect(lastFromLocation).toHaveBeenCalled();
      expect(FavoritesPage).toHaveBeenCalled();
    });
  });

  describe('When we instantiate it with "/detail.html/..." route', () => {
    test('Then the application components, included DetailsPage, should be rendered ', () => {
      (lastFromLocation as jest.Mock).mockReturnValue('/details.html');
      startApp();
      expect(lastFromLocation).toHaveBeenCalled();
      expect(DetailsPage).toHaveBeenCalled();
    });
  });

  describe('When layout component cannot be instantiated', () => {
    test('Then the consoleDebug should be call', () => {
      const errorInComponent = new Error('Bad component');
      (Layout as jest.Mock).mockImplementation(() => {
        throw errorInComponent;
      });
      const appPokemon = new App();
      expect(appPokemon).toBeInstanceOf(App);
      expect(consoleDebug).toHaveBeenLastCalledWith(errorInComponent.message);
    });
  });
  describe('When any page cannot be instantiated', () => {
    test('Then the consoleDebug should be call', () => {
      const errorInPage = new Error('Bad page');
      (lastFromLocation as jest.Mock).mockReturnValue('/');
      (HomePage as jest.Mock).mockImplementation(() => {
        throw errorInPage;
      });
      startApp();
      expect(consoleDebug).toHaveBeenLastCalledWith(errorInPage.message);
    });
  });
});
