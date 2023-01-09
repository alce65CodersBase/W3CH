import '@testing-library/jest-dom';
import { HomePage } from '../../pages/home/home';
import { App } from './app.js';
import { consoleDebug } from '../../../lib/tools/debug';
import { State } from '../../services/state/state';
import { lastFromLocation } from '../../services/helpers/helpers';
import { screen } from '@testing-library/dom';
import { FavoritesPage } from '../../pages/favs/favorites';
import { DetailsPage } from '../../pages/details/details';

jest.mock('../../../lib/tools/debug');
jest.mock('../../pages/home/home');
jest.mock('../../pages/favs/favorites');
jest.mock('../../pages/details/details');
jest.mock('../../services/helpers/helpers');

describe('Given "App" class', () => {
  beforeEach(() => {
    State.prototype.updateState = jest.fn().mockImplementation(() => {
      document.body.innerHTML = '<slot>Insert App</slot>';
    });
  });
  describe('When we instantiate it with "/" route', () => {
    beforeEach(() => {
      (lastFromLocation as jest.Mock).mockReturnValue('/');
    });
    test('Then the application components, included HomePage, should be rendered ', () => {
      const appPokemon = new App();
      const slot = screen.getByText('Insert App');
      slot.dispatchEvent(new Event('stateLoaded', { bubbles: true }));
      expect(appPokemon).toBeInstanceOf(App);
      expect(lastFromLocation).toHaveBeenCalled();
      expect(HomePage).toHaveBeenCalled();
    });
  });

  describe('When we instantiate it with "/my-pokemons.html" route', () => {
    beforeEach(() => {
      (lastFromLocation as jest.Mock).mockReturnValue('/my-pokemons.html');
    });
    test('Then the application components, included HomePage, should be rendered ', () => {
      const appPokemon = new App();
      const slot = screen.getByText('Insert App');
      slot.dispatchEvent(new Event('stateLoaded', { bubbles: true }));
      expect(appPokemon).toBeInstanceOf(App);
      expect(lastFromLocation).toHaveBeenCalled();
      expect(FavoritesPage).toHaveBeenCalled();
    });
  });

  describe('When we instantiate it with "/detail.html/..." route', () => {
    beforeEach(() => {
      (lastFromLocation as jest.Mock).mockReturnValue('/details.html');
    });
    test('Then the application components, included HomePage, should be rendered ', () => {
      const appPokemon = new App();
      const slot = screen.getByText('Insert App');
      slot.dispatchEvent(new Event('stateLoaded', { bubbles: true }));
      expect(appPokemon).toBeInstanceOf(App);
      expect(lastFromLocation).toHaveBeenCalled();
      expect(DetailsPage).toHaveBeenCalled();
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
