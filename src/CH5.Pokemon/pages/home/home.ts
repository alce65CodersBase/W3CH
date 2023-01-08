import { Component } from '../../../lib/component/component';

export class HomePage extends Component {
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
        <h2 aria-label="Home">Pokemon List</h2>
      </section>
    `;
  }
}
