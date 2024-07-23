const sql = require('mssql');
const config = require('./dbConfig');

const connectToDatabase = async () => {
  try {
    await sql.connect(config);
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
};

module.exports = connectToDatabase;
