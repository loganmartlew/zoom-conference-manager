import dayjs from 'dayjs';
import { QueryClientProvider, QueryClient } from 'react-query';
import { render, screen, fireEvent } from '../../../test-utils';
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

  test('Testing when a remove meeting icon clicked info required info displayed', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MeetingCard
          meeting={{
            id: '0001',
            name: 'remove meeting test',
            startDateTime: dayjs('2022-09-05 00:00').toDate(),
            endDateTime: dayjs('2022-09-06').toDate(),
            zoomId: '1',
          }}
        />
      </QueryClientProvider>,
      {}
    );

    // Test that prior to click phrase "Are you sure you want to delete the meeting" is not
    // present.
    let deleteConfirmation = screen.queryByText(
      /Are you sure you want to delete the meeting/i
    );
    expect(deleteConfirmation).toBeFalsy();

    // Test that confirmation dialog loads to screen after the delete icon is clicked
    fireEvent.click(screen.getByTestId('delete-meeting-0001'));
    deleteConfirmation = screen.queryByText(
      /Are you sure you want to delete the meeting/i
    );
    expect(deleteConfirmation).toBeTruthy();

    // Test that the cancel button rendered
    const cancelBtn = screen.getByTestId('confirmation--dialog--cancel');
    expect(cancelBtn).toBeTruthy();

    // test confirm button rendered
    const confirmBtn = screen.getByTestId('confirmation--dialog--confirm');
    expect(confirmBtn).toBeTruthy();
  });
});
