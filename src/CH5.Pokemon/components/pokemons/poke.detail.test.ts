import { PokeDetail } from './poke.detail';
import { screen } from '@testing-library/dom';
import { MOCK_FULL_STATE } from '../../__mocks__/state';
import { Pokemon } from '../../models/pokemon';
import { MOCK_POKE_FULL } from '../../__mocks__/mock';

describe('Given the component PokeDetail', () => {
  describe('When it will be instantiated ', () => {
    let renderedComponent: PokeDetail;
    let state;
    beforeEach(() => {
      state = MOCK_FULL_STATE;

      state.pokeData = [];
      state.favorites = [];
      state.getDetail = jest.fn(() => {
        return <Pokemon>{
          ...MOCK_POKE_FULL,
          name: 'Snorlax',
        };
      });
      document.body.innerHTML = "<div class='poke-detail'></div>";
      renderedComponent = new PokeDetail('.poke-detail', state);
    });
    test('Then it should be rendered', () => {
      expect(renderedComponent).toBeDefined();
    });

    test('Then the title "Detalles del Pokemon" should be visible for the user', () => {
      expect(screen.getByText(/Detalles del Pokemon/i)).toBeTruthy();
    });

    test('Then the Pokemon name should be visible for the user', () => {
      expect(screen.getByText(/Snorlax/i)).toBeTruthy();
    });
  });
});
