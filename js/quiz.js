// Dados do quiz
const questions = [
    { question: "Caporal é brasileiro?", answer: false },
    { question: "caporal usa cascaveis?", answer: true },
    { question: "Tinku é de potosi?", answer: true },
    { question: "Diablada é o diabo?", answer: false }
];

// Variáveis globais
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let startTime;
let questionTimes = [];
let answerStats = questions.map(() => ({ correct: 0, incorrect: 0 }));

// Elementos do DOM
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const trueButton = document.getElementById("true-button");
const falseButton = document.getElementById("false-button");
const kpiContainer = document.getElementById("kpi-container");
const correctCountElement = document.getElementById("correct-count");
const incorrectCountElement = document.getElementById("incorrect-count");
const mostCorrectElement = document.getElementById("most-correct");
const mostIncorrectElement = document.getElementById("most-incorrect");
const responseTimesElement = document.getElementById("response-times");

// Iniciar o quiz
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startButton.classList.add("hidden");
    kpiContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");

    // Reiniciar variáveis
    currentIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    questionTimes = [];
    answerStats = questions.map(() => ({ correct: 0, incorrect: 0 }));

    loadQuestion();
}

// Carregar a próxima pergunta
function loadQuestion() {
    if (currentIndex >= questions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = questions[currentIndex];
    questionElement.textContent = currentQuestion.question;
    startTime = new Date().getTime();
}

// Responder a pergunta
function answerQuestion(isTrue) {
    const currentQuestion = questions[currentIndex];
    const endTime = new Date().getTime();

    const isCorrect = isTrue === currentQuestion.answer;
    if (isCorrect) {
        correctCount++;
        answerStats[currentIndex].correct++;
    } else {
        incorrectCount++;
        answerStats[currentIndex].incorrect++;
    }

    // Calcular tempo de resposta em segundos
    const responseTime = ((endTime - startTime) / 1000).toFixed(2);
    questionTimes.push({ question: currentQuestion.question, time: responseTime });

    currentIndex++;
    loadQuestion();
}

// Exibir resultados
function endQuiz() {
    questionContainer.classList.add("hidden");
    kpiContainer.classList.remove("hidden");

    correctCountElement.textContent = correctCount;
    incorrectCountElement.textContent = incorrectCount;

    const mostCorrectIndex = answerStats.findIndex(
        stat => stat.correct === Math.max(...answerStats.map(s => s.correct))
    );
    const mostIncorrectIndex = answerStats.findIndex(
        stat => stat.incorrect === Math.max(...answerStats.map(s => s.incorrect))
    );

    mostCorrectElement.textContent = questions[mostCorrectIndex]?.question || "Nenhuma";
    mostIncorrectElement.textContent = questions[mostIncorrectIndex]?.question || "Nenhuma";

    // Mostrar os tempos de resposta
    responseTimesElement.innerHTML = questionTimes
        .map(item => `<li>${item.question}: ${item.time}s</li>`)
        .join("");

    // Salvar os dados no banco de dados
    salvarQuiz(correctCount, incorrectCount, mostCorrectElement.textContent, mostIncorrectElement.textContent, questionTimes);
}

// Salvar os dados no banco de dados
function salvarQuiz(correct, incorrect, mostCorrect, mostIncorrect, responseTimes) {
    const fkUsuario = 1; // Substitua pelo ID do usuário logado.
    const payload = {
        correct,
        incorrect,
        mostCorrect,
        mostIncorrect,
        responseTimes,
        fkUsuario,
    };

    fetch("/api/quiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao salvar os dados.");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Dados salvos com sucesso:", data);
        })
        .catch((error) => {
            console.error("Erro ao salvar os dados:", error);
        });
}
// Função para mostrar os KPIs na dashboard
// Adicionar evento ao botão
document.addEventListener("DOMContentLoaded", () => {
    const fkUsuario = 1; // Substitua com o ID do usuário logado
    const loadDataButton = document.getElementById("load-data-btn");

    loadDataButton.addEventListener("click", () => {
        mostrarDashboard(fkUsuario);
    });
function mostrarDashboard(fkUsuario) {
    fetch(`/api/quiz/${fkUsuario}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao buscar os dados.");
            }
            return response.json();
        })
        .then((data) => {
            if (data.length === 0) {
                alert("Nenhum dado encontrado para este usuário.");
                return;
            }

            // KPIs
            const totalCorrect = data.reduce((sum, item) => sum + item.respostas_certas, 0);
            const totalIncorrect = data.reduce((sum, item) => sum + item.respostas_erradas, 0);
            const averageTime = data
                .reduce((sum, item) => sum + JSON.parse(item.tempos_resposta).reduce((a, b) => a + b, 0), 0) /
                data.reduce((sum, item) => sum + JSON.parse(item.tempos_resposta).length, 0);

            // Atualizar elementos da página
            document.getElementById("correct-answers").textContent = totalCorrect;
            document.getElementById("incorrect-answers").textContent = totalIncorrect;
            document.getElementById("average-time").textContent = averageTime.toFixed(2);

            // Mostrar a dashboard
            document.getElementById("dashboard").classList.remove("hidden");
        })
        .catch((error) => {
            console.error("Erro ao buscar os dados:", error);
            alert("Não foi possível carregar os dados.");
        });
}


});


// Eventos de resposta
trueButton.addEventListener("click", () => answerQuestion(true));
falseButton.addEventListener("click", () => answerQuestion(false));
