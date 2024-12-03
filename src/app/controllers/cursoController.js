const cursoRep = require('../repositories/repositorioCurso');

class cursoCont{
    async index(request, response){
        const cursos = await cursoRep.findAll();
        response.json(cursos);
    }

    async show(request, response){
        const {id} = request.params;
        const [curso] = await cursoRep.findById(id);
        if(!curso){
            return response.status(404).json({error: "Curso não encontrado!"})
        }
        response.status(200).json(curso);
    }

    async store(request, response){
        const {nome_curso, carga_horaria, turno, tipo} = request.body;
        
        const {insertId} = await cursoRep.create(nome_curso, carga_horaria, turno, tipo);
        const novoCurso = await cursoRep.findById(insertId);
        response.status(200).json(novoCurso);
    }

    async update(request, response){
        const {id} = request.params;

        const [busca] = await cursoRep.findById(id);
        if(!busca){
            return response.status(404).json({error: "Curso não encontrado!"})
        }

        const {nome_curso, carga_horaria, turno, tipo} = request.body;
        const {changedRows} = await cursoRep.update(id, nome_curso, carga_horaria, turno, tipo);
        if(!changedRows){
            return response.status(200).json({response: "Nenhuma alteração feita."})
        }
        const curso = await cursoRep.findById(id);
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