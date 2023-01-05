import { Component } from '../../../../lib/component/component';
import { consoleDebug } from '../../../../lib/tools/debug';
import { MOCK_DATA_CAT, MOCK_DATA_DOG } from '../../../models/mock';
import { IdPetStructure, Pet } from '../../../models/pet';
import { Card } from '../card/card';
import list__ from './list.module.css';

function initializePets(): IdPetStructure[] {
  return [MOCK_DATA_DOG, MOCK_DATA_CAT];
}

export class List extends Component {
  pets: Array<IdPetStructure>;
  constructor(private selector: string) {
    super();
    this.pets = initializePets();
    this.manageComponent();
  }

  manageComponent() {
    consoleDebug(this.pets);
    this.template = this.createTemplate();
    this.render();
    try {
      // new Add('section.pets', this.addPet.bind(this));
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
    return super.innRender(this.selector);
  }

  addPet(task: Pet) {
    this.pets = [...this.pets, task];
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
            <ul class="${list__.container} items-slot"></ul>
        </section>
        `;
  }
}
