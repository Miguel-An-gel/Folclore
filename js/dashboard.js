
let idGlobalUsuario;

document.addEventListener('DOMContentLoaded', () => {
  // Recupera os dados do usuário do localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  // Verifica se o usuário está logado
  if (!usuario) {
      alert('Você precisa fazer login!');
      window.location.href = '/login.html';  // Redireciona para login caso não haja usuário no localStorage
      return;
  }

  // Preenche os campos com os dados do usuário
  document.getElementById('user_id').textContent = usuario.idusuario;
  document.getElementById('user-name').textContent = usuario.nome;
  document.getElementById('user-email').textContent = usuario.email;

  // ID do usuário
  var idDoUsuario = usuario.idusuario;

  idGlobalUsuario = usuario.idusuario; // deixando global






  // Buscar e exibir a dança escolhida ao carregar a página
  fetch(`/minhasDancas/${idDoUsuario}`)
  .then(response => response.json())
  .then(dancas => {
      const suadancaElem = document.getElementById('user-suadanca');
      if (dancas.length > 0) {
          suadancaElem.textContent = dancas.map(danca => danca.nomedanca).join(', ');
      } else {
          suadancaElem.textContent = 'Você não tem danças salvas.';
      }
  })
  .catch(error => {
      console.error('Erro ao carregar as danças:', error);
  });

  // Adiciona evento ao botão de salvar dança
  const salvarDancaBtn = document.getElementById('salvarDancaBtn');
  if (salvarDancaBtn) {
      salvarDancaBtn.addEventListener('click', function() {
          const dancaEscolhida = document.getElementById('dancaEscolhida').textContent;

          fetch('/salvarDanca', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nomedanca: dancaEscolhida, fkusuario: idDoUsuario })
          })
          .then(response => response.text())
          .then(data => {
              alert(data); // Mensagem de sucesso ou erro
              var botao = salvarDancaBtn
              botao.hidden = true
              // Atualiza a dança exibida no dashboard
              fetch(`/minhasDancas/${idDoUsuario}`)
              .then(response => response.json())
              .then(dancas => {
                  const suadancaElem = document.getElementById('user-suadanca');
                  if (dancas.length > 0) {
                      suadancaElem.textContent = dancas.map(danca => danca.nomedanca).join(', ');
                  } else {
                      suadancaElem.textContent = 'Você não tem danças salvas.';
                  }
              })
              .catch(error => {
                  console.error('Erro ao atualizar as danças:', error);
              });
          })
          .catch(error => {
              console.error('Erro ao salvar a dança:', error);
          });
      });
  }
});



function logout() {
  // Remove o usuário do localStorage
  localStorage.removeItem('usuario');
  
  // Redireciona o usuário para a página de login
  window.location.href = '/login.html';
}

// Função de logout
function logout() {
  
  localStorage.removeItem('usuario');  // Remove o usuário do localStorage
  window.location.href = '/login.html';  // Redireciona para a página de login
}



// Botao para atualiza/cadastrar á dança escolhida pelo usurio

document.addEventListener('DOMContentLoaded', function() {
  const salvarDancaBtn = document.getElementById('salvarDancaBtn');
  if (salvarDancaBtn) {
      salvarDancaBtn.addEventListener('click', function() {
          const dancaEscolhida = document.getElementById('dancaEscolhida').textContent;
          const fkusuario = Number(idDoUsuario); // Pegar id do usuário do JSON

          fetch('/salvarDanca', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nomedanca: dancaEscolhida, fkusuario: fkusuario })
          })
          .then(response => response.text())
          .then(data => {
              alert(data); // Mensagem de sucesso ou erro
             
          })
          .catch(error => {
              console.error('Erro ao salvar a dança:', error);
          });
      });
  } else {
      console.error('Elemento salvarDancaBtn não encontrado no DOM.');
  }
});
 /**
  * jogo da forca
  */


/**
 * 
 * Abaixo todas as perguntas do quiz
 * 
 */

var dancas = []
var perguntas = [`
<div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
    <h2>1. Qual dessas palavras descreve melhor sua personalidade?</h2>
<button class="perguntas" onclick="caporal()">Elegância</button>
<button class="perguntas"  onclick="tinku()">Energia</button>
<button class="perguntas"  onclick="morenada()">Tradição</button>
<button class="perguntas"  onclick="diablada()">Mistério</button>
    </div>
    </div>
</div>`,

    `
    <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">    
<h2>2. Qual estilo de roupa você prefere?</h2>
<button class="perguntas"  onclick="caporal()">Trajes com bordados e chapéu elegante</button>
<button class="perguntas"  onclick="tinku()">Roupas leves para movimentos intensos</button>
<button class="perguntas"  onclick="morenada()">Trajes tradicionais com ornamentos</button>
<button class="perguntas"  onclick="diablada()">Fantasias impressionantes com máscaras</button>
</div>
    </div>
</div>
`
    ,
    `<div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
<h2>3. Como você gosta de dançar?</h2>
<button class="perguntas"  onclick="caporal()">Movimentos graciosos e sincronizados</button>
<button class="perguntas"  onclick="tinku()">Dança vigorosa e cheia de saltos</button>
<button class="perguntas"  onclick="morenada()">Ritmo forte e passos intensos em grupo</button>
<button class="perguntas"  onclick="diablada()">Uma mistura de drama e teatralidade</button>
</div>
    </div>
</div>
`,
    `
    <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
<h2>4. Qual cenário combina mais com você?</h2>
<button class="perguntas"  onclick="caporal()">Um desfile cheio de pompa e ritmo marcante</button>
<button class="perguntas"  onclick="tinku()">Uma celebração cheia de força e energia em grupo</button>
<button class="perguntas"  onclick="morenada()">Uma festa tradicional com raízes comunitárias profundas</button>
<button class="perguntas"  onclick="diablada()">Uma apresentação teatral com história e fantasia</button>
</div>
    </div>
</div>
`,
    `<div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
    <h2>5. Que tipo de música te atrai mais?</h2>
<button class="perguntas"  onclick="caporal()">Ritmos marcados pelo som do sino</button>
<button class="perguntas"  onclick="tinku()">Batidas fortes de tambores</button>
<button class="perguntas"  onclick="morenada()">Música folclórica tradicional e vibrante</button>
<button class="perguntas"  onclick="diablada()">Sons que misturam drama e intensidade</button>
</div>
    </div>
</div>
`,
    `
    <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
<h2>6. Se você estivesse participando de um desfile, como seria sua postura?</h2>
<button  class="perguntas" onclick="caporal()">Orgulhoso(a) e elegante</button>
<button class="perguntas"  onclick="tinku()">Energético(a) e cheio(a) de vigor</button>
<button class="perguntas"  onclick="morenada()">Sereno(a) e em harmonia com o grupo</button>
<button  class="perguntas" onclick="diablada()">Misterioso(a) e teatral</button>
</div>
    </div>
</div>
`,
    `
    <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
<h2>7. Qual tipo de celebração cultural te atrai mais?</h2>
<button class="perguntas"  onclick="caporal()">Festas comunitárias com desfiles e danças coreografadas</button>
<button class="perguntas"  onclick="tinku()">Eventos ao ar livre com desafios físicos e competitivos</button>
<button class="perguntas"  onclick="morenada()">Festas tradicionais onde a música e a união familiar são o centro</button>
<button  class="perguntas" onclick="diablada()">Celebrações que misturam teatro e drama religioso</button>
</div>
    </div>
</div>
`,
    `   <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question"> 
<h2>8. Como você descreveria sua energia ao dançar?</h2>
<button class="perguntas"  onclick="caporal()">Moderada, mas com movimentos elegantes</button>
<button class="perguntas"  onclick="tinku()">Intensa e cheia de explosão</button>
<button  class="perguntas" onclick="morenada()">Constante, em harmonia com o grupo</button>
<button class="perguntas"  onclick="diablada()">Variável, dependendo do clima da apresentação</button>
</div>
    </div>
</div>
`,
    `
    <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
 <h2>9. Se você fosse escolher um acessório para sua roupa de dança, qual seria?</h2>
<button class="perguntas"  onclick="caporal()">Um chapéu decorado com detalhes brilhantes</button>
<button  class="perguntas" onclick="tinku()">Faixas e ornamentos leves</button>
<button class="perguntas"  onclick="morenada()">Máscaras ou detalhes tradicionais do folclore</button>
<button  class="perguntas" onclick="diablada()">Algo dramático, como uma capa ou asas</button>
</div>
    </div>
</div>
`,
    `
    <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
<h2>10. Qual destes ambientes você prefere para dançar?</h2>
    <button class="perguntas"  onclick="caporal()">Palcos ou ruas com muitas pessoas assistindo</button>
    <button class="perguntas"  onclick="tinku()">Áreas abertas, onde você pode se movimentar livremente</button>
    <button class="perguntas"  onclick="morenada()">Locais históricos ou culturais</button>
    <button class="perguntas"  onclick="diablada()">Teatros ou festas que envolvem uma narrativa</button>
</div>
    </div>
</div>
`
]
var contagemPerguntas = 0
var oMaisEscolhidoDanca = []

function iniciar() {
    contagemPerguntas=0
    questoes.innerHTML = perguntas[contagemPerguntas]
    contagemPerguntas++
}

function caporal() {
    if (contagemPerguntas < 10) {
        dancas.push("caporal")
        questoes.innerHTML = perguntas[contagemPerguntas]
        contagemPerguntas++
    }
    else {
        mostrar()
    }
}
function tinku() {
    if (contagemPerguntas < 10) {
        dancas.push("tinku")
        questoes.innerHTML = perguntas[contagemPerguntas]
        contagemPerguntas++
    } else {
        mostrar()
    }
}
function morenada() {
    if (contagemPerguntas < 10) {
        dancas.push("morenada")
        questoes.innerHTML = perguntas[contagemPerguntas]
        contagemPerguntas++
    } else {
        mostrar()
    }
}
function diablada() {
    if (contagemPerguntas < 10) {
        dancas.push("diablada")
        questoes.innerHTML = perguntas[contagemPerguntas]
        contagemPerguntas++
    } else {
        mostrar()
    }

}

function mostrar() {
var botao = salvarDancaBtn

    var dancaEscolhida = palavraQueMaisRepete(dancas)
    if (dancaEscolhida == "caporal") {
        questoes.innerHTML = `
    <div class="mainQuiz"> 
        <div id="quizForm" class="formQuiz">
            <h1>Qual dança combina mais com você?</h1>
            <div class="question"> 
                <h2>A dança que mais combina com você é : <span id="dancaEscolhida"><strong>Caporal</strong></span></h2> 
                <img class="imagemfocloreescolhido" src="assets/imagens/iconefolcloricos/iconCaporal.png" alt=""> 
                
            </div> 
        </div>
    </div>
    `
  botao.hidden = false
} else if (dancaEscolhida == "tinku") {
        questoes.innerHTML = `
     <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
        <h2> A dança que mais combina com voce é : <span id="dancaEscolhida"><strong>Tinkus</strong></span></h2> 
         <img class="imagemfocloreescolhido" src="assets/imagens/iconefolcloricos/iconTinkus.png" alt=""> 

</div>
    </div>
</div>
    `
    botao.hidden = false
} else if (dancaEscolhida == "morenada") {
        questoes.innerHTML = `
     <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
        <h2> A dança que mais combina com voce é : <span id="dancaEscolhida"><strong>Morenada</strong></span></h2> 
         <img class="imagemfocloreescolhido" src="assets/imagens/iconefolcloricos/iconMorenada.png" alt=""> 

</div>
    </div>
</div>
    `
    botao.hidden = false
} else if (dancaEscolhida == "diablada") {
        questoes.innerHTML = `
     <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
           <h2> A dança que mais combina com voce é : <span id="dancaEscolhida"><strong>Diablada</strong></span></h2> 
         <img class="imagemfocloreescolhido" src="assets/imagens/iconefolcloricos/iconDiablada.png" alt="">

</div>
    </div>
</div>
    `
    botao.hidden = false
}

}




function palavraQueMaisRepete(dancas) {
    const contarPalavras = []; // Objeto para contar as palavras
    let maisRepetidas = ""; // Palavra mais repetida
    let maiorContagem = 0; // Contagem máxima

    // Contar as palavras
    for (let i = 0; i < dancas.length; i++) {
        const palavra = dancas[i];
        if (contarPalavras[palavra]) {
            contarPalavras[palavra]++;
        } else {
            contarPalavras[palavra] = 1;
        }

        // Verificar se é a mais repetida
        if (contarPalavras[palavra] > maiorContagem) {
            maiorContagem = contarPalavras[palavra];
            maisRepetidas = palavra;
        }
    }

    return maisRepetidas
}

/**
 Jogo de perguntas e respostas
 */

  // Perguntas e respostas
  const questions = [
    {
        question: "Qual é a capital da Bolívia?",
        options: ["La Paz", "Quito", "Lima", "Buenos Aires"],
        correct: 0
    },
    {
        question: "Qual é a dança mais famosa do folclore boliviano?",
        options: ["Caporales", "Samba", "Flamenco", "Tango"],
        correct: 0
    },
    {
        question: "Qual é a moeda oficial da Bolívia?",
        options: ["Peso", "Dólar", "Boliviano", "Euro"],
        correct: 2
    }
];

// Armazena resultados
const results = [];

// Estado do jogo
let currentQuestionIndex = 0;
let startTime;

// Carrega a primeira pergunta
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = question.question;

    const buttons = document.querySelectorAll('.options button');
    question.options.forEach((option, index) => {
        buttons[index].innerText = option;
    });

    startTime = new Date().getTime(); // Marca o tempo de início
}

// Lida com a resposta do usuário
function selectAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];
    const endTime = new Date().getTime(); // Marca o tempo de término
    const timeTaken = (endTime - startTime) / 1000; // Tempo em segundos

    results.push({
        question: question.question,
        correctAnswer: question.options[question.correct],
        userAnswer: question.options[selectedIndex],
        isCorrect: selectedIndex === question.correct,
        timeTaken
    });

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Exibe os resultados
function saveToDatabase(data) {
    fetch("http://localhost:3010/salvar-resposta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                console.error("Erro ao salvar dados no banco.");
            }
        })
        .catch((error) => console.error("Erro na comunicação com o servidor:", error));
}

// Exibe os resultados e envia para o banco
function showResults() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Resultados:</h2>";

    results.forEach((result, index) => {
        resultsDiv.innerHTML += `
    <p><strong>Pergunta ${index + 1}:</strong> ${result.question}</p>
    <p><strong>Resposta Correta:</strong> ${result.correctAnswer}</p>
    <p><strong>Resposta Dada:</strong> ${result.userAnswer}</p>
    <p><strong>Tempo:</strong> ${result.timeTaken.toFixed(2)} segundos</p>
    <hr>
`;

        // Adicione o idUsuario ao objeto enviado
        saveToDatabase({
            pergunta: result.question,
            resposta_correta: result.correctAnswer,
            resposta_usuario: result.userAnswer,
            correta: result.isCorrect,
            tempo: result.timeTaken,
            fkusuario: idGlobalUsuario, // Aqui o idUsuario é enviado
        });
    });

    document.getElementById("quiz-container").style.display = "none";
}

// Certifique-se de que idUsuario está definido corretamente
//var idUsuario = 1;

// Inicializa o quiz
//loadQuestion();


/**
 * 
 * Busca a as respostas certas e coirretas do usuario logado
 */
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3010/respostas-usuarios")
        .then((response) => response.json())
        .then((data) => {
            const correctIncorrectData = {
                correct: 0,
                incorrect: 0
            };

            const times = [];

            data.forEach((item) => {
                if (item.acertou) {
                    correctIncorrectData.correct++;
                } else {
                    correctIncorrectData.incorrect++;
                }
                times.push(parseFloat(item.tempo_resposta));
            });

            const averageTime = times.reduce((a, b) => a + b, 0) / times.length;

            // Gráfico de Respostas Corretas e Incorretas
            new Chart(document.getElementById("correctIncorrectChart"), {
                type: "pie",
                data: {
                    labels: ["Corretas", "Incorretas"],
                    datasets: [{
                        data: [correctIncorrectData.correct, correctIncorrectData.incorrect],
                        backgroundColor: ["#28a745", "#dc3545"],
                        borderColor: ["#ffffff", "#ffffff"],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 14
                                },
                                color: '#333'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Distribuição de Respostas Corretas e Incorretas',
                            font: {
                                size: 18
                            },
                            color: '#333'
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    const label = tooltipItem.label;
                                    const value = tooltipItem.raw;
                                    return `${label}: ${value}`;
                                }
                            }
                        }
                    }
                }
            });

            // Gráfico de Tempo Médio de Resposta
            new Chart(document.getElementById("averageTimeChart"), {
                type: "bar",
                data: {
                    labels: ["Tempo Médio de Resposta"],
                    datasets: [{
                        label: 'Segundos',
                        data: [averageTime],
                        backgroundColor: ["#007bff"],
                        borderColor: ["#007bff"],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            labels: {
                                font: {
                                    size: 14
                                },
                                color: '#333'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Tempo Médio de Resposta',
                            font: {
                                size: 18
                            },
                            color: '#333'
                        },
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    const value = tooltipItem.raw;
                                    return `Tempo Médio: ${value.toFixed(2)} segundos`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 14
                                },
                                color: '#333'
                            },
                            title: {
                                display: true,
                                text: 'Segundos',
                                font: {
                                    size: 16
                                },
                                color: '#333'
                            }
                        }
                    }
                }
            });
        })
        .catch((error) => console.error("Erro ao buscar dados:", error));
});





/**
 * 
 * 
 * Jogo da Forca a baixo
 */
// Lista de palavras com dicas
// Variáveis globais iniciais


    // Função salvarJogo agora usa idDoUsuario diretamente
/*

let currentIndex = 0;
let currentWord = "";
let currentHint = "";
let displayWord = [];
let attempts = 6;
let errors = 0;
let score = 0;
let remainingTime = 30; // Tempo restante para a rodada
let timer;

// Lista de palavras com dicas
const wordsWithHints = [
    { word: "css", hint: "Linguagem de estilização" },
    { word: "html", hint: "Linguagem de marcação de texto" },
];

// Inicializar o jogo somente ao clicar em "Iniciar Jogo"
function startGame() {
    const startButton = document.getElementById("start");
    const gameContainer = document.getElementById("game-container");
    const wordDisplayElement = document.getElementById("word-display");
    const attemptsElement = document.getElementById("attempts");
    const errorsElement = document.getElementById("errors");
    const timeElement = document.getElementById("time");
    const scoreElement = document.getElementById("score");
    const hintElement = document.getElementById("hint");
    const messageElement = document.getElementById("message");

    startButton.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    currentIndex = 0;
    score = 0;

    // Passar para a próxima rodada
    function nextRound() {
        if (currentIndex >= wordsWithHints.length) {
            endGame(`Jogo completo! Sua pontuação final é: ${score}`);
            return;
        }

        const { word, hint } = wordsWithHints[currentIndex];
        currentWord = word;
        currentHint = hint;
        displayWord = Array(word.length).fill("_");

        attempts = 6;
        errors = 0;
        remainingTime = 30;

        updateUI();

        clearInterval(timer);
        timer = setInterval(() => {
            remainingTime--;
            timeElement.textContent = remainingTime;
            if (remainingTime === 0) {
                messageElement.textContent = "O tempo acabou! Próxima palavra...";
                clearInterval(timer);
                currentIndex++;
                setTimeout(nextRound, 2000);
            }
        }, 1000);
    }

    function updateUI() {
        wordDisplayElement.textContent = displayWord.join(" ");
        hintElement.textContent = currentHint;
        attemptsElement.textContent = attempts;
        errorsElement.textContent = errors;
        scoreElement.textContent = score;
        timeElement.textContent = remainingTime;
    }

    document.getElementById("submit").addEventListener("click", () => {
        const guessInput = document.getElementById("guess");
        const guess = guessInput.value.toLowerCase();

        if (guess.length !== 1) {
            messageElement.textContent = "Por favor, insira apenas uma letra!";
            return;
        }

        guessInput.value = "";

        if (currentWord.includes(guess)) {
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === guess) {
                    displayWord[i] = guess;
                    score += 10;
                }
            }
            if (!displayWord.includes("_")) {
                messageElement.textContent = "Parabéns! Próxima palavra...";
                clearInterval(timer);
                currentIndex++;
                setTimeout(nextRound, 2000);
            }
        } else {
            attempts--;
            errors++;
            if (attempts === 0) {
                messageElement.textContent = "Você perdeu esta rodada! Próxima palavra...";
                clearInterval(timer);
                currentIndex++;
                setTimeout(nextRound, 2000);
            }
        }

        updateUI();
    });

    function endGame(message) {
        clearInterval(timer);
        messageElement.textContent = message;

        // Exemplo: Pegue o ID do usuário logado (substitua conforme seu mecanismo de autenticação)
        //const fkusuario = idDoUsuario// Substituir "1" pelo valor padrão adequado se fkusuario não estiver definido

        // Salvar os dados do jogo no banco
        salvarJogo(attempts, errors, 30 - remainingTime, fkusuario);

        startButton.textContent = "Jogar Novamente";
        startButton.classList.remove("hidden");
        gameContainer.classList.add("hidden");
    }

    nextRound();
}

// Apenas inicializa o evento do botão no carregamento
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start");
    startButton.addEventListener("click", startGame);
});

function destivarbotaoforca(){
    var botao = start
    botao.hidden = true
}*/