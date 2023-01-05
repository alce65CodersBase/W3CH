import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { List } from './list';

describe('Given "List" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const footer = new List('slot');
  const elements = [screen.getByText('List')];
  test('Then we should to be able to instantiate it', () => {
    expect(footer).toBeInstanceOf(List);
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
