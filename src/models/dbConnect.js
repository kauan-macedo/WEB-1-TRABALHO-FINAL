const mysql = require('mysql2/promise');

const client = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'dbpasswd',
    database: 'alunos',
})

const testConnection = async () => {
    try {
        const connection = await client.getConnection();
        console.log('Successfully connected to MySQL server!'); 
        connection.release();
    } catch (error) {
        console.error(`Couldn't connect to MySQL server: ${error}`);
        throw error;
    }
};

exports.qry = async (_query, values) => {
    try {
        const [rows, fields] = await client.execute(_query, values);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

exports.testConnection = testConnection;