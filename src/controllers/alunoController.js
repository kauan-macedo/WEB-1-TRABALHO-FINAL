const alunoRep = require('../repositories/repositorioAluno');
const cursoRep = require('../repositories/repositorioCurso');

class alunoCont {
	async index(request, response) {
		const alunos = await alunoRep.findAll();
		response.status(200).render('listar_alunos', { alunos: alunos });
	}

	async show(request, response) {
		const { id } = request.params;
		const [aluno] = await alunoRep.findById(id);
		if (!aluno) {
			return response.status(404)
				.send(`<script>alert("Não foi encontrado nenhum aluno com esse ID!");</script>
					<meta http-equiv="refresh" content="0; url='/alunos/'" />`);
		}

		const { id_curso } = aluno;
		const [{ nome_curso }] = await cursoRep.findById(id_curso);
		const cursos = await cursoRep.findAll();
		const matriculas = await cursoRep.findMatriculas();

		response.status(200).render('exibir_aluno', {
			aluno: aluno,
			cursoAluno: nome_curso,
			cursos: cursos,
			matriculas: matriculas,
		});
	}

	async store(request, response) {
		try {
			const { nome, email, tel, curso } = request.body;
			const { insertId } = await alunoRep.create(nome, email, tel, curso);
			// const [novoAluno] = await alunoRep.findById(insertId);
			// const alunos = await alunoRep.findAll();
			response.status(200).send(`<script>alert("Aluno(a) adicionado(a) com sucesso!");</script>
						<meta http-equiv="refresh" content="0; url='/alunos/'" />`);
		} catch (error) {
			const { code } = error;
			if (code == 'ER_DUP_ENTRY') {
				response.status(422)
					.send(`<script>alert("Já existe um(a) aluno(a) com esse e-mail!");</script>
						<meta http-equiv="refresh" content="0; url='/alunos/novo'" />`);
			}
		}
	}

	async update(request, response) {
		try {
			const { id } = request.params;

			const [busca] = await alunoRep.findById(id);
			if (!busca) {
				return response.status(404)
					.send(`<script>alert("Não foi encontrado nenhum aluno com esse ID!");</script>
						<meta http-equiv="refresh" content="0; url='/alunos/'" />`);
			}
			const { nome, email, tel, curso, status } = request.body;
			const { changedRows } = await alunoRep.update(id, nome, email, tel, curso, status);
			if (!changedRows) {
				return response.status(200)
					.send(`<script>alert("Nenhuma alteração foi feita!");</script>
					<meta http-equiv="refresh" content="0; url='/alunos/${id}'" />`);
			}

			const [aluno] = await alunoRep.findById(id);
			response.status(200).send(`<script>alert("Aluno(a) alterado(a) com sucesso!");</script>
				<meta http-equiv="refresh" content="0; url='/alunos/${id}'" />`);
		} catch (error) {}
	}

	async delete(request, response) {
		try {
			const { id } = request.params;
			const [aluno] = await alunoRep.findById(id);

			if (!aluno) {
				return response.status(404)
					.send(`<script>alert("Não foi encontrado nenhum aluno com esse ID!");</script>
						<meta http-equiv="refresh" content="0; url='/alunos/novo'" />`);
			}

			const { nome_aluno } = aluno;
			await alunoRep.delete(id);
			response.status(200)
				.send(`<script>alert("Aluno(a) '${nome_aluno}' deletado(a) com sucesso!");</script>
						<meta http-equiv="refresh" content="0; url='/alunos/'" />`);
		} catch (error) {
			console.error(error);
			response.status(500).send(`<script>alert("Erro ao deletar o(a) aluno(a)!");</script>
						<meta http-equiv="refresh" content="0; url='/alunos/${id}'" />`);
		}
	}

	async newAluno(request, response) {
		const cursos = await cursoRep.findAll();
		response.status(200).render('criar_alunos', { cursos: cursos });
	}
}

module.exports = new alunoCont();
