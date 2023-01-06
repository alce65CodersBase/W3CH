import { Component } from '../../../../lib/component/component';
import { IdPetStructure, Pet, PetStructure } from '../../../models/pet';
import add__ from './add.module.css';

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
    public handleAdd: (pet: IdPetStructure) => void
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
      dataForm.picture,
      dataForm.age,
      dataForm.weight,
      dataForm.age_unit,
      dataForm.weight_unit,
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
        <section class="${add__.container}">
            <h3 class="${add__.title}">Añadir mascota</h3>
              <form class="add-pet">
                <div>
                  <label class="${add__.label}" for="name">Nombre</label>
                  <input class="${add__.input}" type="text" name="name" id="name"
                  placeholder="Nombre de la mascota" required>
                </div>
                <div>
                  <label class="${add__.label} for="kind">Especie</label>
                  <input class="${add__.input}" type="text" name="kind" id="kind"
                  placeholder="Perro / Gato / Hamster ..." required>
                </div>
                <div>
                  <label class="${add__.label} for="bread">Raza</label>
                  <input class="${add__.input}" type="text" name="bread" id="bread"
                  placeholder="Dogo / Siamés / Hamster chino...">
                </div>
                <div>
                  <label class="${add__.label} for="age">Edad</label>
                  <div class="${add__.options}">
                    <input class="${add__.input}" type="number" name="age" id="age"
                    placeholder="Edad aproximada">
                    <select name="age_unit" id="age_unit">
                      <option value='years'>años</option>
                      <option value='months'>meses</option>
                      <option value='days'>días</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="${add__.label} for="weight">Peso</label>
                  <div class="${add__.options}">
                    <input class="${add__.input}" type="number" name="weight" id="weight"
                    placeholder="Peso aproximado">
                    <select name="weight_unit" id="weight_unit">
                      <option value='kg'>kg</option>
                      <option value='g'>g</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="${add__.label} for="picture">Imagen</label>
                  <input class="${add__.input}" type="text" name="picture" id="picture"
                  placeholder="url de la imagen">
                </div>
                <div>
                    <button class="${add__.button}" type='submit'>Añadir</button>
                </div>
            </form>
        </section>
        `;
  }
}
