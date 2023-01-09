import { Pokemon, ProtoPokemon } from '../../models/pokemon';
import { URL_POKE_API, URL_FAVORITES } from '../config';
import { createPokeRepo } from '../repository/poke.repo';

export type StateStructure = {
  count: number;
  nextUrl: string | null;
  previousUrl: string | null;
  pokeData: Array<Pokemon>;
  favorites: Array<Pokemon>;
};

interface StateMethods {
  updateState: () => Promise<void>;
  hydrateData: () => Promise<void>;
  hydrateFavorites: () => Promise<void>;
  changeFavorites: (id: number) => Promise<State | null>;
  getDetail: (origin: string, pokeId: number) => Pokemon;
}

export class MockState implements StateStructure {
  count: number;
  nextUrl: string | null;
  previousUrl: string | null;
  pokeData: Array<Pokemon>;
  favorites: Array<Pokemon>;
  constructor() {
    this.count = 0;
    this.nextUrl = '';
    this.previousUrl = '';
    this.pokeData = [];
    this.favorites = [];
  }
}

export class State implements StateStructure, StateMethods {
  count: number;
  nextUrl: string | null;
  previousUrl: string | null;
  pokeData: Array<Pokemon>;
  favorites: Array<Pokemon>;
  constructor() {
    this.count = 0;
    this.nextUrl = '';
    this.previousUrl = '';
    this.pokeData = [];
    this.favorites = [];
    this.updateState();
  }

  async updateState() {
    await Promise.all([this.hydrateData(), this.hydrateFavorites()]);
    // for easy testing console State
    // console.log(this);
    document.dispatchEvent(new Event('stateLoaded'));
  }

  async hydrateData(url = URL_POKE_API) {
    const initialPokeResponse = await createPokeRepo().fetchPoke<ProtoPokemon>(
      url
    );
    this.count = initialPokeResponse.count;
    this.nextUrl = initialPokeResponse.next;
    this.previousUrl = initialPokeResponse.previous;

    const initialPokeList = initialPokeResponse.results;
    const fullPokes = await Promise.all(
      initialPokeList.map(async (item: ProtoPokemon) => {
        const pokeData = await createPokeRepo().queryPoke(item.url);
        return pokeData;
      })
    );

    this.pokeData = initialPokeList
      .map((item: ProtoPokemon) => {
        const id = item.url.split('/').at(-2);
        if (!id || isNaN(+id)) return;
        const fullPoke = fullPokes.find((poke: Pokemon) => {
          return poke.name === item.name;
        }) as Pokemon;
        // if (!fullPoke) throw new Error('');
        const result: Pokemon = { ...fullPoke, ...item, id: +id };
        return result;
      })
      .filter((item) => typeof item !== 'undefined') as Array<Pokemon>;

    /* Código alternativo
    return initialPokeList.results.reduce(async (prev, item) => {
      const id = item.url.split('/').at(-2);
      const pokeData = await fetchPoke(item.url);
      await prev;
      return [...prev, { ...item, id: id, sprites: pokeData.sprites }];
    }, []); */
  }

  async hydrateFavorites() {
    this.favorites = await createPokeRepo().fetchPoke<Pokemon>(URL_FAVORITES);
  }

  async changeFavorites(id: number) {
    if (this.favorites.find((item) => +item.id === +id)) {
      await createPokeRepo().removePoke(URL_FAVORITES + id);
      this.favorites = this.favorites.filter((item) => +item.id !== +id);
    } else {
      const newFavorite = this.pokeData.find((item) => +item.id === +id);
      if (!newFavorite) return null;
      const resp = await createPokeRepo().addPoke(URL_FAVORITES, newFavorite);
      this.favorites = [...this.favorites, resp];
    }
    return this;
  }

  getDetail(origin: string, pokeId: number) {
    let pokeData;
    if (origin === '.my-poke-list__list') {
      pokeData = this.favorites.find((poke) => poke.id === +pokeId);
    } else {
      pokeData = this.pokeData.find((poke) => poke.id === +pokeId);
    }
    return pokeData as Pokemon;
  }
}
