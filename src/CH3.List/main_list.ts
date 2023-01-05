// import { App } from './components/app/app';
import { consoleDebug } from '../lib/tools/debug';

console.log('Loaded App');

try {
  // new App();
} catch (error) {
  consoleDebug((error as Error).message);
}
