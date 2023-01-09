import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { MOCK_FULL_STATE } from '../../__mocks__/state';
import { HomePage } from './home';

describe('Given "HomePage" component', () => {
  document.body.innerHTML = `<main></main>`;
  const pokeHomePage = new HomePage('main', MOCK_FULL_STATE);
  const pokeElements = [
    screen.getByRole('region', { name: 'Home' }), // <h2>
  ];
  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(pokeHomePage).toBeInstanceOf(HomePage);
    });
    test.each(pokeElements)(`Then <section> should be render`, (element) => {
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element).toBeInTheDocument();
    });
  });
});
