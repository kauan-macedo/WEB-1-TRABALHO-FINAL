const db = require('../models/dbConnect');

class repositorioCurso{
    async findAll(){
        const row = await db.qry(
            `SELECT * FROM cursos
            WHERE cursos.vis = 1;`
        )
        return row;
    }

    async findById(id){
        const row = await db.qry(
            `SELECT * FROM cursos
            WHERE cursos.id_curso = ? AND cursos.vis = 1;
            `,
            [id]
        )
        return row;
    }

    async create(nome, cargaHoraria, tipo, turno){
        const row = await db.qry(
            `INSERT INTO cursos (nome_curso, carga_horaria, vis, curso_tipo, curso_turno)
            VALUES (?, ?, 1, ?, ?);
            `,
            [nome, cargaHoraria, tipo, turno] 
        );
        return row;
    }

    async update(id, nome, cargaHoraria, tipo, turno){
        const row = await db.qry(
            `UPDATE cursos SET
                nome_curso = ?,
                carga_horaria = ?,
                curso_tipo = ?,
                curso_turno = ?
            WHERE id_curso = ? AND vis = 1;
            `,
            [nome, cargaHoraria, tipo, turno, id]
        ); 
        return row;
    }

    async delete(id){
        const row = await db.qry(
            `UPDATE cursos SET
                vis = 0
            WHERE id_curso = ? AND vis = 1;
            `,
            [id]
        );
        return row;
        
    }

    async findMatriculas(){
        const row = await db.qry(
            `SELECT * FROM matriculas;
            `
        );
        return row;
    }
}

module.exports = new repositorioCurso();