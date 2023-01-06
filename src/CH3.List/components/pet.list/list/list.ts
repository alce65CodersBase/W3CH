import { Component } from '../../../../lib/component/component';
import { Modal } from '../../../../lib/modal/modal';
import { consoleDebug } from '../../../../lib/tools/debug';
import { IdPetStructure, Pet } from '../../../models/pet';
import {
  getPets,
  savePets,
} from '../../../services/repository/repository.local';
import { Add } from '../add/add';
import { Card } from '../card/card';
import list__ from './list.module.css';

export class List extends Component {
  pets: Array<IdPetStructure>;
  components: Array<Component>;
  constructor(private selector: string) {
    super();
    this.pets = [];
    this.components = [];
    this.initializePets();
  }

  async initializePets() {
    this.pets = await getPets();
    // con tiempo de retraso this.pets = await getPetsDelay()
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
    savePets(this.pets);
    this.manageComponent();
    return this.pets;
  }
  updatePet(id: string, data: Partial<Pet>) {
    this.pets = this.pets.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );
    savePets(this.pets);
    this.manageComponent();
    return this.pets;
  }
  deletePet(id: string) {
    this.pets = this.pets.filter((item) => item.id !== id);
    savePets(this.pets);
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
