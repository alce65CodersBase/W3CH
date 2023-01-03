import { appGoT } from './app';
import { createCharacters } from './services/characters';

const characters = createCharacters();
appGoT(characters);
