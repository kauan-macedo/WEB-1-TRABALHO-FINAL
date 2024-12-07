const { Router } = require("express");
const alunoCont = require('./controllers/alunoController');
const cursoCont = require('./controllers/cursoController');

const routes = Router();

routes.get(["/", "/index"], (req, res) => {
    res.render('index');
})

routes.get("/alunos", alunoCont.index);
routes.get("/cursos", cursoCont.index);

routes.get("/alunos/novo", alunoCont.newAluno);
routes.get("/cursos/novo", (req, res) => {
    res.render('criar_cursos')
});

routes.get("/alunos/:id", alunoCont.show);
routes.get("/cursos/:id", cursoCont.show);

routes.post("/alunos/novo", alunoCont.store);
routes.post("/update/alunos/:id", alunoCont.update);
routes.post("/delete/alunos/:id", alunoCont.delete);

routes.post("/cursos/novo", cursoCont.store);
routes.post("/update/cursos/:id", cursoCont.update);
routes.post("/delete/cursos/:id", cursoCont.delete);

module.exports = routes;