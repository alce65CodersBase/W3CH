import { Component } from '../../../lib/component/component';

export class Sample extends Component {
  constructor(private selector: string) {
    super();
    this.template = this.createTemplate();
    this.render();
  }
  render() {
    return super.innRender(this.selector);
  }

  private createTemplate() {
    return `
        <div class=".sample" role="generic">
            Sample
        </div>
        `;
  }
}
