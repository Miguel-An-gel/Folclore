const mysql = require('mysql2');

// Configuração da conexão
const connection = mysql.createConnection({
  //host: 'localhost',        // Endereço do servidor MySQL
  //user: 'root',      // Nome de usuário do MySQL
 // password: 'individual1',    // Senha do MySQL
 // database: 'dancacomcores'     // Nome do banco de dados
 
  host: 'localhost',
  user: 'danca',
  password: 'stepup',
  database: 'dancacomcores'

});

// Teste de conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    return;
  }
  console.log('Conexão bem-sucedida ao MySQL!');
});

module.exports = connection;
