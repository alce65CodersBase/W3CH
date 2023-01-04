import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { MOCK_KING } from '../../../CH1.GoT/services/mock';
import { Communicate } from './communicate';

describe('Given the component Communicate', () => {
  describe('When we instantiate it with a character as argument', () => {
    // Arrange
    const character = MOCK_KING;
    document.body.innerHTML = `<div></div>`;
    new Communicate('div', character);
    test('Then it return a template string', () => {
      // Act
      const r = screen.getByText(character.communicate());
      // Assert
      expect(r).toBeInTheDocument();
    });
  });
});
