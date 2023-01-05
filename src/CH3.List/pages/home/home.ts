import { Component } from '../../../lib/component/component';
import { Modal } from '../../../lib/modal/modal';
import home__ from '../../components/pet.list/card/card.module.css';

export class HomePage extends Component {
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    (element.querySelector('span') as HTMLImageElement).addEventListener(
      'click',
      this.handleClick.bind(this)
    );
    return this.element;
  }

  handleClick() {
    const modalBody = `
      <h2>Mascotas</h2>
      <p>Selecciona en el menu para ver la lista de mascotas</p>
    `;
    const modal = new Modal('main', modalBody, 'continuar');
    modal.show();
  }

  private createTemplate() {
    return `
        <main>
          <h2 aria-label="Home">Listas de componentes</h2>
          <span role="button" class="${home__.button}" title='Mascotas'>
            <img src="/CH3.List/images/logo2.png" alt="Pets Logo">
          </span>
        </main>
        `;
  }
}
