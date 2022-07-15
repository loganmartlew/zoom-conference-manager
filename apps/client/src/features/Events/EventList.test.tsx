// import { BrowserRouter } from 'react-router-dom';
// import { QueryClientProvider, QueryClient } from 'react-query';
import { renderWithRouter, screen } from '../../test-utils';
// import EventList from './EventsList';
import EventCard from './EventCard';

// const MockEventList = () => {
//   const queryClient = new QueryClient();
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         <EventList />
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// };

describe('Test EventList', () => {
  // general test on cards in list
  // need to look into how to mock react query
  // test('Renders a card within the card list', async () => {
  //   render(<MockEventList />);
  //   const cardElements = await screen.findAllByText(/Test Event/i);
  //   expect(cardElements.length).toBeGreaterThan(0);
  // });

  // checking individual cards can be rendered
  test('A card can be made with specified props', async () => {
    renderWithRouter(
      <EventCard
        key={0}
        id='0'
        name='test'
        desc='epic'
        start='2022-05-18'
        end='2022-05-20'
      />,
      {}
    );

    const cardName = screen.getByText(/test/i);
    const cardDesc = screen.getByText(/epic/i);
    const startDt = screen.getByText(/2022-05-18/i);
    const endDt = screen.getByText(/2022-05-20/i);

    expect(cardName).toBeTruthy();
    expect(cardDesc).toBeTruthy();
    expect(startDt).toBeTruthy();
    expect(endDt).toBeTruthy();
  });
});
