import {
  getStorageList,
  setStorageList,
} from '../../../lib/services/storage/storage';
import { consoleDebug } from '../../../lib/tools/debug';
import { MOCK_DATA_CAT, MOCK_DATA_DOG } from '../../models/mock';
import { IdPetStructure } from '../../models/pet';

const initialPets: Array<IdPetStructure> = [MOCK_DATA_DOG, MOCK_DATA_CAT];

export const getPets = async (): Promise<Array<IdPetStructure>> => {
  const data = getStorageList<IdPetStructure>('Pets');

  if (!data.length) {
    setStorageList('Pets', initialPets);
    return initialPets;
  }
  return data;
};

export const getPetsDelay = (): Promise<Array<IdPetStructure>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getStorageList<IdPetStructure>('Pets');
      if (!data.length) {
        setStorageList('Pets', initialPets);
        resolve(initialPets);
      }
      resolve(data);
    }, 2000);
  });
};

export const savePets = async (pets: Array<IdPetStructure>) => {
  consoleDebug('Saving');
  setStorageList('Pets', pets);
};
