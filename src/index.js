const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  if (updatedRepository.title) {
    repositories[repositoryIndex].title = updatedRepository.title;
  }
  if (updatedRepository.techs) {
    repositories[repositoryIndex].techs = updatedRepository.techs;
  }
  if (updatedRepository.url) {
    repositories[repositoryIndex].url = updatedRepository.url;
  }

  return response.json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoriIndex > 0) {
    repositories.splice(repositoriIndex, 1);
    return response.status(204).send();
  } else {
    return response.status(404).json({ error: "Repository not found" });
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const newQtdLikes = (repositories[repositoryIndex].likes += 1);

  request.repositori = newQtdLikes;
  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
