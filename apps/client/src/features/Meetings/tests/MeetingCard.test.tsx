import dayjs from 'dayjs';
import { QueryClientProvider, QueryClient } from 'react-query';
import { render, screen, fireEvent } from '../../../test-utils';
import MeetingCard from '../MeetingCard';

const makeMockMeetingCard = (
  id: string,
  name: string,
  startDateTime: Date,
  endDateTime: Date,
  zoomId: string
) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <MeetingCard
        meeting={{
          id,
          name,
          startDateTime,
          endDateTime,
          zoomId,
        }}
      />
    </QueryClientProvider>
  );
};

/**
 * This function is used to check check that the
 * element with given test id (inputTestId param)
 * can be found on the screen.
 * @param inputTestId
 */
const checkScreenWithTestId = (inputTestId: string) => {
  expect(screen.getByTestId(inputTestId));
};

/**
 * This function is used to check that with a given
 * regular expression (inputRegExp param) that the
 * text based on the regular expression can be found
 * or not on the screen depending on expected,
 * if expected is true it can be found otherwise false.
 * @param inputRegExp
 * @param expected
 */
const checkScreenWithRegExp = (inputRegExp: RegExp, expected: boolean) => {
  if (expected) {
    expect(screen.queryByText(inputRegExp)).toBeTruthy();
  } else {
    expect(screen.queryByText(inputRegExp)).toBeFalsy();
  }
};

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
      makeMockMeetingCard(
        '0001',
        'remove meeting test',
        dayjs('2022-09-05 00:00').toDate(),
        dayjs('2022-09-06').toDate(),
        '1'
      )
    );

    // Test that prior to click phrase "Are you sure you want to delete the meeting" is not
    // present.
    checkScreenWithRegExp(
      /Are you sure you want to delete the meeting/i,
      false
    );

    // Test that confirmation dialog loads to screen after the delete icon is clicked
    fireEvent.click(screen.getByTestId('delete-meeting-0001'));
    checkScreenWithRegExp(/Are you sure you want to delete the meeting/i, true);

    // Test that the cancel button rendered
    checkScreenWithTestId('confirmation--dialog--cancel');

    // test confirm button rendered
    checkScreenWithTestId('confirmation--dialog--confirm');
  });
});
