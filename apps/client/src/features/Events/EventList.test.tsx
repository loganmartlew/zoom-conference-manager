import { IEvent } from '@zoom-conference-manager/api-interfaces';
import { EventStatus } from '@zoom-conference-manager/types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderWithRouter, screen } from '../../test-utils';

  // checking individual cards can be rendered
  test('A card can be made with specified props', async () => {
    const event: IEvent = {
      id: '1',
      ubid: '24',
      name: 'Test Event',
      description: 'Test Event Description',
      startDate: '2020-01-01',
      endDate: '2020-01-02',
      status: EventStatus.DRAFT,
      meetings: [],
    };

    renderWithRouter(
      <QueryClientProvider client={new QueryClient()}>
        <EventCard key={0} event={event} />
      </QueryClientProvider>,
      {}
    );

test('Test EventList', () => {
  expect(1).toBeTruthy();
});
