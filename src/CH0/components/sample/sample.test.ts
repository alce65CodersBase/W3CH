import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { Sample } from './sample';

describe('Given "Sample" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const sample = new Sample('slot');
  const elements = [screen.getByRole('generic')];
  test('Then we should to be able to instantiate it', () => {
    expect(sample).toBeInstanceOf(Sample);
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
