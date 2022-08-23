import dayjs from 'dayjs';
import { renderWithRouter, screen } from '../../../test-utils';
import MeetingsList from '../MeetingsList';

describe('Test MeetingList', () => {
  test('List is rendered when blank', async () => {
    renderWithRouter(<MeetingsList meetings={[]} />, {});

    const listError = screen.getByText(/No events found/i);

    expect(listError).toBeTruthy();
  });

  test('List is rendered', async () => {
    renderWithRouter(
      <MeetingsList
        meetings={[
          {
            id: '1',
            name: 'test',
            startDateTime: dayjs('2022-08-23 11:00').toDate(),
            endDateTime: dayjs('2022-08-23 11:30').toDate(),
            zoomId: '1',
          },
        ]}
      />,
      {}
    );

    const cardName = screen.getByText(/test/i);
    const cardDate = screen.getByText(/2022-08-23/i);
    const cardStart = screen.getByText(/1100/i);
    const cardEnd = screen.getByText(/1130/i);

    expect(cardName).toBeTruthy();
    expect(cardDate).toBeTruthy();
    expect(cardStart).toBeTruthy();
    expect(cardEnd).toBeTruthy();
  });
});
