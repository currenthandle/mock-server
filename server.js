// a basic express server that serves static files from the public folder
// connect to sqlite database with prisma

// import cors from 'cors';

const cors = require('cors');
const express = require('express');
const path = require('path');

// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

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

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
