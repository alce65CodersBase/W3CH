import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MOCK_DATA_CAT, MOCK_DATA_DOG } from '../../../models/mock';
import { Card } from './card';

describe('Given "Card" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const updateTask = jest.fn();
  const deleteTask = jest.fn();
  const card = new Card('slot', MOCK_DATA_DOG, updateTask, deleteTask);
  const cardAdopted = new Card(
    'slot',
    { ...MOCK_DATA_CAT, isAdopted: true },
    updateTask,
    deleteTask
  );
  const elements = [
    screen.getAllByRole('listitem')[0], // <li />
    screen.getAllByRole('heading')[0], // h2 'Chico'
    screen.getAllByRole('checkbox')[0],
    screen.getAllByRole('button')[0],
  ];
  test('Then we should to be able to instantiate it', () => {
    expect(card).toBeInstanceOf(Card);
    expect(cardAdopted).toBeInstanceOf(Card);
  });
  describe.each(elements)(
    'When it is call with a DOM implementation',
    (element: HTMLElement) => {
      test(`Then ${element.tagName} should be render`, () => {
        expect(element).toBeInstanceOf(HTMLElement);
        expect(element).toBeInTheDocument();
      });
    }
  );

  describe('When data are provided in the component', () => {
    test('Then user could interact with them ', async () => {
      const user = userEvent.setup();
      await user.click(elements[2]);
      expect(updateTask).toHaveBeenCalledTimes(1);
      await user.click(elements[3]);
      expect(deleteTask).toHaveBeenCalledTimes(1);
    });
  });
});
