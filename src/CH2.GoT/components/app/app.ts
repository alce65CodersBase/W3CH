import { HomePage } from '../home/home';
import { consoleDebug } from '../../../lib/tools/debug';

export class App {
  constructor(selector = '.root') {
    try {
      // for later new Header('.root');
      new HomePage(selector);
      // for later new Footer('.root');
    } catch (error) {
      consoleDebug((error as Error).message);
    }
  }
}
