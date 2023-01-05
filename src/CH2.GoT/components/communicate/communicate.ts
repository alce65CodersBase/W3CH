import { Character } from '../../../CH1.GoT/models/character';
import { Component } from '../../../lib/component/component';
import communicate__ from './communicate.module.css';

export class Communicate extends Component {
  constructor(private selector: string, private item: Character) {
    super();
    this.template = this.createTemplate();
    this.render();
  }
  render() {
    this.element = super.innRender(this.selector) as HTMLElement;
    return this.element;
  }

  showCommunication() {
    const element = this.element as HTMLElement;
    element.classList.toggle(communicate__.on);
    setTimeout(() => {
      element.classList.toggle(communicate__.on);
      element.innerHTML = '';
    }, 2000);
  }
  private createTemplate() {
    const fullName = `${this.item.name} ${this.item.family}`;
    const image = `img/${this.item.name.toLowerCase()}.jpg`;
    const template = `
    <div class="${communicate__.wrapper}">
      <p class="${communicate__.text}">${this.item.communicate()}</p>
      <img class="${communicate__.picture}" src="${image}" alt="${fullName}" />
    </div>

    `;
    return template;
  }
}
