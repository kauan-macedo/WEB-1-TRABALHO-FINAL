const cursoRep = require('../repositories/repositorioCurso');

class cursoCont{
    async index(request, response){
        const cursos = await cursoRep.findAll();
        response
            .status(200)
            .render('listar_cursos', {cursos: cursos});
    }

    async show(request, response){
        const {id} = request.params;
        const [curso] = await cursoRep.findById(id);
        if(!curso){
            return response
                .status(404)
                .send(`<script>alert("Não foi encontrado nenhum curso com esse ID!");</script>
					<meta http-equiv="refresh" content="0; url='/cursos/'" />`);
        }

        const [tiposCursos] = await cursoRep.findTipos();
        const [turnosCursos] = await cursoRep.findTurnos();
        const [{tipo_curso, turno_curso}] = curso;

        response
            .status(200)
            .render('exibir_curso', {
                curso: curso,
                tipoCurso: tipo_curso,
                turnoCurso: turno_curso,
                tipos: tiposCursos,
                turnos: turnosCursos
            });
    }

    async store(request, response){
        try {
            const {nome, cargaHoraria, tipo, turno} = request.body;
            const {insertId} = await cursoRep.create(nome, cargaHoraria, tipo, turno);
            // const [novoCurso] = await cursoRep.findById(insertId);
            response
                .status(200)
                .send(`<script>alert("Curso adicionado com sucesso!");</script>
					<meta http-equiv="refresh" content="0; url='/cursos/'" />`);
        } catch (error){
            console.log(error);
            response
                .send(`<script>alert("Houve algum erro durante a transação. Redirecionando para '/cursos/'");</script>
                    <meta http-equiv="refresh" content="0; url='/cursos/'" />`)
        }
        
    }

    async update(request, response){
        const {id} = request.params;
        
        const [busca] = await cursoRep.findById(id);
        if(!busca){
            return response
                .status(404)
                .send(`<script>alert("Não foi encontrado nenhum curso com esse ID!");</script>
						<meta http-equiv="refresh" content="0; url='/cursos/'" />`);
        }

        const {nome_curso, carga_horaria, curso_tipo, curso_turno} = request.body;
        const {changedRows} = await cursoRep.update(id, nome_curso, carga_horaria, curso_tipo, curso_turno);
        if(!changedRows){
            return response
                .status(200)
                .send(`<script>alert("Nenhuma alteração foi feita!");</script>
						<meta http-equiv="refresh" content="0; url='/cursos/${id}'" />`);
        }
        const [curso] = await cursoRep.findById(id);
        response
            .status(200)
            .send(`<script>alert("Curso alterado com sucesso!");</script>
				<meta http-equiv="refresh" content="0; url='/cursos/${id}'" />`)
    }

    async delete(request, response){
        try {
            const {id} = request.params;
            const [curso] = await cursoRep.findById(id);
            if(!curso){
                return response
                    .status(404)
                    .send(`<script>alert("Não foi encontrado nenhum curso com esse ID!");</script>
				<meta http-equiv="refresh" content="0; url='/cursos/'" />`)
            }
            const {nome_curso} = curso;
            await cursoRep.deleteAlunosByCourse(id);
            await cursoRep.delete(id);
            response
                .status(200)
                .send(`<script>alert("Curso '${nome_curso}' e todos os seus alunos deletado com sucesso!");</script>
						<meta http-equiv="refresh" content="0; url='/cursos/'" />`);
        } catch (error) {
            console.error(error);
			response
                .status(500)
                .send(`<script>alert("Erro ao deletar o curso!");</script>
						<meta http-equiv="refresh" content="0; url='/cursos/${id}'" />`);
        }
    }

    async newCurso(request, response){
        const tiposCursos = await cursoRep.findTipos();
        const turnosCursos = await cursoRep.findTurnos();
        response
            .status(200)
            .render('criar_cursos', {tipos: tiposCursos, turnos: turnosCursos});
    }  

}

module.exports = new cursoCont();