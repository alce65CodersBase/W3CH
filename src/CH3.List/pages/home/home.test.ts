import { fireEvent, screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { HomePage } from './home';

describe('Given "HomePage" component', () => {
  document.body.innerHTML = `<main></main>`;

  HTMLDialogElement.prototype.showModal = jest.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true;
  });

  const homePage = new HomePage('main');
  const elements = [
    screen.getByRole('heading', { name: 'Home' }), // <h2>
  ];
  test('Then we should to be able to instantiate it', () => {
    expect(homePage).toBeInstanceOf(HomePage);
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
  describe('When the user click the button', () => {
    test('Modal should be rendered and open', () => {
      const button = screen.getByRole('button');
      fireEvent.click(button);
      const modalTitle = screen.getByRole('heading', {
        name: 'Mascotas',
      });
      expect(modalTitle).toBeInTheDocument();
    });
  });
});
