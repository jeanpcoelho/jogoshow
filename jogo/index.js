let playerName = '';
let currentRoundIndex = 0;
let currentQuestionIndex = 0;
let playerScore = 0;

function startGame() {
    const playerNameInput = document.getElementById('playerName');
    playerName = playerNameInput.value.trim();

    if (playerName === '') {
        alert('Por favor, digite seu nome.');
        return;
    }

    
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';

    // Exibir informações do jogador e da rodada
    showPlayerInfo();
    showQuestion();
}

function showPlayerInfo() {
    const playerInfoElement = document.getElementById('playerInfo');
    playerInfoElement.innerText = `Jogador: ${playerName} | Pontuação: ${playerScore}`;
    
    const roundInfoElement = document.getElementById('roundInfo');
    roundInfoElement.innerText = `Rodada: ${currentRoundIndex + 1}`;
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const nextButton = document.getElementById('next-button');

    
    resultContainer.innerText = '';

    const currentQuestion = questions[currentRoundIndex][currentQuestionIndex];

    questionContainer.innerText = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerText = `${index + 1}. ${option}`;
        optionElement.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(optionElement);
    });

    nextButton.style.display = 'none';

    if (currentRoundIndex === questions.length - 1 && currentQuestionIndex === questions[currentRoundIndex].length - 1) {
        nextButton.innerText = 'Finalizar Jogo';
    }

    if (currentQuestionIndex < questions[currentRoundIndex].length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentRoundIndex][currentQuestionIndex];
    const resultContainer = document.getElementById('result-container');

    if (selectedOption === currentQuestion.answer) {
        resultContainer.innerText = `Você acertou! Pontuação: +${currentQuestion.points.correct}`;
        playerScore += currentQuestion.points.correct;
    } else {
        resultContainer.innerText = `Você errou! Pontuação: +${currentQuestion.points.incorrect}`;
        endGame();
        return;
    }

    const nextButton = document.getElementById('next-button');
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions[currentRoundIndex].length) {
        showQuestion();
    } else {
        currentQuestionIndex = 0;
        currentRoundIndex++;

        if (currentRoundIndex < questions.length) {
            showPlayerInfo();
            showQuestion();
        } else {
            endGame();
        }
    }
}

function endGame() {
    const correctAnswer = questions[currentRoundIndex][currentQuestionIndex].answer;

    alert(
        `Parabéns, ${playerName}! Você parou na rodada ${currentRoundIndex + 1}.\n` +
        `Resposta correta da última pergunta: ${correctAnswer}\n` +
        `Pontuação final: ${playerScore}`
    );

    const playAgain = confirm('Deseja jogar novamente?');
    
    if (playAgain) {
        resetGame();
    } else {
        
    }
}

function resetGame() {
    currentRoundIndex = 0;
    currentQuestionIndex = 0;
    playerScore = 0;

    showPlayerInfo();
    showQuestion();
}
