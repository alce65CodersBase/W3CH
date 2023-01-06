import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { SeriesPage } from './series';

describe('Given "SeriesPage" component', () => {
  document.body.innerHTML = `<main></main>`;
  const homePage = new SeriesPage('main');
  const elements = [
    screen.getByRole('heading', { name: 'Series list' }), // <h2>
  ];
  test('Then we should to be able to instantiate it', () => {
    expect(homePage).toBeInstanceOf(SeriesPage);
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
