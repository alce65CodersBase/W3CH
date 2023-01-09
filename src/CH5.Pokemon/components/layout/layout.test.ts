import '@testing-library/jest-dom';
import { Layout } from './layout';

describe('Given "Layout" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const layout = new Layout('slot', []);
  test('Then we should to be able to instantiate it', () => {
    expect(layout).toBeInstanceOf(Layout);
  });
});
