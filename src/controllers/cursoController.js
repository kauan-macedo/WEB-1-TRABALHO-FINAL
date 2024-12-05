const cursoRep = require('../repositories/repositorioCurso');

class cursoCont{
    async index(request, response){
        const cursos = await cursoRep.findAll();
        response
            .status(200)
            .render('listar_cursos', cursos);
    }

    async show(request, response){
        const {id} = request.params;
        const [curso] = await cursoRep.findById(id);
        if(!curso){
            return response.status(404).json({error: "Curso não encontrado!"})
        }
        response
            .status(200)
            .render('editar_cursos', curso);
    }

    async store(request, response){
        const {nome_curso, carga_horaria, curso_tipo, curso_turno} = request.body;
        // Buscar no BD os tipos e turnos disponíveis para cadastro e comparar com o fornecido.
        // Formatar nome e carga horária para inserir no create()
        const {insertId} = await cursoRep.create(nome_curso, carga_horaria, curso_tipo, curso_turno);
        const [novoCurso] = await cursoRep.findById(insertId);
        response.status(200).json(novoCurso);
    }

    async update(request, response){
        const {id} = request.params;
        
        const [busca] = await cursoRep.findById(id);
        if(!busca){
            return response.status(404).json({error: "Curso não encontrado!"})
        }

        const {nome_curso, carga_horaria, curso_tipo, curso_turno} = request.body;
        // Burcar no BD os tipos e turnos disponíveis para cadastro e comparar com o fornecido.
        // Formatar nome e carga horária para inserir no create.
        
        const {changedRows} = await cursoRep.update(id, nome_curso, carga_horaria, curso_tipo, curso_turno);
        if(!changedRows){
            return response.status(200).json({response: "Nenhuma alteração feita."})
        }
        const [curso] = await cursoRep.findById(id);
        response.status(200).json(curso);
    }

    async delete(request, response){
        const {id} = request.params;
        const [busca] = await cursoRep.findById(id);
        if(!busca){
            return response.status(404).json({error: "Curso não encontrado!"})
        }
        const {nome_curso} = busca;
        const ret  = await cursoRep.delete(id);
        response.status(200).json({response: `Curso '${nome_curso}' deletado com sucesso!`});
        
    }

}

module.exports = new cursoCont();