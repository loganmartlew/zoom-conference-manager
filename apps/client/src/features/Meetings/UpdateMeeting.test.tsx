import { MeetingDTO } from '@zoom-conference-manager/api-interfaces';
/* eslint-disable react/jsx-boolean-value */
import { render, screen, fireEvent } from '@testing-library/react';
import { MeetingData } from './MeetingTypes/UpdateMeetingTypes';
import UpdateMeeting from './UpdateMeeting';

/**
 * This function creates a mock of meeting data
 * to fetch.
 * @returns
 */
const getMockMeetingData = (): MeetingData => {
  const meeting: MeetingData = {
    id: 'mockid',
    name: 'test name',
    startDateTime: '19/08/2022 1602',
    endDateTime: '2',
  };
  return meeting;
};

/**
 * This function creates a mock update meeting
 * note this isn't a functional piece of code
 * it is mainly used to act as the prop
 * to allow for editing of the code.
 * @param id placerholder id
 * @param meetingData placeholder meeting data
 * @returns
 */
const mockUpdateFunction = (
  id: string,
  meetingData: MeetingData
): Promise<MeetingDTO> => {
  const meeting: MeetingDTO = {
    eventId: id,
    name: meetingData.name,
    startDateTime: meetingData.startDateTime,
    endDateTime: '3',
  };
  return Promise.resolve(meeting);
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

/**
 * Note this method assumes the fields are initialised as disabled.
 * Tests a fields disabled property before the edit icon has been clicked,
 * is set to true i.e. disabled = true... then proceeds clicks the edit icon,
 * and checks that the disabled property is now set to false i.e. disabled = false.
 * @param testIdField
 * @param testIdIcon
 */
const testIconClick = (testIdField: string, testIdIcon: string): void => {
  const field = screen.getByTestId(testIdField).querySelector('input');
  expect(field).toHaveProperty('disabled', true);
  clickEditIcon(testIdIcon);
  expect(field).toHaveProperty('disabled', false);
};

describe('UpdateMeeting testing', () => {
  test('Check that all fields are rendered', () => {
    render(
      <UpdateMeeting
        updateMeetingData={mockUpdateFunction}
        meetingData={getMockMeetingData()}
        meetingId='1'
        editOnRender={true}
      />
    );

    // test name field
    const nameField = screen
      .getByTestId('update--meeting--name')
      .querySelector('input')?.value;
    expect(nameField).toBe('test name');

    // test date field
    const dateField = screen
      .getByTestId('update--meeting--date')
      .querySelector('input')?.value;
    expect(dateField).toBe('19/08/2022');

    // test time field
    const timeField = screen
      .getByTestId('update--meeting--startTime')
      .querySelector('input')?.value;
    expect(timeField).toBe('1602');

    // test duration field
    const durationField = screen
      .getByTestId('update--meeting--endDateTime')
      .querySelector('input')?.value;
    expect(durationField).toBe('2');
  });

  test('Checks that the fields can be edited', () => {
    render(
      <UpdateMeeting
        updateMeetingData={mockUpdateFunction}
        meetingData={getMockMeetingData()}
        meetingId='1'
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
      'update--meeting--textfield--startTime',
      'update--meeting--startTime',
      '0000',
      'Start time field is undefined'
    );
    expect(timeText).toBe('0000');

    // test the duration field
    const durationText = changeTextFieldValue(
      'update--meeting--textfield--endTime',
      'update--meeting--endTime',
      '3',
      'End time field is undefined'
    );
    expect(durationText).toBe('3');
  });

  test('Checks that when the edit icon is clicked changes the relative field from disabled to enabled', () => {
    // note that the editing of fields is initially set to false hence nothing
    // can be edited until the edit icons are clicked.
    render(
      <UpdateMeeting
        updateMeetingData={mockUpdateFunction}
        meetingData={getMockMeetingData()}
        meetingId='1'
        editOnRender={false}
      />
    );

    // test name field icon
    testIconClick('update--meeting--name', 'update--meeting--icon--name');

    // test date field icon
    testIconClick('update--meeting--date', 'update--meeting--icon--date');

    // test time field icon
    testIconClick(
      'update--meeting--startTime',
      'update--meeting--icon--startTime'
    );

    // test duration field icon
    testIconClick('update--meeting--endTime', 'update--meeting--icon--endTime');
  });
});
