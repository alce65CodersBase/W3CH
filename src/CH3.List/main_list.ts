import { consoleDebug } from '../lib/tools/debug';
import { App } from './components/app/app';

console.log('Loaded App');

try {
  new App();
} catch (error) {
  consoleDebug((error as Error).message);
}
