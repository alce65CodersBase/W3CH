import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { DetailsPage } from './details';

describe('Given "DetailsPage" component', () => {
  document.body.innerHTML = `<main></main>`;
  const pokeDetailsPage = new DetailsPage('main');
  const pokeElements = [
    screen.getByRole('heading', { name: 'Details' }), // <h2>
  ];
  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(pokeDetailsPage).toBeInstanceOf(DetailsPage);
    });
    test.each(pokeElements)(`Then H2 should be render`, (element) => {
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element).toBeInTheDocument();
    });
  });
});