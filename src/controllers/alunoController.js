const alunoRep = require('../repositories/repositorioAluno');

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
        if(!aluno){
            return response.status(404).json({error: "Aluno não encontrado!"})
        }
        response
            .status(200)
            .render('editar_alunos', aluno);
    }

    async store(request, response){
        const {nome_aluno, email_aluno, tel_aluno, id_curso} = request.body;
        // Buscar no BD os id's dos cursos disponíveis para cadastro e comparar com o fornecido.
        // Formatar nome, e-mail e telefone para inserir no create()
        const {insertId} = await alunoRep.create(nome_aluno, email_aluno, tel_aluno, id_curso);
        const [novoAluno] = await alunoRep.findById(insertId);
        response.status(200).json(novoAluno);
    }

    async update(request, response){
        const {id} = request.params;

        const [busca] = await alunoRep.findById(id);
        if(!busca){
            return response.status(404).json({error: "Aluno não encontrado!"})
        }

        const {nome_aluno, email_aluno, tel_aluno, id_curso, estado_matricula} = request.body;
        // Buscar no BD os id's dos cursos e estados de matrícula disponíveis para cadastro e comparar com o fornecido.
        // Formatar nome, e-mail e telefone para inserir no create()

        const {changedRows} = await alunoRep.update(id, nome_aluno, email_aluno, tel_aluno, id_curso, estado_matricula);
        if(!changedRows){
            return response.status(200).json({response: "Nenhuma alteração feita."})
        }
        const [aluno] = await alunoRep.findById(id);
        response.status(200).json(aluno);
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

}

module.exports = new alunoCont();