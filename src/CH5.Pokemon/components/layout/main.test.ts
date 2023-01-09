import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { Main } from './main';

describe('Given "Main" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const main = new Main('slot');
  const elements = [screen.getByRole('main')];

  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(main).toBeInstanceOf(Main);
    });

    test.each(elements)(
      `Then the element should be render`,
      (element: HTMLElement) => {
        expect(element).toBeInstanceOf(HTMLElement);
        expect(element).toBeInTheDocument();
      }
    );
  });
});
