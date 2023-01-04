import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { HomePage } from './home';

describe('Given "HomePage" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const homePage = new HomePage('slot');
  const elementMain = screen.getByRole('main', { name: 'Home' });
  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(homePage).toBeInstanceOf(HomePage);
      expect(elementMain).toBeInTheDocument();
    });
  });
});
