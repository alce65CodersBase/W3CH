import { King } from '../models/king';
import { getCommunicationsTemplate } from './communica';

describe('Given getCommunicationsTemplate ', () => {
  describe('When we call with a character as argument', () => {
    const character = new King('Pepe', 'Coder', 23, 2);
    test('Then it return a template string', () => {
      // Act
      const r = getCommunicationsTemplate(character);
      // Assert
      expect(r).toContain(character.communicate());
    });
  });
});
