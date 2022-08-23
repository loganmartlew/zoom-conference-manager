import dayjs from 'dayjs';
import { renderWithRouter, screen } from '../../../test-utils';
import MeetingCard from '../MeetingCard';

describe('Test MeetingCard', () => {
  test('Card can be rendered', async () => {
    renderWithRouter(
      <MeetingCard
        meeting={{
          ubid: '1',
          name: 'test',
          startDateTime: dayjs('2022-08-22 12:00').toDate(),
          endDateTime: dayjs('2022-08-22 12:30').toDate(),
          zoomId: '1',
        }}
      />,
      {}
    );

    const cardName = screen.getByText(/test/i);
    const cardDate = screen.getByText(/2022-08-22/i);
    const cardStart = screen.getByText(/1200/i);
    const cardEnd = screen.getByText(/1230/i);

    expect(cardName).toBeTruthy();
    expect(cardDate).toBeTruthy();
    expect(cardStart).toBeTruthy();
    expect(cardEnd).toBeTruthy();
  });
});
