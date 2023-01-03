import { screen } from '@testing-library/dom';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { appGoT } from './app';
import { MOCK_KING } from './services/mock';

const mockData = [MOCK_KING];

describe('Given got application', () => {
  describe('When it is call inside a HTML document', () => {
    beforeAll(async () => {
      const homeHTML = `
        <div class="app container"></div>
        <div class="communications"></div>`;
      document.body.innerHTML = homeHTML;
      appGoT(mockData);
    });
    test('Then a title with "Simba Leon" should be in the document ', () => {
      const title = /Simba Leon/i;
      const element = screen.getByRole('heading', { name: title });
      expect(element).toBeInTheDocument();
      // expect(consoleDebug).toHaveBeenCalledWith('App');
    });
    test('Then it should ...', () => {
      //
    });
  });
});
