import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { List } from './list';
//import { Add } from '../todo.add/add';
import * as debug from '../../../../lib/tools/debug';
import { MOCK_DOG } from '../../../models/mock';
import { Card } from '../card/card';

describe('Given "List" component', () => {
  document.body.innerHTML = `
    <slot name="slot1"></slot>
    <slot name="slot2"></slot>`;
  const list = new List('slot[name="slot1"]');
  const element = screen.getByRole('list');
  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(list).toBeInstanceOf(List);
    });
    test(`Then the list should be render`, () => {
      expect(element).toBeInstanceOf(HTMLElement);
      expect(element).toBeInTheDocument();
    });
  });
  describe('When the child component has a NON valid selector', () => {
    Card.prototype.render = jest.fn().mockImplementation(() => {
      throw new Error('Invalid selector');
    });
    const debugSpy = jest.spyOn(debug, 'consoleDebug');
    const list = new List('slot[name="slot2"]');
    expect(list).toBeInstanceOf(List);
    expect(Card.prototype.render).toBeCalled();
    expect(debugSpy).toBeCalled();
  });

  describe('When its methods are called', () => {
    const mockPet = MOCK_DOG;
    let list: List;
    let initialPets;
    beforeEach(() => {
      list = new List('slot');
      initialPets = [...list.pets];
    });
    test('Then if it is call addPet() the pets array should be returned with a new item', () => {
      list.addPet(mockPet);
      expect(list.pets.length).toBe(initialPets.length + 1);
    });
    test('Then if it is call updatePet() the pets array should be returned with a updated item', () => {
      const name = 'Updated title';
      list.updatePet(list.pets[0].id, { name });
      expect(list.pets[0].name).toBe(name);
    });
    test('Then if ts call deletePet() the pets array should be returned without the deleted item', () => {
      list.deletePet(list.pets[0].id);
      expect(list.pets.length).toBe(initialPets.length - 1);
    });
  });
});
