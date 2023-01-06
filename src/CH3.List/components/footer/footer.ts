import { Component } from '../../../lib/component/component';
import footer__ from './footer.module.css';

export class Footer extends Component {
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
        <footer class="${footer__.container}">
            <address>
                ISDI Coders
            </address>
        </footer>
        `;
  }
}
