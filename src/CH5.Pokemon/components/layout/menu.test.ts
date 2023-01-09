import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { MenuOptionsType } from '../../../CH3.List/types/menu.options';
import { Menu } from './menu';

describe('Given "Menu" component', () => {
  document.body.innerHTML = `<slot></slot>`;
  const mockOptions: MenuOptionsType = [
    { path: '', label: 'Test 1' },
    { path: '', label: 'Test 2' },
  ];
  const menu = new Menu('slot', mockOptions);
  const elements = [screen.getByRole('navigation')];

  describe('When it is call with a DOM implementation', () => {
    test('Then we should to be able to instantiate it', () => {
      expect(menu).toBeInstanceOf(Menu);
    });

    test.each(elements)(
      `Then the element should be render`,
      (element: HTMLElement) => {
        expect(element).toBeInstanceOf(HTMLElement);
        expect(element).toBeInTheDocument();
      }
    );

    test('Then the menu should be visible for the user', () => {
      const menuLabel1 = screen.getByText(mockOptions[0].label);
      const menuLabel2 = screen.getByText(mockOptions[1].label);
      expect(menuLabel1).toBeInTheDocument();
      expect(menuLabel2).toBeInTheDocument();
    });
  });
});
