import { Component } from '../../../lib/component/component';

export class DetailsPage extends Component {
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.render();
  }

  render() {
    const element = super.innRender(this.selector);
    return element;
  }

  private createTemplate() {
    return `
      <section class="home-poke-list">
        <h2 aria-label="Details">Pokemon Detail</h2>
      </section>
    `;
  }
}
