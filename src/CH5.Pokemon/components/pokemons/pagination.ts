import { Component } from '../../../lib/component/component';
import { State } from '../../services/state/state';

export class Pagination extends Component {
  constructor(private selector: string, private state: State) {
    super();
    this.template = this.createTemplate();
    this.render();
    this.manageComponent();
  }

  render() {
    super.cleanHtml(this.selector);
    return super.innRender(this.selector);
  }

  private createTemplate() {
    const template = `
            <button class="pagination__button" type="button" data-id="prev">
                <i class="fas fa-backward" data-id="prev"></i>
                <span data-id="prev">Anterior</span>
            </button>
            <button class="pagination__button" type="button" data-id="next">
                <span data-id="next">Siguiente</span>
                <i class="fas fa-forward" data-id="next"></i>
            </button>
        `;
    return template;
  }

  private manageComponent() {
    const componentElement = document.querySelector(
      this.selector
    ) as HTMLElement;
    const buttons = [
      ...componentElement.querySelectorAll('.pagination__button'),
    ] as Array<HTMLButtonElement>;
    if (!this.state.previousUrl) {
      buttons[0].setAttribute('disabled', 'true');
    } else if (!this.state.nextUrl) {
      buttons[1].setAttribute('disabled', 'true');
    }
    buttons.forEach((button) => {
      button.addEventListener('click', this.handleButton.bind(this));
    });
  }
  private handleButton(ev: Event) {
    const element = ev.target as HTMLButtonElement;
    switch (element.dataset.id) {
      case 'next':
        this.state.hydrateData(this.state.nextUrl as string).then(() => {
          document.dispatchEvent(new Event('stateLoaded'));
        });
        break;
      case 'prev':
        this.state.hydrateData(this.state.previousUrl as string).then(() => {
          document.dispatchEvent(new Event('stateLoaded'));
        });
        break;
    }
  }
}
