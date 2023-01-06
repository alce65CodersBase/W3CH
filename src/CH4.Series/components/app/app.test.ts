import { SeriesPage } from '../../pages/series/series';
import { App } from './app.js';
import { consoleDebug } from '../../../lib/tools/debug';

jest.mock('../../pages/series/series');
jest.mock('../../../lib/tools/debug');

describe('Given "App" class', () => {
  describe('When we instantiate it', () => {
    test('Then the application components, included SeriesPage, should be rendered ', () => {
      const app = new App();
      expect(app).toBeInstanceOf(App);
      expect(SeriesPage).toHaveBeenCalled();
    });
  });

  describe('When any component can be instantiated', () => {
    test('Then the consoleDebug should be call', () => {
      (SeriesPage as jest.Mock).mockImplementation(() => {
        throw new Error('');
      });
      const app = new App();
      expect(app).toBeInstanceOf(App);
      expect(consoleDebug).toHaveBeenCalled();
    });
  });
});
