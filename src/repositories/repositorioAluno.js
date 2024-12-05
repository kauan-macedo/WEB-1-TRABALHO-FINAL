const db = require('../models/dbConnect');

class repositorioAluno{
    async findAll(){
        const row = await db.qry(
            `SELECT alunos.id_aluno,
                alunos.nome_aluno,
                alunos.email_aluno,
                alunos.tel_aluno,
                alunos.estado_matricula,
                cursos.nome_curso,
                cursos.carga_horaria,
                cursos.curso_tipo,
                cursos.curso_turno
            FROM alunos
            JOIN cursos ON alunos.id_curso = cursos.id_curso
            WHERE alunos.vis = 1 AND cursos.vis = 1;
            `
        )
        return row;
    }

    async findById(id){
        const row = await db.qry(
            `SELECT * FROM alunos
                JOIN cursos ON alunos.id_curso = cursos.id_curso
                WHERE alunos.id_aluno = ? AND alunos.vis = 1;
            `,
            [id]
        )
        return row;
    }

    async create(nome, email, telefone, idCurso){
        const row = await db.qry(
            `INSERT INTO alunos (nome_aluno, email_aluno, tel_aluno, vis, id_curso, estado_matricula)
            VALUES (?, ?, ?, 1, ?, 'Ativa');
            `,
            [nome, email, telefone, idCurso] 
        );
        return row;
    }

    async update(id, nome, email, telefone, idCurso, matricula){
        const row = await db.qry(
            `UPDATE alunos SET
                nome_aluno = ?,
                email_aluno = ?,
                tel_aluno = ?,
                id_curso = ?,
                estado_matricula = ?
            WHERE id_aluno = ? AND vis = 1;
            `,
            [nome, email, telefone, idCurso, matricula, id]
        ); 
        return row;
    }

    async delete(id){
        const row = await db.qry(
            `UPDATE alunos SET
                vis = 0 
            WHERE id_aluno = ? AND vis = 1;
            `,
            [id]
        );
        return row;
        
    }
}

module.exports = new repositorioAluno();