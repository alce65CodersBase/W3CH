import { Component } from '../../../../lib/component/component';
import { Modal } from '../../../../lib/modal/modal';
import { consoleDebug } from '../../../../lib/tools/debug';
import { MOCK_DATA_CAT, MOCK_DATA_DOG } from '../../../models/mock';
import { IdPetStructure, Pet } from '../../../models/pet';
import { Add } from '../add/add';
import { Card } from '../card/card';
import list__ from './list.module.css';

function initializePets(): IdPetStructure[] {
  return [MOCK_DATA_DOG, MOCK_DATA_CAT];
}

export class List extends Component {
  pets: Array<IdPetStructure>;
  components: Array<Component>;
  constructor(private selector: string) {
    super();
    this.pets = initializePets();
    this.components = [];
    this.manageComponent();
  }

  manageComponent() {
    consoleDebug(this.pets);
    this.template = this.createTemplate();
    this.render();
    try {
      this.pets.forEach(
        (item) =>
          new Card(
            'ul.items-slot',
            item,
            this.updatePet.bind(this),
            this.deletePet.bind(this)
          )
      );
    } catch (error) {
      consoleDebug((error as Error).message);
    }
  }

  render() {
    super.cleanHtml(this.selector);
    const element = super.innRender(this.selector);
    const addButton = element.querySelector('button[title="Nueva mascota"]');
    addButton?.addEventListener('click', this.handleAdd.bind(this));
    return element;
  }

  handleAdd() {
    const modal = new Modal(
      'section.pets',
      `<div class="${list__.addSlot}" id="add-slot"></div>`,
      'Cancelar'
    );
    const add = new Add('div#add-slot', this.addPet.bind(this));
    this.components.push(add);
    modal.show();
  }

  addPet(pet: IdPetStructure) {
    this.pets = [pet, ...this.pets];
    this.manageComponent();
    return this.pets;
  }
  updatePet(id: string, data: Partial<Pet>) {
    this.pets = this.pets.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );
    this.manageComponent();
    return this.pets;
  }
  deletePet(id: string) {
    this.pets = this.pets.filter((item) => item.id !== id);
    this.manageComponent();
    return this.pets;
  }

  private createTemplate() {
    return `
        <section class="pets" aria-label='pets'>
            <button aria-label="add" title="Nueva mascota" class="${list__.add}">➕</button>
            <ul class="${list__.container} items-slot"></ul>
        </section>
        `;
  }
}
