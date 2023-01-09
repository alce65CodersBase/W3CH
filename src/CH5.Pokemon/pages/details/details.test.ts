import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { PokeDetail } from '../../components/pokemons/poke.detail';
import { MOCK_FULL_STATE } from '../../__mocks__/state';
import { DetailsPage } from './details';

jest.mock('../../components/pokemons/poke.detail');

describe('Given "DetailsPage" component', () => {
  document.body.innerHTML = `<main></main>`;
  const state = MOCK_FULL_STATE;
  const pokeDetailsPage = new DetailsPage('main', state);
  const pokeElements = [
    screen.getByRole('heading', { name: 'Details' }), // <h2>
  ];
  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(pokeDetailsPage).toBeInstanceOf(DetailsPage);
      expect(PokeDetail).toHaveBeenCalled();
    });
    test.each(pokeElements)(`Then H2 should be render`, (element) => {
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element).toBeInTheDocument();
    });
  });
});
