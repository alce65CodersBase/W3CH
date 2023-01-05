import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { MOCK_KING } from '../../../CH1.GoT/services/mock';
import { Emoji } from './emoji';

describe('Given Emoji component', () => {
  let emoji: Emoji;
  describe('When we call with a character as argument', () => {
    const character = MOCK_KING;
    beforeEach(() => {
      document.body.innerHTML = `<div></div>`;
    });
    test('Then we should have instantiate it', () => {
      emoji = new Emoji('div', character);
      expect(emoji).toBeInstanceOf(Emoji);
    });

    test('Then if character is "King" its emoji should be render', () => {
      emoji = new Emoji('div', character);
      const r = screen.getByText('👑');
      expect(r).toBeInTheDocument;
    });
  });
});
