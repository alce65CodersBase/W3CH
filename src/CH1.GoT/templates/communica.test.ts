import { MOCK_KING } from '../services/mock';
import { getCommunicationsTemplate } from './communica';

describe('Given getCommunicationsTemplate ', () => {
  describe('When we call with a character as argument', () => {
    const character = MOCK_KING;
    test('Then it return a template string', () => {
      // Act
      const r = getCommunicationsTemplate(character);
      // Assert
      expect(r).toContain(character.communicate());
    });
  });
});
