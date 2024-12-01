const alunoRep = require('../repositories/repositorioAluno');

class alunoCont{
    async index(request, response){
        const alunos = await alunoRep.findAll();
        response.json(alunos);
    }

    async show(request, response){
        const {id} = request.params;
        const aluno = await alunoRep.findById(id);
        if(!aluno){
            return response.status(404).json({error: "Aluno não encontrado!"})
        }
        response.status(200).json(aluno);
    }

    async store(request, response){
        const {nome_aluno, email_aluno, id_curso} = request.body;
        const novoAluno = await alunoRep.insert(nome_aluno, email_aluno, id_curso);
        response.status(200).json(novoAluno);
    }

    // Outras operações no BD
}

module.exports = new alunoCont();