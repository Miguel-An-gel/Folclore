// Dados do quiz
const questions = [
    { question: "A Terra é plana?", answer: false },
    { question: "2 + 2 é igual a 4?", answer: true },
    { question: "O sol é uma estrela?", answer: true },
    { question: "JavaScript é a mesma coisa que Java?", answer: false }
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

    questionTimes.push((endTime - startTime) / 1000);
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

    console.log("Tempos de resposta:", questionTimes);
}

// Eventos de resposta
trueButton.addEventListener("click", () => answerQuestion(true));
falseButton.addEventListener("click", () => answerQuestion(false));
