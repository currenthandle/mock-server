// a basic express server that serves static files from the public folder
// connect to sqlite database with prisma

// import cors from 'cors';

const cors = require('cors');
const express = require('express');
const path = require('path');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/text', (req, res) => {
  res.send('something different');
});

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// post route for creating a new configuration with data passed from client
app.post('/api/configuration', async (req, res) => {
  console.log('req', req);
  const configuration = await prisma.configuration.create({
    data: {
      name: 'test',
      description: 'test',
      color: 'test',
    },
  });
  res.json(configuration);
});

// a get route for retrieving all configurations
app.get('/api/configurations', async (req, res) => {
  // const configurations = await prisma.configuration.findMany();
  res.json({
    name: 'casey',
  });
  // res.json(configurations);
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
