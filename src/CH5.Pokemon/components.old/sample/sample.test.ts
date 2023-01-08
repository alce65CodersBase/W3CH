import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { Sample } from './sample';

describe('Given "Sample" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const sample = new Sample('slot');
  const elements = [screen.getByRole('generic')];

  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(sample).toBeInstanceOf(Sample);
    });

    test.each(elements)(
      `Then the element should be render`,
      (element: HTMLElement) => {
        expect(element).toBeInstanceOf(HTMLElement);
        expect(element).toBeInTheDocument();
      }
    );
  });
});
