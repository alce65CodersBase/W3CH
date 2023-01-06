export type HasId = {
  id: string;
};

export type PetStructure = {
  name: string;
  kind: string;
  breed: string;
  age: number;
  age_unit: string;
  weight: number;
  weight_unit: string;
  owner: string;
  isAdopted: boolean;
  picture: string;
};

export type IdPetStructure = HasId & PetStructure;

export class Pet implements IdPetStructure {
  static generateId() {
    const aNumbers = new Uint32Array(1);
    crypto.getRandomValues(aNumbers);
    return ('000000' + aNumbers[0]).slice(-6);
  }
  id: string;
  isAdopted: boolean;
  constructor(
    public name: string,
    public kind: string,
    public breed: string,
    public age: number,
    public age_unit: string,
    public weight: number,
    public weight_unit: string,
    public owner: string,
    public picture: string
  ) {
    this.id = Pet.generateId();
    this.isAdopted = false;
  }
}
