import dayjs from 'dayjs';
import { renderWithRouter, screen } from '../../../test-utils';
import MeetingCard from '../MeetingCard';

describe('Test RecordingCard', () => {
  test('Card can be rendered', async () => {
    renderWithRouter(
      <MeetingCard
        meeting={{
          ubid: '1',
          name: 'test',
          startDateTime: dayjs('2022-08-22 12:00').toDate(),
          endDateTime: dayjs('2022-08-22').toDate(),
          zoomId: '1',
        }}
      />,
      {}
    );

    const cardName = screen.getByText(/test/i);

    expect(cardName).toBeTruthy();
  });
});
