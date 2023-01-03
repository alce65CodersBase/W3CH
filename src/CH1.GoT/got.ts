import { Character } from './models/character';
import { createCharacters } from './services/characters';
import { getCardTemplate } from './templates/card';
import { getCommunicationsTemplate } from './templates/comunics';

type Actions = 'muere' | 'habla';

const characters = createCharacters();

const renderCards = (selector: HTMLElement) => {
  characters.forEach((item) => {
    const template = `
      <li class="character col">${getCardTemplate(item)}</li>
    `;
    selector.insertAdjacentHTML('beforeend', template);
  });
};

const handleCommunicate = (characterName: string) => {
  console.log('Muere', characterName);
  const character = characters.find(
    (item) => item.name === characterName
  ) as Character;
  const element = <HTMLDivElement>document.querySelector('.communications');
  element?.insertAdjacentHTML(
    'afterbegin',
    getCommunicationsTemplate(character)
  );
  element.classList.toggle('on');
  setTimeout(() => {
    element.classList.toggle('on');
    element.innerHTML = '';
  }, 2000);
};

const handleDead = (characterName: string) => {
  console.log('Habla', characterName);
  const id = characters.findIndex((item) => item.name === characterName);
  characters[id].dead();
  appGoT();
};

const handleClick = (ev: Event) => {
  const element = <HTMLButtonElement>ev.target;
  const action = <Actions>element.textContent?.trim();
  const characterName = <string>element.dataset.id;
  const possibleActions = {
    muere: () => handleDead(characterName),
    habla: () => handleCommunicate(characterName),
  };
  possibleActions[action]();
};

const manageRender = () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((item) => item.addEventListener('click', handleClick));
};

const appGoT = () => {
  // Create ul in app initial slot
  const elementApp = <HTMLDivElement>document.querySelector('div.app');
  elementApp.innerHTML = '<ul class="characters-list row list-unstyled"></ul>';
  const elementList = <HTMLUListElement>elementApp.firstChild;

  // Create and render cards
  renderCards(elementList);

  // Assign handlers to card buttons

  manageRender();
};

appGoT();
