import { Character } from '../models/character';
import { Counselor } from '../models/counselor';
import { Fighter } from '../models/fighter';
import { King } from '../models/king';
import { Squire } from '../models/squire';
import { emoji } from '../services/emojis';

type AnyCharacter = King & Fighter & Counselor & Squire;

const createOverlay = (item: AnyCharacter, characterType: string) => {
  const options = {
    king: `
    <li>Años de reinado: ${item?.kingdomYears?.toString()}</li>
    `,
    fighter: `
    <li>Arma: ${item?.weapon}</li>
    <li>Destreza: ${item?.skill}</li>
    `,
    counselor: `
    <li>Asesora a: ${item?.chief?.name}</li>
    `,
    squire: `
    <li>Servilismo: ${item?.submission}</li>
    <li>Sirve a: ${item?.master?.name}</li>
    `,
  };

  return options[characterType as keyof typeof options];
};

export const getCardTemplate = (item: Character) => {
  const fullName = `${item.name} ${item.family}`;
  const image = `img/${item.name.toLowerCase()}.jpg`;
  const state = item.isAlive
    ? '<i class="fas fa-thumbs-up"></i>'
    : '<i class="fas fa-thumbs-down"></i>';
  const characterType: string =
    Object.getPrototypeOf(item).constructor.name.toLowerCase();
  const overlay = createOverlay(item as AnyCharacter, characterType);

  const template = `
    <div class="card character__card">
      <img
        src="${image}"
        alt="${fullName}"
        class="character__picture card-img-top"
      />
      <div class="card-body">
        <h2 class="character__name card-title h4">${fullName}</h2>
        <div class="character__info">
          <ul class="list-unstyled">
            <li>Edad: ${item.age} años</li>
            <li>Estado: ${state}</li>
          </ul>
        </div>
        <div class="character__overlay">
          <ul class="list-unstyled">
            ${overlay}
          </ul>
          <div class="character__actions">
            <button class="character__action btn" ${!item.isAlive && 'disabled'}
              data-id=${item.name}>
              habla</button>
            <button class="character__action btn" ${!item.isAlive && 'disabled'}
              data-id=${item.name}>
              muere</button>
          </div>
        </div>
      </div>
      <i class="emoji">
        ${emoji[characterType as keyof typeof emoji]}
      </i>
    </div>
  `;
  return template;
};
