import { Component } from '../../../../lib/component/component';

export class List extends Component {
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
        <div>List</div>
        `;
  }
}
