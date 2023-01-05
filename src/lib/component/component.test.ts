import { Component } from './component';
import '@testing-library/jest-dom';

describe('Given a class that extends abstract class Component', () => {
  describe('When is exactly the same as the parent class', () => {
    class Test extends Component {}
    test('Then public render method should not return value', () => {
      const testComponent = new Test();
      expect(testComponent.render()).toBeFalsy();
    });
  });

  describe(`When a new Component class extends the parent class
            and render is overwrite with innRender without selector`, () => {
    class Test extends Component {
      render() {
        return super.innRender('');
      }
    }
    test('Then public render method  should throw an error', () => {
      const testComponent = new Test();
      expect(() => {
        testComponent.render();
      }).toThrowError('Invalid selector');
    });
  });

  describe(`When a new Component class extends the parent class
            and render is overwrite with innRender without valid selector`, () => {
    class Test extends Component {
      render() {
        return super.innRender('.no-valid');
      }
    }
    test('Then public render method  should throw an error', () => {
      const testComponent = new Test();
      expect(() => {
        testComponent.render();
      }).toThrowError('Invalid selector');
    });
  });
  describe(`When a new Component class extends the parent class
            and render is overwrite with innRender with a valid selector`, () => {
    document.body.innerHTML = `<div class="root"></div>`;
    class Test extends Component {
      template = `<p class="test">Test</p>`;
      render() {
        return super.innRender('.root');
      }
    }
    test('Then public render method should render a component', () => {
      const testComponent = new Test();
      const element = testComponent.render();
      expect(element).toBeInTheDocument();
    });
  });

  describe(`When a new Component class extends the parent class
    and render is overwrite with cleanHTML with a valid selector`, () => {
    document.body.innerHTML = `<div class="root"></div>`;
    class Test extends Component {
      render() {
        return super.cleanHtml('div');
      }
    }
    test('Then public render method should throw an error', () => {
      const testComponent = new Test();
      const element = testComponent.render();
      expect(element).toBeInTheDocument();
    });
  });
});
