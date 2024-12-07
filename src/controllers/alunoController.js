const alunoRep = require('../repositories/repositorioAluno');
const cursoRep = require('../repositories/repositorioCurso');

class alunoCont{
    async index(request, response){
        const alunos = await alunoRep.findAll();
        response
            .status(200)
            .render('listar_alunos', {alunos: alunos});
    }

    async show(request, response){
        const {id} = request.params;
        const [aluno] = await alunoRep.findById(id);
        const { id_curso } = aluno;
        const [{nome_curso}] = await cursoRep.findById(id_curso);
        const cursos = await cursoRep.findAll();
        const matriculas = await cursoRep.findMatriculas();

        if(!aluno){
            return response.status(404).json({error: "Aluno não encontrado!"}) // <<< 404 
        }
        response
            .status(200)
            .render('exibir_aluno', {aluno: aluno, cursoAluno: nome_curso, cursos: cursos, matriculas: matriculas});
    }

    async store(request, response){
        const { nome, email, tel, curso } = request.body;
        const { insertId } = await alunoRep.create(nome, email, tel, curso);
        const [novoAluno] = await alunoRep.findById(insertId);
        response
            .status(200)
            .redirect("/alunos/" + insertId);
    }

    async update(request, response){
        const {id} = request.params;

        const [busca] = await alunoRep.findById(id);
        if(!busca){
            return response.status(404).json({error: "Aluno não encontrado!"})
        }
        const {nome, email, tel, curso, status} = request.body;
        // Buscar no BD os id's dos cursos e estados de matrícula disponíveis para cadastro e comparar com o fornecido.
        // Formatar nome, e-mail e telefone para inserir no create()
        const {changedRows} = await alunoRep.update(id, nome, email, tel, curso, status);
        if(!changedRows){
            return response.status(200).json({response: "Nenhuma alteração feita."})
        }
        const [aluno] = await alunoRep.findById(id);
        response
            .status(200)
            .redirect("/alunos/" + id);
    }

    async delete(request, response){
        const {id} = request.params;
        const [busca] = await alunoRep.findById(id);
        if(!busca){
            return response.status(404).json({error: "Aluno não encontrado!"})
        }
        const {nome_aluno} = busca;
        const ret  = await alunoRep.delete(id);
        response.status(200).json({response: `Aluno(a) '${nome_aluno}' deletado(a) com sucesso!`});
        
    }

    async newAluno(request, response){
        const cursos = await cursoRep.findAll();
        response
            .status(200)
            .render('criar_alunos', {cursos: cursos});
    }

}

module.exports = new alunoCont();