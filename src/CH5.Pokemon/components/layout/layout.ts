import { Component } from '../../../lib/component/component';
import { Header } from '../layout/header';
import { Footer } from '../layout/footer';
import { Menu } from '../layout/menu';
import { MenuOptionsType } from '../../types/menu.options';
import { Main } from './main';

export class Layout extends Component {
  constructor(private selector: string, private menuItems: MenuOptionsType) {
    super();
    this.template = this.createTemplate();
    this.render();
  }
  render() {
    const element = super.innRender(this.selector);
    this.children.push(new Header(this.selector));
    // inside <header>
    this.children.push(new Menu('header', this.menuItems));
    // end inside <header>
    this.children.push(new Main(this.selector));
    this.children.push(new Footer(this.selector));
    return element;
  }

  private createTemplate() {
    return ``;
  }
}
