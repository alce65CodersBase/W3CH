import { Footer } from './footer';
import { screen } from '@testing-library/dom';

describe('Given the component Footer', () => {
  describe('When it will be instantiated ', () => {
    let renderedComponent: Footer;
    beforeEach(() => {
      document.body.innerHTML = '<slot></slot>';
      renderedComponent = new Footer('slot');
    });
    test('Then it should be rendered', () => {
      expect(renderedComponent).toBeDefined();
    });

    test('Then the footer "ISDI" should be visible for the user', () => {
      expect(screen.getByText(/ISDI/i)).toBeTruthy();
    });
  });
});
