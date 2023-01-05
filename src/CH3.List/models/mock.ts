import { Pet } from './pet';

export const MOCK_DOG = new Pet(
  'Chico',
  'Perro',
  'Bodeguero',
  2,
  'year',
  3,
  'kg',
  'Pepe',
  '/CH3.List/images/01.jpg'
);

export const MOCK_CAT = new Pet(
  'Ali',
  'Gato',
  '',
  10,
  'year',
  6,
  'kg',
  'Susana',
  '/CH3.List/images/02.jpg'
);

export const MOCK_DATA_DOG = { ...MOCK_DOG };
export const MOCK_DATA_CAT = { ...MOCK_CAT };
