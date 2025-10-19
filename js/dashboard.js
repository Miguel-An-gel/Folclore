// Variável global para o ID do usuário
let idGlobalUsuario;


document.addEventListener('DOMContentLoaded', () => {
    // Recupera os dados do usuário do localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Verifica se o usuário está logado
    if (!usuario) {
        alert('Você precisa fazer login!');
        window.location.href = '/login.html'; // Redireciona
        return;
    }

    document.getElementById('user_id').textContent = usuario.idusuario;
    document.getElementById('user-name').textContent = usuario.nome;
    document.getElementById('user-email').textContent = usuario.email;

    idGlobalUsuario = usuario.idusuario;

    fetch(`/minhasDancas/${idGlobalUsuario}`)
        .then(response => {
            if (!response.ok) throw new Error('Falha ao buscar danças');
            return response.json();
        })
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
            const suadancaElem = document.getElementById('user-suadanca');
            if (suadancaElem) suadancaElem.textContent = 'Erro ao carregar.';
        });
});

// Função de logout (chamada pelo botão no HTML)
function logout() {
    localStorage.removeItem('usuario');
    window.location.href = '/login.html';
}

const quizContainer = document.getElementById("questoes");

// Volta ao menu principal de jogos
function jogarOsjogos() {
    const quizContainer = document.getElementById("questoes");
    if(quizContainer) {
        quizContainer.innerHTML = `
        <div class="mainQuiz">
            <div id="quizForm" class="formQuiz">
                <h1>Escolha o Jogo!</h1>
                <div class="question">
                    <button class="perguntas" onclick="iniciarQuizDanca()">QUAL SEU ESTILO DE DANÇA?</button>
                    <a href="dashperguntas.html"><button class="perguntas">VAMOS DE QUIZ?</button></a> <br>
                    <img class="imagemfoclore" src="assets/imagens/back/iconesfolcloricos.png" alt="">
                </div>
            </div>
        </div>
        `;
    }
}


const quizDancaData = [{
    question: "1. Qual dessas palavras descreve melhor sua personalidade?",
    options: [{ text: "Elegância", value: "caporal" }, { text: "Energia", value: "tinku" }, { text: "Tradição", value: "morenada" }, { text: "Mistério", value: "diablada" }]
}, {
    question: "2. Qual estilo de roupa você prefere?",
    options: [{ text: "Trajes com bordados e chapéu elegante", value: "caporal" }, { text: "Roupas leves para movimentos intensos", value: "tinku" }, { text: "Trajes tradicionais com ornamentos", value: "morenada" }, { text: "Fantasias impressionantes com máscaras", value: "diablada" }]
}, {
    question: "3. Como você gosta de dançar?",
    options: [{ text: "Movimentos graciosos e sincronizados", value: "caporal" }, { text: "Dança vigorosa e cheia de saltos", value: "tinku" }, { text: "Ritmo forte e passos intensos em grupo", value:"morenada" }, { text: "Uma mistura de drama e teatralidade", value: "diablada" }]
}, {
    question: "4. Qual cenário combina mais com você?",
    options: [{ text: "Um desfile cheio de pompa e ritmo marcante", value: "caporal" }, { text: "Uma celebração cheia de força e energia em grupo", value: "tinku" }, { text: "Uma festa tradicional com raízes comunitárias", value: "morenada" }, { text: "Uma apresentação teatral com história e fantasia", value: "diablada" }]
}, {
    question: "5. Que tipo de música te atrai mais?",
    options: [{ text: "Ritmos marcados pelo som do sino", value: "caporal" }, { text: "Batidas fortes de tambores", value: "tinku" }, { text: "Música folclórica tradicional e vibrante", value: "morenada" }, { text: "Sons que misturam drama e intensidade", value: "diablada" }]
}, {
    question: "6. Se você estivesse participando de um desfile, como seria sua postura?",
    options: [{ text: "Orgulhoso(a) e elegante", value: "caporal" }, { text: "Energético(a) e cheio(a) de vigor", value: "tinku" }, { text: "Sereno(a) e em harmonia com o grupo", value: "morenada" }, { text: "Misterioso(a) e teatral", value: "diablada" }]
}, {
    question: "7. Qual tipo de celebração cultural te atrai mais?",
    options: [{ text: "Festas comunitárias com desfiles coreografados", value: "caporal" }, { text: "Eventos ao ar livre com desafios físicos", value: "tinku" }, { text: "Festas tradicionais com foco na união", value: "morenada" }, { text: "Celebrações que misturam teatro e drama", value: "diablada" }]
}, {
    question: "8. Como você descreveria sua energia ao dançar?",
    options: [{ text: "Moderada, mas com movimentos elegantes", value: "caporal" }, { text: "Intensa e cheia de explosão", value: "tinku" }, { text: "Constante, em harmonia com o grupo", value: "morenada" }, { text: "Variável, dependendo da apresentação", value: "diablada" }]
}, {
    question: "9. Se você fosse escolher um acessório para sua roupa, qual seria?",
    options: [{ text: "Um chapéu decorado com detalhes brilhantes", value: "caporal" }, { text: "Faixas e ornamentos leves", value: "tinku" }, { text: "Máscaras ou detalhes tradicionais", value: "morenada" }, { text: "Algo dramático, como uma capa ou asas", value: "diablada" }]
}, {
    question: "10. Qual destes ambientes você prefere para dançar?",
    options: [{ text: "Palcos ou ruas com muitas pessoas assistindo", value: "caporal" }, { text: "Áreas abertas, para se movimentar livremente", value: "tinku" }, { text: "Locais históricos ou culturais", value: "morenada" }, { text: "Teatros ou festas que envolvem uma narrativa", value: "diablada" }]
}];

var dancas = [];
var contagemPerguntas = 0;

// Esta função inicia o quiz de dança
function iniciarQuizDanca() {
    dancas = [];
    contagemPerguntas = 0;
    
    const currentQuestion = quizDancaData[contagemPerguntas];
    const quizContainer = document.getElementById("questoes");

    
    quizContainer.innerHTML = `
    <div class="mainQuiz">
        <div id="quizForm" class="formQuiz">
            <h1>Qual dança combina mais com você?</h1>
            <div class="question">
                <h2 id="quiz-question-text" style="color: #fbf7f7ff;">${currentQuestion.question}</h2>
                <div id="quiz-options" class="options-container"></div>
            </div>
        </div>
    </div>`;

    const optionsContainerEl = document.getElementById("quiz-options");

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.className = "perguntas";
        button.dataset.value = option.value;
        button.addEventListener("click", selectAnswerDanca);
        optionsContainerEl.appendChild(button);
    });
}

// Carrega as próximas perguntas
function loadNextDancaQuestion() {
    const currentQuestion = quizDancaData[contagemPerguntas];
    const questionTextEl = document.getElementById("quiz-question-text");
    const optionsContainerEl = document.getElementById("quiz-options");

    questionTextEl.innerText = currentQuestion.question;
    optionsContainerEl.innerHTML = ""; // Limpa botões antigos

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.className = "perguntas";
        button.dataset.value = option.value;
        button.addEventListener("click", selectAnswerDanca);
        optionsContainerEl.appendChild(button);
    });
}

// Chamada quando um botão de resposta é clicado
function selectAnswerDanca(event) {
    const selectedDance = event.target.dataset.value;
    dancas.push(selectedDance);
    contagemPerguntas++;

    if (contagemPerguntas < quizDancaData.length) {
        loadNextDancaQuestion(); 
    } else {
        mostrarResultadoDanca(); 
    }
}

function salvarDancaAutomatica(danca) {
    if (!idGlobalUsuario) {
        console.error("ID do usuário (idGlobalUsuario) não encontrado. Não é possível salvar.");
        return;
    }
    
    fetch('/salvarDanca', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomedanca: danca, fkusuario: idGlobalUsuario })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); 
      
        fetch(`/minhasDancas/${idGlobalUsuario}`)
        .then(response => response.json())
        .then(dancas => {
            const suadancaElem = document.getElementById('user-suadanca');
            if (suadancaElem) {
                suadancaElem.textContent = dancas.length > 0 ? dancas.map(d => d.nomedanca).join(', ') : 'Você não tem danças salvas.';
            }
        });
    })
    .catch(error => {
        console.error('Erro ao salvar a dança automaticamente:', error);
    });
}

// Mostra o resultado final do quiz de dança
function mostrarResultadoDanca() {
    const dancaEscolhida = palavraQueMaisRepete(dancas);
    const dancaInfo = {
        caporal: { nome: "Caporal", imagem: "assets/imagens/iconefolcloricos/iconCaporal.png" },
        tinku: { nome: "Tinku", imagem: "assets/imagens/iconefolcloricos/iconTinkus.png" },
        morenada: { nome: "Morenada", imagem: "assets/imagens/iconefolcloricos/iconMorenada.png" },
        diablada: { nome: "Diablada", imagem: "assets/imagens/iconefolcloricos/iconDiablada.png" }
    };
    const info = dancaInfo[dancaEscolhida] || { nome: "Indefinido", imagem: "" }; 

    const quizContainer = document.getElementById("questoes");
    quizContainer.innerHTML = `
    <div class="mainQuiz"> 
        <div id="quizForm" class="formQuiz">
            <h1>Qual dança combina mais com você?</h1>
            <div class="question"> 
                <h2 style="color: #fbf7f7ff;">A dança que mais combina com você é <span id="dancaEscolhida">${info.nome}</span></h2> 
                <img class="imagemfocloreescolhido" src="${info.imagem}" alt="Imagem da dança ${info.nome}"> 
                <p class="salvando-msg" style="color: #fbf7f7ff;">Sua escolha foi salva automaticamente!</p> 
                <br>
                <button class="perguntas" onclick="jogarOsjogos()">Jogar Novamente</button>
            </div> 
        </div>
    </div>
    `;
    
    salvarDancaAutomatica(info.nome);
}

function palavraQueMaisRepete(dancas) {
    const contarPalavras = {};
    let maisRepetidas = ""; 
    let maiorContagem = 0;
    for (const palavra of dancas) {
        contarPalavras[palavra] = (contarPalavras[palavra] || 0) + 1;
        if (contarPalavras[palavra] > maiorContagem) {
            maiorContagem = contarPalavras[palavra];
            maisRepetidas = palavra;
        }
    }
    return maisRepetidas;
}
