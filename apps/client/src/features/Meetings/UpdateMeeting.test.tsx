/* eslint-disable react/jsx-boolean-value */
import { render, screen, fireEvent } from '@testing-library/react';
import { Meeting } from './MeetingTypes/UpdateMeetingTypes';
import UpdateMeeting from './UpdateMeeting';

const mockGetMeeting = (id: number) => {
  let state: Meeting;
  if (id === 1) {
    state = {
      name: 'Test 1',
      date: '23/06/22',
      time: '1400',
      duration: '1',
      event: 'hello',
    };
  } else {
    state = {
      name: 'Test 2',
      date: '24/06/22',
      time: '2400',
      duration: '2',
      event: 'world',
    };
  }
  return state;
};

describe('UpdateMeeting testing', () => {
  test('Checks that all fields are rendered when not editable', () => {
    render(
      <UpdateMeeting
        getMeeting={mockGetMeeting}
        meetingID={1}
        editOnRender={false}
      />
    );

    const name = screen
      .getByTestId('update--meeting--name')
      .querySelector('input')?.value;
    expect(name).toBe('Test 1');

    const date = screen
      .getByTestId('update--meeting--date')
      .querySelector('input')?.value;
    expect(date).toBe('23/06/22');

    const time = screen
      .getByTestId('update--meeting--time')
      .querySelector('input')?.value;
    expect(time).toBe('1400');

    const duration = screen
      .getByTestId('update--meeting--duration')
      .querySelector('input')?.value;
    expect(duration).toBe('1');

    const event = screen
      .getByTestId('update--meeting--event')
      .querySelector('input')?.value;
    expect(event).toBe('hello');
  });

  test('Checks that all fields are rendered when editable, and that they can be edited', () => {
    render(
      <UpdateMeeting
        getMeeting={mockGetMeeting}
        meetingID={1}
        editOnRender={true}
      />
    );

    // test the name field
    const nameInput = screen.getByTestId('update--meeting--textfield--name');
    if (!nameInput) {
      throw Error('name field is undefined');
    }
    fireEvent.change(nameInput, { target: { value: 'New Test' } });
    const nameText = screen
      .getByTestId('update--meeting--name')
      .querySelector('input')?.value;
    expect(nameText).toBe('New Test');

    // test the date field
    const dateInput = screen.getByTestId('update--meeting--textfield--date');
    if (!dateInput) {
      throw Error('date field is undefined');
    }
    fireEvent.change(dateInput, { target: { value: '15/07/22' } });
    const dateText = screen
      .getByTestId('update--meeting--date')
      .querySelector('input')?.value;
    expect(dateText).toBe('15/07/22');

    // test the time field
    const timeInput = screen.getByTestId('update--meeting--textfield--time');
    if (!timeInput) {
      throw Error('time field is undefined');
    }
    fireEvent.change(timeInput, { target: { value: '0000' } });
    const timeText = screen
      .getByTestId('update--meeting--time')
      .querySelector('input')?.value;
    expect(timeText).toBe('0000');

    // test the duration field
    const durationInput = screen.getByTestId(
      'update--meeting--textfield--duration'
    );
    if (!durationInput) {
      throw Error('duration field is undefined');
    }
    fireEvent.change(durationInput, { target: { value: '3' } });
    const durationText = screen
      .getByTestId('update--meeting--duration')
      .querySelector('input')?.value;
    expect(durationText).toBe('3');

    // test the event field
    const eventInput = screen.getByTestId('update--meeting--textfield--event');
    if (!eventInput) {
      throw Error('event field is undefined');
    }
    fireEvent.change(eventInput, { target: { value: 'Test Event!' } });
    const eventText = screen
      .getByTestId('update--meeting--event')
      .querySelector('input')?.value;
    expect(eventText).toBe('Test Event!');
  });
});
