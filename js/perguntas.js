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
    var dancaEscolhida = palavraQueMaisRepete(dancas)
    if (dancaEscolhida == "caporal") {
        questoes.innerHTML = `
    <div class="mainQuiz"> 
        <div id="quizForm" class="formQuiz">
            <h1>Qual dança combina mais com você?</h1>
            <div class="question"> 
                <h2>A dança que mais combina com você é <span id="dancaEscolhida">caporal</span></h2> 
                <img class="imagemfocloreescolhido" src="assets/imagens/iconefolcloricos/iconCaporal.png" alt=""> 
                <button id="salvarDancaBtn">Salvar Escolha</button> 
            </div> 
        </div>
    </div>
    `} else if (dancaEscolhida == "tinku") {
        questoes.innerHTML = `
     <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
        <h2> A dança que mais combina com voce é ${dancaEscolhida}</h2>
         <img class="imagemfocloreescolhido" src="assets/imagens/iconefolcloricos/iconTinkus.png" alt=""> 

</div>
    </div>
</div>
    `} else if (dancaEscolhida == "morenada") {
        questoes.innerHTML = `
     <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
        <h2> A dança que mais combina com voce é ${dancaEscolhida}</h2>
         <img class="imagemfocloreescolhido" src="assets/imagens/iconefolcloricos/iconMorenada.png" alt=""> 

</div>
    </div>
</div>
    `} else if (dancaEscolhida == "diablada") {
        questoes.innerHTML = `
     <div class="mainQuiz">
    <div id="quizForm" class="formQuiz">
        <h1>Qual dança combina mais com voce ?</h1>
    <div class="question">
           <h2> A dança que mais combina com voce é ${dancaEscolhida}</h2>
         <img class="imagemfocloreescolhido" src="assets/imagens/iconefolcloricos/iconDiablada.png" alt="">

</div>
    </div>
</div>
    `}

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




// Exemplo de uso


