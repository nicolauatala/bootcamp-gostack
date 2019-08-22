const express = require('express');
const server = express();

server.use(express.json());

let projects = [];
let requests = 0;

// MIDDLEWARES
server.use((req, res, next) => {
  requests++;
  console.log('Requests count', requests);
  next();
});

function checkProjectExiste(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

server.get('/', (req, res) => {
  return res.send('desafio-01');
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push({
    id,
    title,
    tasks: []
  });
  return res.json(projects);
});

server.put('/projects/:id', checkProjectExiste, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(projects);
});

server.delete('/projects/:id', checkProjectExiste, (req, res) => {
  const { id } = req.params;
  // projects = projects.filter(project => {
  //   return project.id !== id;
  // });
  const projectIndex = projects.findIndex(p => p.id == id);
  projects.splice(projectIndex, 1);

  return res.send();
});

// TASKS
server.post('/projects/:id/tasks', checkProjectExiste, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
