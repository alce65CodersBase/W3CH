import { fireEvent, screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { MOCK_KING } from '../../../CH1.GoT/services/mock';
import { BackCard } from './back.card';

describe('Given BackCard component', () => {
  const handleDead = jest.fn();
  const handleCommunicate = jest.fn();
  let backCard: BackCard;
  describe('When we call with a character as argument', () => {
    const character = MOCK_KING;
    beforeEach(() => {
      document.body.innerHTML = `<div></div>`;
    });
    test('Then we should have instantiate it', () => {
      backCard = new BackCard('div', character, handleDead, handleCommunicate);
      expect(backCard).toBeInstanceOf(BackCard);
    });

    test('Then character card have two buttons that should be used', () => {
      backCard = new BackCard('div', character, handleDead, handleCommunicate);
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
