const db = require('../models/dbConnect');

class repositorioAluno{
    async findAll(){
        const row = await db.qry(
            `SELECT alunos.id_aluno,
                alunos.nome_aluno,
                alunos.email_aluno,
                alunos.matricula,
                cursos.nome_curso,
                cursos.carga_horaria,
                cursos.turno,
                cursos.tipo
            FROM alunos
            JOIN cursos ON alunos.id_curso = cursos.id_curso`
        )
        return row;
    }

    async findById(id){
        const row = await db.qry(
            `SELECT * FROM alunos
                JOIN cursos ON alunos.id_curso = cursos.id_curso
                WHERE alunos.id_aluno = ?;
            `,
            [id]
        )
        return row;
    }

    async create(nome, email, idCurso){
        const row = await db.qry(
            `INSERT INTO alunos (nome_aluno, email_aluno, id_curso, matricula)
            VALUES (?, ?, ?, 'Ativa');
            `,
            [nome, email, idCurso] 
        );
        return row;
    }

    async update(id, nome, email, curso, matricula){
        const row = await db.qry(
            `UPDATE alunos SET
                nome_aluno = ?,
                email_aluno = ?,
                id_curso = ?,
                matricula = ?
            WHERE id_aluno = ?;
            `,
            [nome, email, curso, matricula, id]
        ); 
        return row;
    }

    async delete(id){
        const row = await db.qry(
            `DELETE FROM alunos
            WHERE id_aluno = ?;
            `,
            [id]
        );
        return row;
        
    }
}

module.exports = new repositorioAluno();