const db = require('../models/dbConnect');

class repositorioCurso{
    async findAll(){
        const row = await db.qry(
            `SELECT * FROM cursos`
        )
        return row;
    }

    async findById(id){
        const row = await db.qry(
            `SELECT * FROM cursos WHERE cursos.id_curso = ?;
            `,
            [id]
        )
        return row;
    }

    async create(nome, cargaHoraria, turno, tipo){
        const row = await db.qry(
            `INSERT INTO cursos (nome_curso, carga_horaria, turno, tipo)
            VALUES (?, ?, ?, ?);
            `,
            [nome, cargaHoraria, turno, tipo] 
        );
        return row;
    }

    async update(id, nome, cargaHoraria, turno, tipo){
        const row = await db.qry(
            `UPDATE cursos SET
                nome_curso = ?,
                carga_horaria = ?,
                turno = ?,
                tipo = ?
            WHERE id_curso = ?;
            `,
            [nome, cargaHoraria, turno, tipo, id]
        ); 
        return row;
    }

    async delete(id){
        const row = await db.qry(
            `DELETE FROM cursos
            WHERE id_curso = ?;
            `,
            [id]
        );
        return row;
        
    }
}

module.exports = new repositorioCurso();