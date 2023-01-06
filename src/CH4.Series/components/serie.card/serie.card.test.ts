import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { SeriesCard } from './serie.card';

describe('Given "SeriesCard" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const card = new SeriesCard('slot');
  const elements = [screen.getByRole('generic')];
  test('Then we should to be able to instantiate it', () => {
    expect(card).toBeInstanceOf(SeriesCard);
  });
  describe.each(elements)(
    'When it is call with a DOM implementation',
    (element: HTMLElement) => {
      test(`Then ${element.tagName} should be render`, () => {
        expect(element).toBeInstanceOf(HTMLElement);
        expect(element).toBeInTheDocument();
      });
    }
  );
});
