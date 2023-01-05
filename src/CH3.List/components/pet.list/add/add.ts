import { Component } from '../../../../lib/component/component';
import { Pet, PetStructure } from '../../../models/pet';

type DataFormType = Pick<
  PetStructure,
  | 'name'
  | 'kind'
  | 'breed'
  | 'age'
  | 'age_unit'
  | 'weight'
  | 'weight_unit'
  | 'picture'
>;

export class Add extends Component {
  constructor(
    private selector: string,
    public handleAdd: (pet: PetStructure) => void
  ) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector, 'start');
    element
      .querySelector('form.add-pet')
      ?.addEventListener('submit', this.handleForm.bind(this));
    return element;
  }

  handleForm(event: Event) {
    const dataForm: DataFormType = {
      name: '',
      kind: '',
      breed: '',
      age: NaN,
      age_unit: '',
      weight: NaN,
      weight_unit: '',
      picture: '',
    };

    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const inputs = [
      ...formElement.querySelectorAll('[type="text"]'),
      ...formElement.querySelectorAll('[type="number"]'),
      ...formElement.querySelectorAll('select'),
    ];
    [
      dataForm.name,
      dataForm.kind,
      dataForm.breed,
      dataForm.age,
      dataForm.age_unit,
      dataForm.weight,
      dataForm.weight_unit,
      dataForm.picture,
    ] = [...inputs].map((item) => (item as HTMLFormElement).value);
    const newPet = new Pet(
      dataForm.name,
      dataForm.kind,
      dataForm.breed,
      dataForm.age,
      dataForm.age_unit,
      dataForm.weight,
      dataForm.weight_unit,
      '',
      dataForm.picture
    );
    this.handleAdd({ ...newPet });
  }

  private createTemplate() {
    return `
        <section>
            <h3>Añadir tarea</h3>
            <form class="add-pet">
                <div>
                    <label for="name">Nombre</label>
                    <input type="text" name="name" id="name" placeholder="Nombre de la mascota" required>
                </div>
                <div>
                    <label for="kind">Especie</label>
                    <input type="text" name="kind" id="kind" placeholder="Perro / Gato / Hamster ...)">
                </div>
                <div>
                    <button type='submit'>Añadir</button>
                </div>
            </form>
        </section>
        `;
  }
}
