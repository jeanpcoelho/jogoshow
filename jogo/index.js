let currentRoundIndex = 0;
let currentQuestionIndex = 0;

function startGame() {
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');

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

    if (selectedOption === currentQuestion.answer) {
        alert('Resposta Correta!');
    } else {
        alert('Resposta Incorreta!');
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
            showQuestion();
        } else {
            alert('Parabéns! Você completou o jogo do Show do Milhão.');
        }
    }
}

startGame();
