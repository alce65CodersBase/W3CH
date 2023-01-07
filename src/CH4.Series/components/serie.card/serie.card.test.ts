import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { MOCK_SERIES } from '../../mock/series';
import { SeriesCard } from './serie.card';

describe('Given "SeriesCard" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const card = new SeriesCard('slot', MOCK_SERIES[0]);
  const elements = [screen.getByRole('listitem', { name: 'Serie' })];
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
