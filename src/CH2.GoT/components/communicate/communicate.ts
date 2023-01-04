import { Character } from '../../../CH1.GoT/models/character';
import { Component } from '../component/component';

export class Communicate extends Component {
  constructor(private selector: string, private item: Character) {
    super();
    this.template = this.createTemplate();
    this.render();
  }
  render() {
    const element = super.innRender(this.selector);
    return element;
  }
  private createTemplate() {
    const fullName = `${this.item.name} ${this.item.family}`;
    const image = `img/${this.item.name.toLowerCase()}.jpg`;
    const template = `
      <p class="communications__text">${this.item.communicate()}</p>
      <img class="communications__picture" src="${image}" alt="${fullName}" />
    `;
    return template;
  }
}
