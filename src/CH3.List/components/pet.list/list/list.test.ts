import { screen, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { List } from './list';
import * as debug from '../../../../lib/tools/debug';
import { MOCK_CAT, MOCK_DOG } from '../../../models/mock';
import { Card } from '../card/card';
import {
  getPets,
  savePets,
} from '../../../services/repository/repository.local';

jest.mock('../../../services/repository/repository.local');
const mockGetPets = getPets as jest.Mock;
mockGetPets.mockResolvedValue([MOCK_DOG, MOCK_CAT]);
const mockSavePets = savePets as jest.Mock;
describe('Given "List" component', () => {
  beforeEach(() => {
    document.body.innerHTML = `
    <slot name="slot1"></slot>
    <slot name="slot2"></slot>`;
    HTMLDialogElement.prototype.showModal = jest.fn(function mock(
      this: HTMLDialogElement
    ) {
      this.open = true;
    });
  });
  describe('When it is call with a DOM implementation', () => {
    test(`Then we should to be able to instantiate it
          and the list should be render`, async () => {
      const list = new List('slot[name="slot1"]');
      const element = await screen.findByRole('list');
      expect(list).toBeInstanceOf(List);
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element).toBeInTheDocument();
    });
  });
  describe('When the child component has a NON valid selector', () => {
    test('An error should be send to console', async () => {
      Card.prototype.render = jest.fn().mockImplementation(() => {
        throw new Error('Invalid selector');
      });
      const debugSpy = jest.spyOn(debug, 'consoleDebug');
      const list = new List('slot[name="slot2"]');
      await waitFor(() => {
        expect(list).toBeInstanceOf(List);
        expect(Card.prototype.render).toBeCalled();
        expect(debugSpy).toBeCalled();
      });
    });
  });

  describe('When its methods are called', () => {
    const mockPet = MOCK_DOG;
    let list: List;
    let initialPets;
    beforeEach(async () => {
      list = new List('slot');
      await screen.findByRole('list');
      initialPets = [...list.pets];
    });
    test('Then if it is call addPet() the pets array should be returned with a new item', () => {
      list.addPet(mockPet);
      expect(mockSavePets).toHaveBeenCalled();
      expect(list.pets.length).toBe(initialPets.length + 1);
    });
    test('Then if it is call updatePet() the pets array should be returned with a updated item', () => {
      const name = 'Updated pet';
      list.updatePet(list.pets[0].id, { name });
      expect(mockSavePets).toHaveBeenCalled();
      expect(list.pets[0].name).toBe(name);
    });
    test('Then if ts call deletePet() the pets array should be returned without the deleted item', () => {
      list.deletePet(list.pets[0].id);
      expect(mockSavePets).toHaveBeenCalled();
      expect(list.pets.length).toBe(initialPets.length - 1);
    });
    test('Then if it is call handleAdd(), a modal should be rendered', () => {
      list.handleAdd();
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    });
  });
});
