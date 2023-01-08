import { State } from './state';
import * as service from '../repository/poke.repo';
import { URL_POKE_API } from '../config';
import { MOCK_POKE, MOCK_POKE_FULL } from '../../models/mock';
import { Pokemon, ProtoPokemon } from '../../models/pokemon';
import { PokeResponse } from '../repository/types';

// Mock full module and mock part of it
jest.mock('../repository/poke.repo');

const fetchPoke = jest.fn().mockImplementation((url) => {
  let data: PokeResponse<Pokemon | ProtoPokemon> = [
    { ...MOCK_POKE, id: 1, name: 'Snorlax' },
  ];
  if (url === URL_POKE_API) {
    data = {
      count: 1118,
      next: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
      previous: '',
      results: [
        {
          name: 'snorlax',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
        {
          name: 'bad_url: ni id',
          url: 'https://pokeapi.co/api/v2/pokemon/',
        },
      ],
    };
  }
  return Promise.resolve(data);
});
const queryPoke = jest
  .fn()
  .mockResolvedValue({ ...MOCK_POKE, id: 1, name: 'Snorlax' });
const addPoke = jest.fn().mockResolvedValue({});
const removePoke = jest.fn().mockResolvedValue({});

(service.createPokeRepo as jest.Mock).mockImplementation(() => ({
  fetchPoke,
  queryPoke,
  addPoke,
  removePoke,
}));

describe('Given the class State', () => {
  describe('When it will be instantiated ', () => {
    let state: State;
    beforeAll(() => {
      state = new State();
    });
    test('Then it should be created', () => {
      expect(state).toBeDefined();
      expect(state.pokeData.length).toBe(2);
      expect(state.favorites.length).toBe(1);
      expect(service.createPokeRepo).toHaveBeenCalled();
    });

    describe('And method hydrateData is implemented', () => {
      test('Then it should be used', async () => {
        expect(state).toHaveProperty('hydrateData');
        await state.hydrateData();
        expect(service.createPokeRepo).toHaveBeenCalled();
        expect(fetchPoke).toHaveBeenCalled();
      });
    });

    describe('And method hydrateFavorites is implemented', () => {
      test('Then it should be used', async () => {
        expect(state).toHaveProperty('hydrateFavorites');
        await state.hydrateFavorites();
        expect(service.createPokeRepo).toHaveBeenCalled();
        expect(fetchPoke).toHaveBeenCalled();
      });
    });

    describe('And method changeFavorites is implemented', () => {
      test('Then it should be used for add favorites', async () => {
        expect(state).toHaveProperty('changeFavorites');
        await state.changeFavorites('2');
        expect(service.createPokeRepo).toHaveBeenCalled();
        expect(addPoke).toHaveBeenCalled();
      });
      test('Then it should be used for remove favorites', async () => {
        expect(state).toHaveProperty('changeFavorites');
        await state.changeFavorites('1');
        expect(service.createPokeRepo).toHaveBeenCalled();
        expect(removePoke).toHaveBeenCalled();
      });
      test('Then it should be tried to add to favorites and inexistent pokemon', async () => {
        expect(state).toHaveProperty('changeFavorites');
        await state.changeFavorites('3');
        expect(service.createPokeRepo).toHaveBeenCalled();
      });
    });

    describe('And method getDetail is implemented', () => {
      test('Then it should be used for favorites', () => {
        const origin = '.my-poke-list__list';
        const pokeId = '1';
        expect(state).toHaveProperty('getDetail');
        state.favorites = [MOCK_POKE];
        expect(state.getDetail(origin, pokeId)).toHaveProperty(
          'id',
          MOCK_POKE.id
        );
      });
      test('Then it should be used for home page', () => {
        const origin = '.poke-list__list';
        const pokeId = '1';
        expect(state).toHaveProperty('getDetail');
        state.pokeData = [MOCK_POKE];
        expect(state.getDetail(origin, pokeId)).toHaveProperty(
          'id',
          MOCK_POKE.id
        );
      });
    });
  });
});
