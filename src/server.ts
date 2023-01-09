import cors from 'cors';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';

const app = express();

/*
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const parent = __filename.split('/').slice(0, -2);
parent.push('public');
const pathToPublic = parent.join('/');
const __dirname = path.dirname(pathToPublic);
app.use(express.static(path.join(__dirname, 'public')));
*/

const prisma = new PrismaClient();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
  bodyParser.json()
);

// post route for creating a new configuration with data passed from client
app.post('/api/configuration', async (req, res) => {
  const configuration = await prisma.configuration.create({
    data: req.body,
  });
  res.json(configuration);
});

app.delete('/api/configurations', async (_req, res) => {
  const configurations = await prisma.configuration.deleteMany();
  res.json(configurations);
});

app.get('/api/configurations', async (_req, res) => {
  const configurations = await prisma.configuration.findMany();
  res.json(configurations);
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
