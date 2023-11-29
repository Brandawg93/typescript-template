import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import { updateLastAccessed, getLastAccessed } from './database';

dotenv.config();

const app: Express = express();
const port = process.env.WEB_PORT || 8080;

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

app.get('/api/time', async (req: Request, res: Response) => {
  const lastAccessed = (await getLastAccessed()) || new Date();
  res.send(JSON.stringify({ time: new Date(), lastAccessed: new Date(lastAccessed) }));
  await updateLastAccessed();
});

app.listen(port, async () => {
  console.log(`⚡️[typescript-template]: Server is running at http://localhost:${port}`);
});
