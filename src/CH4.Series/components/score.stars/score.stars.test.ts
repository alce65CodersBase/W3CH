import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { ScoreStars } from './score.stars';

describe('Given "ScoreStars" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const score = new ScoreStars('slot');
  const elements = [
    screen.getByRole('presentation', { name: 'Stars', hidden: true }),
  ];
  test('Then we should to be able to instantiate it', () => {
    expect(score).toBeInstanceOf(ScoreStars);
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
