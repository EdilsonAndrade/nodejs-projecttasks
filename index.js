const express = require('express');
const server = express();

server.use(express.json());

let requisicoes =0;

server.use((req,res, next)=>{
  requisicoes++;
  console.log(`Total de requisiçoes ${requisicoes}`);
  next();
});

const projects = [
  {
    "id": "3",
    "title": "AMAZON",
    "tasks": []
  },
  {
    "id": "5",
    "title": "Freeletics",
    "tasks": []
  },
  {
    "id": "4",
    "title": "btfit",
    "tasks": []
  }
];

function chekcIfProjectExist(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id === id);
  if (!project) {
    return res.status(404).json('Project not found!');
  }
  return next();
}

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', chekcIfProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let project = projects.find(p => p.id === id);
  project.title = title;

  return res.json(projects);
});

server.delete('/projects/:id', chekcIfProjectExist, (req, res) => {
  const { id } = req.params;
  let index = projects.findIndex(p => p.id === id);

  projects.splice(index, 1);

  return res.json(projects);
});

server.post('/projects/:id/tasks',chekcIfProjectExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let project = projects.find(p => p.id === id);
  project.tasks.push(title);
  return res.json(projects);
});


server.listen(3000);

