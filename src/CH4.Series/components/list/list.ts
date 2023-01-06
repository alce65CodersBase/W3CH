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
    const child = new SeriesCard(`ul.series-list`);
    this.children.push(child);
    return element;
  }

  private createTemplate() {
    return `
        <section class="series-pending ${list__.container} lista" role="presentation" aria-label="List">
          <h3 class="subsection-title">Pending series</h3>
          <p class="info">You have 4 series pending to watch</p>
          <!--<p class="info">Congrats! You've watched all your series</p>-->
          <ul class="series-list"></ul>
        </section>
        `;
  }
}
