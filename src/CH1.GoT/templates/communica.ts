import { Character } from '../models/character';

export const getCommunicationsTemplate = (item: Character) => {
  const fullName = `${item.name} ${item.family}`;
  const image = `img/${item.name.toLowerCase()}.jpg`;
  const template = `
    <p class="communications__text">${item.communicate()}</p>
    <img class="communications__picture" src="${image}" alt="${fullName}" />
`;
  return template;
};
