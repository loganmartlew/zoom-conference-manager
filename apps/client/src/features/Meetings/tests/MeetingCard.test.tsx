import dayjs from 'dayjs';
import { QueryClientProvider, QueryClient } from 'react-query';
import { render, screen } from '../../../test-utils';
import MeetingCard from '../MeetingCard';

describe('Test MeetingCard', () => {
  test('Card can be rendered', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MeetingCard
          meeting={{
            id: '1',
            name: 'test',
            startDateTime: dayjs('2022-08-22 12:00').toDate(),
            endDateTime: dayjs('2022-08-22').toDate(),
            zoomId: '1',
          }}
        />
      </QueryClientProvider>,
      {}
    );

    const cardName = screen.getByText(/test/i);

    expect(cardName).toBeTruthy();
  });
});
