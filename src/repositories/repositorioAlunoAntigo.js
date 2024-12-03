const db = require('../models/dbConnect');

class repositorioAluno{
    async findAll(){
        const registros = await db.qry(
            `SELECT * FROM alunos
            JOIN cursos ON alunos.id_aluno = cursos.id_curso`
        )
        return registros;
    }

    async findById(id){
        const [row] = await db.qry(
            `SELECT * FROM alunos
                JOIN cursos ON alunos.id_curso = cursos.id_curso
                WHERE alunos.id_aluno = ?;
            `,
            [id]
        )
        return row;
    }

    async insert(nome, email, idCurso){
        const rows = await db.qry(
            `INSERT INTO alunos (nome_aluno, email_aluno, id_curso, matricula)
            VALUES (?, ?, ?, 'Ativa');
            `,
            [nome, email, idCurso] 
        )
        const {insertId} = rows;
        const novoAluno = this.findById(insertId);
        return novoAluno;
        // const novoAluno = await this.findById(id);
        // return novoAluno;
    }
}

// Outras operações no BD

module.exports = new repositorioAluno();
