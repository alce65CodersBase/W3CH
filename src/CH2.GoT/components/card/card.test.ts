import { fireEvent, screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { MOCK_KING } from '../../../CH1.GoT/services/mock';
import { Card } from './card';

describe('Given Card component', () => {
  const handleDead = jest.fn();
  const handleCommunicate = jest.fn();
  let card: Card;
  describe('When we call with a character as argument', () => {
    const character = MOCK_KING;
    const characterName = `${MOCK_KING.name} ${MOCK_KING.family}`;
    beforeEach(() => {
      document.body.innerHTML = `<div></div>`;
    });
    test('Then we should have instantiate it', () => {
      card = new Card('div', character, handleDead, handleCommunicate);
      expect(card).toBeInstanceOf(Card);
    });

    test('Then if character is live its card should be render', () => {
      card = new Card('div', character, handleDead, handleCommunicate);
      const r = screen.getByText(characterName);
      expect(r).toBeInTheDocument;
    });

    test('Then if character is not live its card should be render', () => {
      character.dead();
      card = new Card('div', character, handleDead, handleCommunicate);
      const r = screen.getByText(characterName);
      expect(r).toBeInTheDocument;
    });

    test('Then character card have two buttons that should be used', () => {
      card = new Card('div', character, handleDead, handleCommunicate);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);
      // muere
      fireEvent.click(buttons[1]);
      expect(handleDead).toHaveBeenCalled();
      // habla
      fireEvent.click(buttons[0]);
      expect(handleCommunicate).toHaveBeenCalled();
    });
  });
});
