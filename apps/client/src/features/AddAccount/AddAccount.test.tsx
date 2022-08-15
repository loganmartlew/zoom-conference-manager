import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ReactDOM from 'react-DOM';
import { BrowserRouter as Router } from 'react-router-dom';
import Add from './AddAccount';

// test('renders react component', async () => {
//   render(
//     <Router>
//       <Add />
//     </Router>,
//   );

// describe("Add Account renders first name", () => {
it('renders default state', () => {
  const getByTestId = document.createElement('div');
  ReactDOM.render(<Add />, getByTestId);
  // ReactDOM.unmountComponentAtNode(getByTestId);
});
