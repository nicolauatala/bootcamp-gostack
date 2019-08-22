const express = require('express');

const server = express();
server.use(express.json());

// Query params = ?teste=1
// Route params = /users/1
// Request body = { name: 'Nicolau Atala' }

// CRUD (Creat, Red, Update, Delete)

const users = ['Nicolau', 'André', 'Mikael'];

// Middlewares
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}: URL ${req.url}`);
  next();
  console.timeEnd('Request');
});

function checkUsersExiste(req, res, next) {
  if (!req.params.name) {
    return res.status(400).json({ error: 'User name is required!' });
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: 'User does not exist!' });
  }

  req.user = user;
  return next();
}
// Fim Middleware

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post('/users', checkUsersExiste, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put('/users/:index', checkUserInArray, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;
  users[index] = name;
  return res.json(users);
});

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send();
});

server.listen(3000);
