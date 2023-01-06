import { HomePage } from '../../pages/home/home';
import { consoleDebug } from '../../../lib/tools/debug';

export class App {
  constructor(selector = '.root') {
    try {
      new HomePage(selector);
    } catch (error) {
      consoleDebug((error as Error).message);
    }
  }
}
