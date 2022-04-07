import { FC } from 'react';
import { environment } from '../environments/environment';

const App: FC = () => (
  <div>
    <h1>Zoom Conference Manager</h1>
    <p>Platform for managing large scale Zoom events.</p>
    <p>Environment: {environment.mode}</p>
  </div>
);

export default App;
