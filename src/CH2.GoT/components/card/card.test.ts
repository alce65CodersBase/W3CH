import { fireEvent, screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { MOCK_KING } from '../../../CH1.GoT/services/mock';
import { Card } from './card';

describe('Given Card component', () => {
  const handleDead = jest.fn();
  const handleCommunicate = jest.fn();
  describe('When we call with a character as argument', () => {
    const character = MOCK_KING;
    const characterName = `${MOCK_KING.name} ${MOCK_KING.family}`;
    beforeEach(() => {
      document.body.innerHTML = `<div></div>`;
    });

    test('Then if character is live its card should be render', () => {
      new Card('div', character, handleDead, handleCommunicate);
      const r = screen.getByText(characterName);
      expect(r).toBeInTheDocument;
    });

    test('Then if character is not live its card should be render', () => {
      character.dead();
      new Card('div', character, handleDead, handleCommunicate);
      const r = screen.getByText(characterName);
      expect(r).toBeInTheDocument;
    });

    test('Then character card have two buttons that should be used', () => {
      new Card('div', character, handleDead, handleCommunicate);
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
