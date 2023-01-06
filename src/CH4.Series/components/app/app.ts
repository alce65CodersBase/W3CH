import { SeriesPage } from '../../pages/series/series';
import { consoleDebug } from '../../../lib/tools/debug';

export class App {
  constructor(selector = '.root') {
    try {
      new SeriesPage(selector);
    } catch (error) {
      consoleDebug((error as Error).message);
    }
  }
}
