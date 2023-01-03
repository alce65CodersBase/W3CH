import { King } from '../models/king';
import { getCardTemplate } from './card';

describe('Given getCardTemplate', () => {
  describe('When we call with a character as argument', () => {
    const character = new King('Pepe', 'Coder', 23, 2);
    test('Then if character is live it should return a template string', () => {
      // Act
      const r = getCardTemplate(character);
      // Assert
      expect(r).toContain('Pepe Coder');
    });
    test('Then if character is live it should return a template string', () => {
      // Arrange
      character.dead();
      // Act
      const r = getCardTemplate(character);
      // Assert
      expect(r).toContain('Pepe Coder');
    });
  });
});
