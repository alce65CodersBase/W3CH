import { getPets, getPetsDelay, savePets } from './repository.local';
import {
  getStorageList,
  setStorageList,
} from '../../../lib/services/storage/storage';
import { MOCK_CAT, MOCK_DOG } from '../../models/mock';
import { Pet } from '../../models/pet';

jest.mock('../../../lib/services/storage/storage');

const MOCK_PETS = [MOCK_DOG, MOCK_CAT];

const mockData = ['test'];
const testGetData = async () => {
  const result = await getPets();
  expect(getStorageList).toHaveBeenCalled();
  expect(result).toEqual(mockData);
};

const testGetDefaultData = async () => {
  const result = await getPets();
  expect(getStorageList).toHaveBeenCalled();
  expect(setStorageList).toHaveBeenCalled();
  expect(result).toEqual(MOCK_PETS);
};

const testGetDataDelay = async () => {
  const result = await getPetsDelay();
  expect(getStorageList).toHaveBeenCalled();
  expect(result).toEqual(mockData);
};

const testGetDefaultDataDelay = async () => {
  const result = await getPetsDelay();
  expect(getStorageList).toHaveBeenCalled();
  expect(setStorageList).toHaveBeenCalled();
  expect(result).toEqual(MOCK_PETS);
};

describe('Given getPets or getPetsDelay', () => {
  describe('When I call it with data in local storage', () => {
    beforeEach(() => {
      (getStorageList as jest.Mock).mockReturnValue(mockData);
    });
    test('Then the data should be obtained', testGetData);
    test('Then the data should be obtained with delay also', testGetDataDelay);
  });
  describe('When I call it without data in local storage', () => {
    beforeEach(() => {
      (getStorageList as jest.Mock).mockReturnValue([]);
    });
    test('Then the data from MOCK_PETS should be obtained', testGetDefaultData);
    test(
      'Then the data from MOCK_PETS should be obtained  with delay also',
      testGetDefaultDataDelay
    );
  });
});

describe('Given savePets', () => {
  describe('When I call it', () => {
    test('Then localStorage should be use with the data', () => {
      const mockPets: Array<Pet> = [];
      savePets(mockPets);
      expect(setStorageList).toHaveBeenCalledWith('Pets', mockPets);
    });
  });
});
