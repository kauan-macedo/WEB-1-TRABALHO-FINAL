const { Router } = require("express");
const alunoCont = require('./controllers/alunoController');

const routes = Router();

routes.get("/alunos", alunoCont.index);
routes.get("/alunos/:id", alunoCont.show);
// routes.put("/alunos/:id")
// routes.delete("alunos/:id")
// routes.get("/alunos/novo")
routes.post("/alunos/novo", alunoCont.store);

module.exports = routes;
