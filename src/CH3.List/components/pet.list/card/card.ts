import { Component } from '../../../../lib/component/component';
import { consoleDebug } from '../../../../lib/tools/debug';
import { IdPetStructure } from '../../../models/pet';
import card__ from './card.module.css';

export class Card extends Component {
  constructor(
    private selector: string,
    private item: IdPetStructure,
    private updatePet: (id: string, data: Partial<IdPetStructure>) => void,
    private deletePet: (id: string) => void
  ) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    element
      .querySelector('[type="checkbox"]')
      ?.addEventListener('change', this.handleCheck.bind(this));
    element
      .querySelector('[role="button"]')
      ?.addEventListener('click', this.handleButton.bind(this));
    return element;
  }

  handleCheck() {
    const result: Partial<IdPetStructure> = {
      id: this.item.id,
      isAdopted: !this.item.isAdopted,
    };
    consoleDebug('checked: ' + result);
    this.updatePet(this.item.id, result);
  }

  handleButton() {
    consoleDebug('deleted');
    this.deletePet(this.item.id);
  }

  private createTemplate() {
    return `
    <li class="${card__.container} item-task" id="item_${this.item.id}">
      <article class="${card__.article}" id="item_${this.item.id}">
        <div class="${card__.title}">
          <h2 class="name">${this.item.name}</h2>
          <label for="">
            <input type="checkbox" name="isAdopted" id="isAdopted"
            ${this.item.isAdopted && 'checked'}>
            Adoptado
          </label>
        </div>
        <div class="${card__.image}">
          <img src="${this.item.picture}" alt="Pet 01">
        </div>
        <div class="${card__.info}">
          <table>
            <tr>
              <td>Soy un ...</td>
              <td>${this.item.kind} ${this.item.breed}</td>
            </tr>
            <tr>
              <td>Tengo ...</td>
              <td>${this.item.age} ${this.item.age_unit}</td>
            </tr>
            <tr>
              <td>Peso ...</td>
              <td>${this.item.weight} ${this.item.weight_unit}</td>
            </tr>
          </table>
        </div>
        <div class="${card__.footer}">
          <span role="button" class="${card__.button}">
            🗑️
          </span>
          <p>Adoptado por ${this.item.owner}
          </p>
        </div>
      </article>
    </li>
        `;
  }
}
