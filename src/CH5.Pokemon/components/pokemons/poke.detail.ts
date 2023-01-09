import { Component } from '../../../lib/component/component';
import { Pokemon } from '../../models/pokemon';
import { detailUrlParse } from '../../services/helpers/helpers';
import { State } from '../../services/state/state.js';
import { FavoriteIcon } from './favorite.icon';
// import { FavoriteIcon } from './favorite-icon.js';

export class PokeDetail extends Component {
  private pokeId: number;
  private origin: string;
  private pokeData: Pokemon;
  constructor(private selector: string, private state: State) {
    super();
    const { pokeId, origin } = detailUrlParse();
    this.pokeId = pokeId;
    this.origin = origin;
    this.pokeData = this.state.getDetail(this.origin, this.pokeId);
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    new FavoriteIcon('.poke-item__fav', this.state, this.pokeId);
    return element;
  }

  private createTemplate() {
    let template = `
            <h2 class="detail-title">
                <span>Detalles del Pokemon ${this.pokeId}:</span>
                <span class="detail-title__poke-name">
                    ${this.pokeData.name}
                </span>
                <span class="poke-item__fav"></span>
            </h2>
            <div class="poke-detail">`;
    template += `<ul>${this.showPokeData(this.pokeData)}</ul>`;
    template += `</div>`;
    return template;
  }

  private showPokeData(poke: { [key: string]: any }) {
    let template = '';
    for (const key in poke) {
      if (Object.hasOwnProperty.call(poke, key) && key !== 'name') {
        const value = poke[key];
        if (typeof value === 'object') {
          template += `<li>
                        <details>
                        <summary>${key}:</summary>
                        <ul>${this.showPokeData(value)}</ul>
                        </details>
                    </li>`;
        } else {
          template += `<li><span>${key}</span>: ${value}</li>`;
        }
      }
    }
    return template;
  }
}
