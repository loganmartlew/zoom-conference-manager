import dayjs from 'dayjs';
import { renderWithRouter, screen } from '../../../test-utils';
import RehearsalsCard from '../RehearsalsCard';

describe('Test RehearsalsCard', () => {
  test('Card can be rendered', async () => {
    renderWithRouter(
      <RehearsalsCard
        rehearsal={{
          name: 'test name',
          startDate: dayjs('2022-09-15').toDate(),
          startTime: dayjs('2022-09-15 12:00').toDate(),
          endTime: dayjs('2022-09-15 12:30').toDate(),
          presenter: 'Test Presenter',
        }}
      />,
      {}
    );

    const cardName = screen.getByText(/test name/i);
    const cardDate = screen.getByText(/2022-09-15/i);
    const cardStartTime = screen.getByText(/12:00/i);
    const cardEndTime = screen.getByText(/12:30/i);
    const cardPresName = screen.getByText(/Test Presenter/i);

    expect(cardName).toBeTruthy();
    expect(cardDate).toBeTruthy();
    expect(cardStartTime).toBeTruthy();
    expect(cardEndTime).toBeTruthy();
    expect(cardPresName).toBeTruthy();
  });
});
