import { FC } from 'react';
import ReactDOM from 'react-dom';
import AddAccount from '../features/AddAccount/AddAccount';

import App from '../features/AddAccount/FileProcess';


const Add: FC = () => {
  return (
    <>
      <AddAccount />
      <App />
    </>
  );
};


ReactDOM.render(
  <App />,
  document.querySelector('#root')
)

export default Add;