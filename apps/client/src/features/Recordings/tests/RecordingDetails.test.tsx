import { renderWithRouter, screen } from '../../../test-utils';
import RecordingsDetails from '../RecordingsDetails';

describe('Test RecordingDetails', () => {
  test('Card can be rendered', async () => {
    renderWithRouter(
      <RecordingsDetails
        event={{
          id: '0',
          name: 'test',
          description: 'test desc',
          startDate: '2022-08-09',
          endDate: '2022-08-10',
          meetings: [],
        }}
        isLoading={false}
      />,
      {}
    );

    const detailName = screen.getByText(/test/i);
    const detailDesc = screen.getByText(/test desc/i);
    const detailStartDate = screen.getByText(/2022-08-09/i);
    const detailEndDate = screen.getByText(/2022-08-10/i);
    const meetingsFail = screen.getByText(/No events found/i);

    expect(detailName).toBeTruthy();
    expect(detailDesc).toBeTruthy();
    expect(detailStartDate).toBeTruthy();
    expect(detailEndDate).toBeTruthy();
    expect(meetingsFail).toBeTruthy();
  });
});
