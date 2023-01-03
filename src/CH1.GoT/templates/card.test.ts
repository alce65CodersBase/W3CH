import { MOCK_KING } from '../services/mock';
import { getCardTemplate } from './card';

describe('Given getCardTemplate', () => {
  describe('When we call with a character as argument', () => {
    const character = MOCK_KING;
    const characterName = `${MOCK_KING.name} ${MOCK_KING.family}`;
    test('Then if character is live it should return a template string', () => {
      // Act
      const r = getCardTemplate(character);
      // Assert
      expect(r).toContain(characterName);
    });
    test('Then if character is live it should return a template string', () => {
      // Arrange
      character.dead();
      // Act
      const r = getCardTemplate(character);
      // Assert
      expect(r).toContain(characterName);
    });
  });
});
