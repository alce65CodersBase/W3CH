import { Component } from '../../../lib/component/component';
import { SeriesCard } from '../serie.card/serie.card';
import list__ from './list.module.css';

export class List extends Component {
  children: Array<Component>;
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.children = [];
    this.render();
  }
  render() {
    const element = super.innRender(this.selector);
    const child = new SeriesCard(`.lista`);
    this.children.push(child);
    return element;
  }

  private createTemplate() {
    return `
        <div class="${list__.container} lista" role="presentation" aria-label="List">
            List
        </div>
        `;
  }
}
