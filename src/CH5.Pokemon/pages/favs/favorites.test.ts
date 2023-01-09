import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { MOCK_FULL_STATE } from '../../__mocks__/state';
import { FavoritesPage } from './favorites';

describe('Given "FavoritesPage" component', () => {
  document.body.innerHTML = `<main></main>`;
  const state = MOCK_FULL_STATE;
  const pokeFavoritesPage = new FavoritesPage('main', state);
  const pokeElements = [
    screen.getByRole('heading', { name: 'Favorites' }), // <h2>
  ];
  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(pokeFavoritesPage).toBeInstanceOf(FavoritesPage);
    });
    test.each(pokeElements)(`Then H2 should be render`, (element) => {
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element).toBeInTheDocument();
    });
  });
});
