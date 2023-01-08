import { Header } from './header';
import { screen } from '@testing-library/dom';

describe('Given the component Header', () => {
  describe('When it will be instantiated ', () => {
    let renderedComponent: Header;
    beforeEach(() => {
      document.body.innerHTML = '<slot></slot>';
      renderedComponent = new Header('slot');
    });
    test('Then it should be rendered', () => {
      expect(renderedComponent).toBeDefined();
    });

    test('Then the title "Pokemons" should be visible for the user', () => {
      expect(screen.getByText(/Pokemons/i)).toBeTruthy();
    });
  });
});
