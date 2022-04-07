import * as express from 'express';
import * as cors from 'cors';
import { Message } from '@zoom-conference-manager/api-interfaces';
import { environment } from './environments/environment';

const app = express();

app.use(cors());

const greeting: Message = { message: 'Welcome to api!' };

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.get('/api/mode', (req, res) => {
  res.send(environment.mode);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
