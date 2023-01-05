import { Character } from '../../../CH1.GoT/models/character';
import { Component } from '../component/component';
import styles from './communicate.module.css';

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
    element.classList.toggle(styles.on);
    setTimeout(() => {
      element.classList.toggle(styles.on);
      element.innerHTML = '';
    }, 2000);
  }
  private createTemplate() {
    const fullName = `${this.item.name} ${this.item.family}`;
    const image = `img/${this.item.name.toLowerCase()}.jpg`;
    const template = `
    <div class="${styles.wrapper}">
      <p class="${styles.text}">${this.item.communicate()}</p>
      <img class="${styles.picture}" src="${image}" alt="${fullName}" />
    </div>

    `;
    return template;
  }
}
