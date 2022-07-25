/* eslint-disable react/jsx-boolean-value */
import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
import { render, screen, fireEvent } from '@testing-library/react';
import UpdateMeeting from './UpdateMeeting';

// TODO: need to refacor in terms of new input methods for backend

const mockGetMeeting = (id: string): Promise<MeetingDTO> => {
  let state: MeetingDTO;
  if (id === '1') {
    state = {
      ubid: '1',
      name: 'Test 1',
      startDateTime: '23/06/22',
      duration: 1,
      eventId: 'hello',
    };
  } else {
    state = {
      ubid: '2',
      name: 'Test 2',
      startDateTime: '24/06/22',
      duration: 2,
      eventId: 'world',
    };
  }
  return Promise.resolve(state);
};

// note we can disable the typscript warnings
// for unused variables as it is a mock function and the input
// parameters (variables) are not required to be used in this case.
const mockUpdateMeeting = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ubid: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  meetingData: MeetingDTO
): Promise<MeetingDTO> => {
  const meeting: MeetingDTO = {
    ubid: '',
    name: '',
    startDateTime: '',
    duration: 0,
    eventId: '',
  };
  return Promise.resolve(meeting);
};

/**
 * this method takes a testId (data-testid) for a text field mui component
 * and returns its value.
 * @param testId the input testId
 * @returns a string representing the input text in the text field
 */
const getTextFieldValue = (testId: string): string | undefined => {
  return screen.getByTestId(testId).querySelector('input')?.value;
};

/**
 * this method takes a testIdInput (data-testid) a testIdField (data-testid)
 * a value to change the text field to, and an errorMsg to display an error
 * if something went wrong in the test case. It updates the input text field
 * with the input value and returns the resulting value.
 * @param testIdInput
 * @param testIdField
 * @param value
 * @param errorMsg
 * @returns
 */
const changeTextFieldValue = (
  testIdInput: string,
  testIdField: string,
  value: string,
  errorMsg: string
): string | undefined => {
  const input = screen.getByTestId(testIdInput);
  if (!input) {
    throw Error(errorMsg);
  }

  fireEvent.change(input, { target: { value } });
  return screen.getByTestId(testIdField).querySelector('input')?.value;
};

/**
 * this method takes a testIdIcon (data-testid) and clicks
 * the mui icon
 * @param testIdIcon
 */
const clickEditIcon = (testIdIcon: string): void => {
  fireEvent.click(screen.getByTestId(testIdIcon));
};

describe('UpdateMeeting testing', () => {
  test('Checks that all fields are rendered when not editable', () => {
    render(
      <UpdateMeeting
        getMeetingData={mockGetMeeting}
        updateMeetingData={mockUpdateMeeting}
        ubid='1'
        eventId='1'
        editOnRender={false}
      />
    );

    // test the name field input
    const name = getTextFieldValue('update--meeting--name');
    expect(name).toBe('Test 1');

    // test the date field input
    const date = getTextFieldValue('update--meeting--date');
    expect(date).toBe('23/06/22');

    // test the time field input
    const time = getTextFieldValue('update--meeting--time');
    expect(time).toBe('1400');

    // test the duration field input
    const duration = getTextFieldValue('update--meeting--duration');
    expect(duration).toBe('1');

    const event = getTextFieldValue('update--meeting--event');
    expect(event).toBe('hello');
  });

  test('Checks that all fields are rendered when editable, and that they can be edited', () => {
    render(
      <UpdateMeeting
        getMeetingData={mockGetMeeting}
        updateMeetingData={mockUpdateMeeting}
        ubid='1'
        eventId='1'
        editOnRender={true}
      />
    );

    // test the name field
    const nameText = changeTextFieldValue(
      'update--meeting--textfield--name',
      'update--meeting--name',
      'New Test',
      'name field is undefined'
    );
    expect(nameText).toBe('New Test');

    // test the date field
    const dateText = changeTextFieldValue(
      'update--meeting--textfield--date',
      'update--meeting--date',
      '15/07/22',
      'date field is undefined'
    );
    expect(dateText).toBe('15/07/22');

    // test the time field
    const timeText = changeTextFieldValue(
      'update--meeting--textfield--time',
      'update--meeting--time',
      '0000',
      'time field is undefined'
    );
    expect(timeText).toBe('0000');

    // test the duration field
    const durationText = changeTextFieldValue(
      'update--meeting--textfield--duration',
      'update--meeting--duration',
      '3',
      'duration field is undefined'
    );
    expect(durationText).toBe('3');

    // test the event field
    const eventText = changeTextFieldValue(
      'update--meeting--textfield--event',
      'update--meeting--event',
      'Test Event!',
      'event field is undefined'
    );
    expect(eventText).toBe('Test Event!');
  });

  test('Checks that when the edit icon is clicked changes the relative field from disabled to enabled', () => {
    // note that the editing of fields is initially set to false hence nothing
    // can be edited until the edit icons are clicked.
    render(
      <UpdateMeeting
        getMeetingData={mockGetMeeting}
        updateMeetingData={mockUpdateMeeting}
        ubid='1'
        eventId='1'
        editOnRender={false}
      />
    );

    // test name field icon
    const nameField = screen
      .getByTestId('update--meeting--name')
      .querySelector('input');
    expect(nameField).toHaveProperty('disabled', true);
    clickEditIcon('update--meeting--icon--name');
    expect(nameField).toHaveProperty('disabled', false);

    // test date field icon
    const dateField = screen
      .getByTestId('update--meeting--date')
      .querySelector('input');
    expect(dateField).toHaveProperty('disabled', true);
    clickEditIcon('update--meeting--icon--date');
    expect(dateField).toHaveProperty('disabled', false);

    const timeField = screen
      .getByTestId('update--meeting--time')
      .querySelector('input');
    expect(timeField).toHaveProperty('disabled', true);
    clickEditIcon('update--meeting--icon--time');
    expect(timeField).toHaveProperty('disabled', false);

    const durationText = screen
      .getByTestId('update--meeting--duration')
      .querySelector('input');
    expect(durationText).toHaveProperty('disabled', true);
    clickEditIcon('update--meeting--icon--duration');
    expect(durationText).toHaveProperty('disabled', false);

    const eventText = screen
      .getByTestId('update--meeting--event')
      .querySelector('input');
    expect(eventText).toHaveProperty('disabled', true);
    clickEditIcon('update--meeting--icon--event');
    expect(eventText).toHaveProperty('disabled', false);
  });
});
