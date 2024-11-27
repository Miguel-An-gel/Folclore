const express = require('express');
const cors = require('cors');
const path = require('path');



const app = express();
// Configura arquivos estáticos no diretório "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));

// Configuração do middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Habilita parsing JSON

// Conexão com o banco de dados
const mysql = require('mysql2');

const db = mysql.createConnection({
  /*host: 'localhost',
  user: 'root',
  password: 'individual1',
  database: 'dancacomcores'*/
  host: 'localhost',
  user: 'danca',
  password: 'stepup',
  database: 'dancacomcores'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

// Rota para cadastrar usuários
app.post('/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
  }

  const query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
  db.query(query, [nome, email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err.message);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  });
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
  
    const sql = 'SELECT idusuario, nome, email FROM usuario WHERE email = ? AND senha = ?';
    db.query(sql, [email, senha], (err, results) => {
      if (err) {
        console.error('Erro na consulta:', err.message);
        return res.status(500).send('Erro interno do servidor');
      }
  
      if (results.length > 0) {
        // Usuário encontrado
        res.json(results[0]);
      } else {
        // Usuário não encontrado
        res.status(401).send('Credenciais inválidas');
      }
    });
  });

// Inicia o servidor
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`
╔═══╗ ♪   ╔═══╗ ♪   ╔═══╗ ♪   ╔═══╗ ♪
║███║ ♫   ║███║ ♫   ║███║ ♫   ║███║ ♫
║ (●) ♫   ║ (●) ♫   ║ (●) ♫   ║ (●) ♫
╚═══╝♪♪   ╚═══╝♪♪   ╚═══╝♪♪   ╚═══╝♪♪ 
         
        ░░░░░░░░░░░░░░░░░░░░
        ░█▀▀ ░█▀█ ░█ ░█▀▀ ░░
        ░█▀▀ ░█▀▀ ░█ ░█ ░░░░
        ░▀▀▀ ░▀ ░░░▀ ░▀▀▀ ░░
        ░░░░░░░░░░░░░░░░░░░░
    
    `)
});
