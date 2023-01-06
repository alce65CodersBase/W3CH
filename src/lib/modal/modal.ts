import { Component } from '../component/component';
import modal__ from './modal.module.css';

export class Modal extends Component {
  constructor(
    private selector: string,
    public customBody: string = '',
    public customButton: string = ''
  ) {
    super();
    this.template = this.createTemplate();
    this.render();
  }
  render() {
    const element = super.innRender(this.selector);
    const modal = this.element as HTMLDialogElement;
    element.querySelector('button')?.addEventListener('click', () => {
      modal.open = false;
      modal.parentElement?.lastElementChild?.remove();
    });
    return element;
  }

  show() {
    const modal = this.element as HTMLDialogElement;
    // modal.show();
    // equivale a modal.open = isOpen; Lo abre como no-modal
    // alternativamente, para abrirlo como modal, incluyendo un backdrop
    modal.showModal();
  }

  private createTemplate() {
    const defaultBody = `
      <h2>
        ISDI Coders Modal
      </h2>
      <p>Testing Modal</p>
    `;

    const body = this.customBody ? this.customBody : defaultBody;
    const button = this.customButton ? this.customButton : 'Cerrar';

    return `
      <dialog class="${modal__.container}">
        ${body}
        <button class="${modal__.button}">${button}</button>
      </dialog>
    `;
  }
}
