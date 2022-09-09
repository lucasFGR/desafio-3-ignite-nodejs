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

  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const repositoryUpdate = {
    ...repositories[repositoryIndex],
    ...updatedRepository,
  };

  return response.json(repositoryUpdate);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repostiriFound = repositories.find(
    (repository) => repository.id === id
  );

  if (!repostiriFound) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repostiriFound, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositori = repositories.find((repository) => repository.id === id);

  if (!repositori) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const newQtdLikes = (repositori.likes += 1);

  const repositoriUpdate = repositories[repositoryIndex].likes;
  return response.json(repositoriUpdate);
});

module.exports = app;
