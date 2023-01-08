import { detailUrlParse } from './helpers';

describe('Given the helpers', () => {
  describe('When detailUrlParse will be executed ', () => {
    test('An object should be returned', () => {
      const url = new URL(
        'http://127.0.0.1:8080/detail.html?id=2&origin=.poke-list__list'
      );
      delete (window as any).location;
      window.location = url as unknown as string & Location;
      expect(detailUrlParse()).toHaveProperty('origin', '.poke-list__list');
      expect(detailUrlParse()).toHaveProperty('pokeId', 2);
    });
  });
});
