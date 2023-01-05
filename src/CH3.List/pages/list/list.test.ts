import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { ListPage } from './list';
import * as debug from '../../../lib/tools/debug';
import { List } from '../../components/some.list/list/list';

describe('Given "ListPage" component', () => {
  document.body.innerHTML = `<slot name="page"></slot>`;
  describe('When it is instantiated with a valid selector', () => {
    const todoPage = new ListPage('slot[name="page"]');
    const elements = [
      screen.getByRole('heading', { name: 'List' }), // <h2>
    ];
    test('Then we should to be able to instantiate it', () => {
      expect(todoPage).toBeInstanceOf(ListPage);
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
    List.prototype.render = jest.fn().mockImplementation(() => {
      throw new Error('Invalid selector');
    });
    const debugSpy = jest.spyOn(debug, 'consoleDebug');
    const todoPage = new ListPage('slot[name="page"]');
    expect(todoPage).toBeInstanceOf(ListPage);
    expect(List.prototype.render).toBeCalled();
    expect(debugSpy).toBeCalled();
  });

  describe('When it is instantiated with a NON valid selector', () => {
    test('Then it should throw an error', () => {
      expect(() => {
        const todoPage = new ListPage('');
        expect(todoPage).toBeInstanceOf(ListPage);
      }).toThrowError('Invalid selector');
    });
  });
});
