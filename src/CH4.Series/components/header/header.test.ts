import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { Header } from './header';

describe('Given "Header" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const header = new Header('slot');
  const elements = [
    screen.getByRole('presentation', { name: 'Header', hidden: true }),
  ];
  test('Then we should to be able to instantiate it', () => {
    expect(header).toBeInstanceOf(Header);
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
