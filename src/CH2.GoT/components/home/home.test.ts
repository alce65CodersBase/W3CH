import { fireEvent, screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { createCharacters } from '../../../CH1.GoT/services/characters.js';
import { MOCK_KING } from '../../../CH1.GoT/services/mock.js';
import { HomePage } from './home';

jest.mock('../../../CH1.GoT/services/characters.js');
describe('Given "HomePage" component', () => {
  (createCharacters as jest.Mock).mockReturnValue([MOCK_KING]);
  document.body.innerHTML = `<slot></slot>`;
  const handleDeadSpy = jest.spyOn(HomePage.prototype, 'handleDead');
  const handleCommunicateSpy = jest.spyOn(
    HomePage.prototype,
    'handleCommunicate'
  );
  const homePage = new HomePage('slot');
  const elementMain = screen.getByRole('main', { name: 'Home' });
  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(homePage).toBeInstanceOf(HomePage);
      expect(elementMain).toBeInTheDocument();
    });

    test('Then character card included in home should have two buttons', () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);
    });

    test('Then character card button "muere"  should be used', () => {
      const button = screen.getByRole('button', { name: 'muere' });
      fireEvent.click(button);
      expect(handleDeadSpy).toHaveBeenCalled();
    });

    test('Then character button "habla" should be used', () => {
      jest.useFakeTimers();
      jest.spyOn(global, 'setTimeout');
      const message = 'Vais a morir todos';
      const button = screen.getByRole('button', { name: 'habla' });
      fireEvent.click(button);
      const messageElement = screen.getByText(message);
      expect(handleCommunicateSpy).toHaveBeenCalled();
      expect(messageElement).toBeInTheDocument();
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
      jest.runAllTimers();
    });
  });
});
