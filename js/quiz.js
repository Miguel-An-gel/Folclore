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
    fetch("http://localhost:3000/salvar-resposta", {
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
            fkusuario: idUsuario, // Aqui o idUsuario é enviado
        });
    });

    document.getElementById("quiz-container").style.display = "none";
}

// Certifique-se de que idUsuario está definido corretamente
var idUsuario = 1;

// Inicializa o quiz
loadQuestion();