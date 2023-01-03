import { showQuestion } from './script.js';

const questionsData = [
	{
		id: 1, 
		value: "Vous souhaitez qu'Acasi vous aide à choisir votre nouveau statut ?", 
		choices: [
			{
				id: 1, 
				value: "Oui", 
                nextQuestion: 4, 
                showPhoneNumber: true
			}, 
			{
				id: 2, 
				value: "Non, je vais me débrouiller.", 
                nextQuestion: 5, 
                showPhoneNumber: false 
			}
		] 
	}, 
	{
		id: 2, 
		value: "Souhaitez-vous qu'on vous aide à préparer la transition vers le régime de la TVA ?", 
		choices: [
			{
				id: 1, 
				value: "Oui", 
                nextQuestion: 4, 
                showPhoneNumber: true
			}, 
			{
				id: 2, 
				value: "Non, je vais me débrouiller.", 
                nextQuestion: 6, 
                showPhoneNumber: false 
			}
		]
	}, 
    {
        id: 3, 
        value: "Vous souhaitez avoir de l'aide pour la transition vers un autre statut juridique ?", 
        choices: [
            {
                id: 1, 
                value: "Oui", 
                nextQuestion: 4, 
                showPhoneNumber: true
            }, 
            {
                id: 2, 
                value: "Non, je vais me débrouiller.",
                nextQuestion: 5, 
                showPhoneNumber: false
            }
        ]
    }, 
    {
        id: 4, 
        value: "Laissez-nous votre numéro de téléphone. On vous appelle dans la journée." 
    }, 
    {
        id: 5, 
        value: "Pas de problèmes ! Sachez qu'en ce moment, la création de société est totalement gratuite avec Acasi. J'en profite !" 
    }, 
    {
        id: 6, 
        value: "Pas de problèmes !"
    }
]; 

const questionEl = document.getElementById('question');
let currentQuestionData; 
const quizOptions = document.querySelector('.quiz-options');

loadQuestion();

function loadQuestion() {
    const lastQuestion = parseInt(localStorage.getItem('lastQuestion')); 
    const lastAnswer = parseInt(localStorage.getItem('lastAnswer')); 

    if (lastQuestion === 3 && lastAnswer === 1 
        || lastQuestion === 4 && lastAnswer === 1) {
            currentQuestionData = questionsData[0]; 
    } else if (lastQuestion === 4 && lastAnswer === 2) {
        currentQuestionData = questionsData[1]; 
    } else if (lastQuestion === 5 && lastQuestion === 2) {
        currentQuestionData = questionsData[2]; 
    } else {
        return window.location.href = "https://www.acasi.io/"; 
    }

    questionEl.innerText = currentQuestionData.value; 
    const choicesLength = Object.keys(currentQuestionData.choices).length;

    showQuestion(currentQuestionData.id, choicesLength); 
}


function checkAnswer() {
    const inputCheck = document.querySelector('.input-answer:checked'); 
    const currentChoice = currentQuestionData.choices.find(choice => choice.id === parseInt(inputCheck.id)); 

    getNextQuestion(currentChoice); 
}


function getNextQuestion(currentChoice) {
    const nextQuestionId = currentChoice.nextQuestion; 
    const nextQuestionData = questionsData.find(question => question.id === nextQuestionId); 
    const showPhoneNumber = currentChoice.showPhoneNumber; 

    if (showPhoneNumber === true) {
        document.getElementById('phone').classList.remove('hidden'); 
        questionEl.innerText = nextQuestionData.value; 
        quizOptions.innerHTML = ""; 
    } else if (showPhoneNumber === false) {
        questionEl.innerText = nextQuestionData.value; 
        quizOptions.innerHTML = ""; 
        document.getElementById('acasi-btn').classList.remove('hidden'); 
    } else {
        questionEl.innerText = nextQuestionData.value;
    }
}
