import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { HomePage } from './home';

describe('Given "HomePage" component', () => {
  document.body.innerHTML = `<main></main>`;
  const homePage = new HomePage('main');
  const elements = [
    screen.getByRole('heading', { name: 'Home' }), // <h2>
  ];
  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(homePage).toBeInstanceOf(HomePage);
    });
    test.each(elements)(`Then H2 should be render`, (element) => {
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element).toBeInTheDocument();
    });
  });
});
