// import dayjs from 'dayjs';
// import { renderWithRouter, screen } from '../../../test-utils';
// import RecordingsMeetingsCard from '../RecordingsMeetingsCard';

// describe('Test RecordingDetails', () => {
//   test('Card can be rendered', async () => {
//     renderWithRouter(
//       <RecordingsMeetingsCard
//         meeting={{
//           ubid: 'test',
//           name: 'testing',
//           startDateTime: dayjs('2022-08-09 12:30:00').toDate(),
//           duration: 30,
//         }}
//       />,
//       {}
//     );

//     const ubid = screen.getByText(/test/i);
//     const date = screen.getByText(/2022-08-09/i);
//     const time = screen.getByText(/12:30/i);
//     const endTime = screen.getByText(/13:00/i);
//     const getMeeting = screen.getByText(/Get Recording/i);

//     expect(ubid).toBeTruthy();
//     expect(date).toBeTruthy();
//     expect(time).toBeTruthy();
//     expect(endTime).toBeTruthy();
//     expect(getMeeting).toBeTruthy();
//   });
// });
