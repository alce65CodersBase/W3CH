import { fireEvent, screen } from '@testing-library/dom';
import { State } from '../../services/state/state';
import { MOCK_FULL_STATE } from '../../__mocks__/state';
import { FavoriteIcon } from './favorite.icon';

jest.mock('../lists/my.poke.list');

describe('Given the component FavoriteIcon', () => {
  describe('When it will be instantiated ', () => {
    let state: State;
    let renderedComponent: FavoriteIcon;
    beforeEach(() => {
      state = MOCK_FULL_STATE;
      // Equivale a
      //state.pokeData = [{ id: 1, name: 'Snorlax' }]
      //state.favorites = [{ id: 2, name: 'Squirtle' }] ,
      state.changeFavorites = jest.fn().mockResolvedValue({});
      document.body.innerHTML = `<div class='favorite-icon'></div>`;
    });

    describe('and the icon is assigned to a favorite pokemon', () => {
      beforeEach(() => {
        renderedComponent = new FavoriteIcon('.favorite-icon', state, 2);
      });
      test('Then it should be rendered', () => {
        expect(renderedComponent).toBeDefined();
      });
      test('Then the icon solid for "Favorite" should be visible and modifiable', () => {
        const elementIcon = screen.getByRole('button');
        expect(elementIcon).toBeTruthy();
        expect(elementIcon.classList.contains('fas')).toBe(true);
        fireEvent.click(elementIcon);
        expect(elementIcon.classList.contains('far')).toBe(true);
        expect(state.changeFavorites).toHaveBeenCalled();
      });
    });

    describe('and the icon is assigned to a non favorite pokemon', () => {
      beforeEach(() => {
        document.body.innerHTML = `<slot class="my-poke-list"></slot>`;
        renderedComponent = new FavoriteIcon('slot', state, 1);
      });
      test('Then the icon regular for "Favorite" should be visible and modifiable', () => {
        const elementIcon = screen.getByRole('button');
        expect(elementIcon).toBeTruthy();
        expect(elementIcon.classList.contains('far')).toBe(true);
        fireEvent.click(elementIcon);
        expect(elementIcon.classList.contains('fas')).toBe(true);
        expect(state.changeFavorites).toHaveBeenCalled();
      });
    });
  });
});
