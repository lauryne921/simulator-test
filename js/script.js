const questionsData = [
    {   
        id: 0, 
        question: "Quel est votre type d'activité ?", 
        choices: [
            {
                id: 1, 
                value: "Vente de marchandises",
                nextQuestion: 1
            }, 
            {
                id: 2, 
                value: "Prestation de services",
                nextQuestion: 1
            }
        ]
    }, 
    {
        id: 1,
        question: "Cette année, vous allez réaliser", 
        choices: [
            {
                id: 1, 
                value: "Moins de 85 500€ de CA", 
                nextQuestion: 2
            }, 
            {
                id: 2, 
                value: "Entre 85 500€ et 94 300€ de CA", 
                nextQuestion: 3
            }, 
            {
                id: 3, 
                value: "Plus de 94 300€ de CA", 
                nextQuestion: 4
            }, 
            {
                id: 4, 
                value: "Plus de 176 200 € de CA", 
                nextQuestion: 5
            }
        ]
    },
    {
        id: 2,
        question: "Vos charges représentent", 
        choices: [
            {
                id: 1, 
                value: "Plus de % de votre CA", 
                showEmailForm: true
            }, 
            {
                id: 2, 
                value: "Moins de % de votre CA", 
                showEmailForm: true 
            }
        ]
    },
    { 
        id: 3,
        question: "L'année dernière vous avez réalisé", 
        choices: [
            {
                id: 1, 
                value: "Plus de 85 500€", 
                showEmailForm: true
            }, 
            {
                id: 2, 
                value: "Moins de 85 800€", 
                nextQuestion: 2 
            },
            {
                id: 3, 
                value: "C'est ma premère année d'activité", 
                nextQuestion: 2
            }
        ]
    }, 
    {
        id: 4, 
        question: "Vos clients sont majoritairement des", 
        choices: [
            {
                id: 1, 
                value: "Particuliers", 
                showEmailForm: true
            }, 
            {
                id: 2, 
                value: "Professionnels (autres sociétés)", 
                showEmailForm: true
            }
        ]
    }, 
    {
        id: 5, 
        question: "L'année dernière vous avez réalisé ", 
        choices: [
            {
                id: 1, 
                value: "Moins de 176 200€", 
                nextQuestion: 2
            }, 
            {
                id: 2, 
                value: "Plus de 176 200€", 
                showEmailForm: true
            }
        ]
    }
]; 


const currentQuestionInput = document.getElementById('currentQuestion'); 


loadQuestion(); 


function loadQuestion() { 
    const currentQuestionData = questionsData.find(question => question.id === parseInt(currentQuestionInput.value));

    const questionLength = Object.keys(currentQuestionData.choices).length; 

    const currentQuestionId = currentQuestionData.id; 

    showQuestion(currentQuestionId, questionLength); 
}

function checkAnswer() {
    const inputCheck = document.querySelector('.input-answer:checked'); 
    const currentQuestionData = questionsData.find(question => question.id === parseInt(currentQuestionInput.value));
    const currentChoice = currentQuestionData.choices.find(choice => choice.id === parseInt(inputCheck.id)); 

    localStorage.setItem('lastQuestion', currentQuestionData.id);
    localStorage.setItem('lastAnswer', currentChoice.id); 

    getNextQuestion(currentChoice); 
}


function getNextQuestion(currentChoice) {
    const nextQuestionId = currentChoice.nextQuestion; 
    currentQuestionInput.value = nextQuestionId; 
    const nextQuestionData = questionsData.find(question => question.id === nextQuestionId);  

    if (currentChoice.showEmailForm === true) { 
        window.location.href = "/emailForm.html"; 
    } else {
        const numberOfChoices = Object.keys(nextQuestionData.choices).length;
        showQuestion(nextQuestionId, numberOfChoices);
    }
}


function showQuestion(idQuestion, numberOfChoices) {
    document.querySelector('.quiz-options').innerHTML = ""; 
    const questionEl = document.getElementById('question'); 
    const nextQuestionData = questionsData.find(question => question.id === idQuestion);
    const template = document.querySelector(`.answers-template[data-number-of-choices='${numberOfChoices}']`);

    const cloneTemplate = document.importNode(template.content, true); 
    const templateAnswers = cloneTemplate.querySelectorAll('.answerBlock'); 

    questionEl.innerText = nextQuestionData.question;
    
    templateAnswers.forEach((answer, index) => {
        const { id, value } = nextQuestionData.choices[index]; 
        const input = answer.querySelector('.input-answer'); 
        input.setAttribute('id', id); 

        const label = answer.querySelector('.answer'); 
        label.textContent = value;
        label.setAttribute('for', id); 
    }); 

    document.querySelector('.quiz-options').appendChild(cloneTemplate);
}

module.exports = showQuestion; 