import { fireEvent, screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { Modal } from './modal';

describe('Given "Modal" component', () => {
  document.body.innerHTML = `<slot></slot>`;

  HTMLDialogElement.prototype.showModal = jest.fn(function mock(
    this: HTMLDialogElement
  ) {
    this.open = true;
  });

  const modal = new Modal('slot');
  const elements = [screen.getByRole('dialog', { hidden: true })];
  test('Then we should to be able to instantiate it', () => {
    expect(modal).toBeInstanceOf(Modal);
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

  describe('When its state change to open', () => {
    modal.show();
    test('The showModal method should be call', () => {
      const openDialog = screen.getByRole('dialog');
      expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
      expect(openDialog).toBeInTheDocument();
    });

    test('Button could be used', () => {
      const elementButton = screen.getByRole('button', {
        name: 'Cerrar',
        hidden: true,
      });
      fireEvent.click(elementButton);
    });
  });

  describe('When it is instantiate with arguments', () => {
    const modal = new Modal('slot', 'Test body', 'Test button');
    const elementBody = screen.getByText('Test body');
    const elementButton = screen.getByText('Test button');
    expect(modal).toBeInstanceOf(Modal);
    expect(elementBody).toBeInTheDocument();
    expect(elementButton).toBeInTheDocument();
  });
});
