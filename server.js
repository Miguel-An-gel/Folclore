const express = require('express');
const cors = require('cors');
const path = require('path');



const app = express();
// Configura arquivos estáticos no diretório "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));

// Servir arquivos estáticos (HTML, CSS, JS)



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



// Rota para salvar a dança escolhida
app.post('/salvarDanca', (req, res) => {
    const { nomedanca, fkusuario } = req.body;

    const sql = 'INSERT INTO minhadanca (nomedanca, fkusuario) VALUES (?, ?)';
    db.query(sql, [nomedanca, fkusuario], (err, result) => {
        if (err) {
            console.error('Erro ao salvar a dança:', err);
            res.status(500).send('Erro ao salvar a dança');
        } else {
            res.send('Dança salva com sucesso!');
        }
    });
});



// Rota para salvar a dança escolhida
app.post('/salvarDanca', (req, res) => {
    const { nomedanca, fkusuario } = req.body;

    const sql = 'INSERT INTO minhadanca (nomedanca, fkusuario) VALUES (?, ?)';
    db.query(sql, [nomedanca, fkusuario], (err, result) => {
        if (err) {
            console.error('Erro ao salvar a dança:', err);
            res.status(500).send('Erro ao salvar a dança');
        } else {
            res.send('Dança salva com sucesso!');
        }
    });
});


// Rota para buscar as danças associadas a um usuário
app.get('/minhasDancas/:idusuario', (req, res) => {
    const { idusuario } = req.params;

    const sql = `
        SELECT minhadanca.nomedanca
        FROM minhadanca
        WHERE minhadanca.fkusuario = ?`;

    db.query(sql, [idusuario], (err, results) => {
        if (err) {
            console.error('Erro ao buscar danças:', err);
            res.status(500).send('Erro ao buscar danças');
        } else {
            res.json(results);
        }
    });
});

/**
 * 
 * abaixo jogo forca
 * 
 */



// Rota para salvar os dados do jogo
app.post('/salvar-jogo', (req, res) => {
    const { tentativas, erros, tempojogo, fkusuario } = req.body;

    const sql = 'INSERT INTO jogo (tentativas, erros, tempojogo, fkusuario) VALUES (?, ?, ?, ?)';
    db.query(sql, [tentativas, erros, tempojogo, fkusuario], (err, result) => {
        if (err) {
            console.error('Erro ao salvar dados do jogo:', err);
            res.status(500).send('Erro ao salvar dados do jogo');
        } else {
            res.send('Dados do jogo salvos com sucesso!');
        }
    });
});




// quizz

// Endpoint para salvar os dados do quiz
app.post("/api/quiz", (req, res) => {
    const { correct, incorrect, mostCorrect, mostIncorrect, responseTimes, fkUsuario } = req.body;

    const query = `
        INSERT INTO quiz (respostas_certas, respostas_erradas, pergunta_mais_certa, pergunta_mais_errada, tempos_resposta, fk_usuario)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [correct, incorrect, mostCorrect, mostIncorrect, JSON.stringify(responseTimes), fkUsuario],
        (err) => {
            if (err) {
                console.error("Erro ao inserir no banco:", err);
                res.status(500).json({ message: "Erro ao salvar os dados." });
            } else {
                res.status(200).json({ message: "Dados salvos com sucesso!" });
            }
        }
    );
});


// Iniciar o servidor




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
