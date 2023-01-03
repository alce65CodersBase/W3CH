import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { appGoT } from './app';
import { MOCK_KING } from './services/mock';

const mockData = [MOCK_KING];
mockData[0].dead = jest.fn();
mockData[0].communicate = jest.fn();

const mockCommunicate = mockData[0].communicate as jest.Mock;
const mockDead = mockData[0].dead as jest.Mock;

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
    test('Then it should render two buttons', async () => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(2);
      // habla
      const message = 'Vais a morir todos';
      mockCommunicate.mockReturnValue(message);
      await userEvent.click(buttons[0]);
      const messageElement = await screen.findByText(message);
      expect(messageElement).toBeInTheDocument();
      expect(mockCommunicate).toHaveBeenCalled();
      // muere
      await userEvent.click(buttons[1]);
      expect(mockDead).toHaveBeenCalled();
    });
  });
});
