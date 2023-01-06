import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { ListPage } from './list';
import * as debug from '../../../lib/tools/debug';
import { List } from '../../components/pet.list/list/list';

describe('Given "ListPage" component', () => {
  document.body.innerHTML = `<main></main>`;
  List.prototype.initializePets = jest.fn().mockImplementation(() => {
    return [];
  });
  describe('When it is instantiated with a valid selector', () => {
    const listPage = new ListPage('main');
    const elements = [
      screen.getByRole('heading', { name: 'Pets' }), // <h2>
    ];
    test('Then we should to be able to instantiate it', () => {
      expect(listPage).toBeInstanceOf(ListPage);
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
  });

  describe('When the child component has a NON valid selector', () => {
    List.prototype.initializePets = jest.fn().mockImplementation(() => {
      throw new Error('Invalid selector');
    });
    const debugSpy = jest.spyOn(debug, 'consoleDebug');
    const listPage = new ListPage('main');
    expect(listPage).toBeInstanceOf(ListPage);
    expect(List.prototype.initializePets).toBeCalled();
    expect(debugSpy).toBeCalled();
  });

  describe('When it is instantiated with a NON valid selector', () => {
    test('Then it should throw an error', () => {
      expect(() => {
        const listPage = new ListPage('');
        expect(listPage).toBeInstanceOf(ListPage);
      }).toThrowError('Invalid selector');
    });
  });
});
