import * as express from 'express';
import * as cors from 'cors';
import { Message } from '@zoom-conference-manager/api-interfaces';

const app = express();

app.use(cors());

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
