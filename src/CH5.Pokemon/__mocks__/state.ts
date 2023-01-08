import { MockState } from '../services/state/state';
import { MOCK_POKE } from './mock';

export const MOCK_STATE = new MockState();
MOCK_STATE.pokeData = [
  {
    ...MOCK_POKE,
    id: 1,
    name: 'Snorlax',
    height: 22,
  },
];
MOCK_STATE.favorites = [
  {
    ...MOCK_POKE,
    id: 2,
    name: 'Squirtle',
    height: 25,
  },
];
