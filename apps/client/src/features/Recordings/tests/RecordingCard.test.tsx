import { renderWithRouter, screen } from '../../../test-utils';
import RecordingCard from '../RecordingCard';

describe('Test RecordingCard', () => {
  test('Card can be rendered', async () => {
    renderWithRouter(
      <RecordingCard id='0' name='test' start='2022-08-09' end='2022-08-10' />,
      {}
    );

    const cardName = screen.getByText(/test/i);
    const startDate = screen.getByText(/2022-08-09/i);
    const endDate = screen.getByText(/2022-08-10/i);

    expect(cardName).toBeTruthy();
    expect(startDate).toBeTruthy();
    expect(endDate).toBeTruthy();
  });
});
