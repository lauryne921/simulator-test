const viewAnswerBtn = document.querySelector('.view-answer'); 
const emailInput = document.getElementById('email');

// const currentQuestionData = questions[0]; 
// const quizOptions = document.querySelector('.quiz-options'); 

const finalAnswer = document.getElementById('final-answer');
const containerFinalAnswer = document.getElementById('container-final-answer');  

viewAnswerBtn.addEventListener('click', () => {
    if (emailInput.value === "") {
        alert('Entrez votre email pour accéder à la réponse'); 
    } else { 
        containerFinalAnswer.classList.remove('hidden'); 
        document.getElementById('form-email').classList.add('hidden'); 
        viewAnswerBtn.classList.add('hidden'); 
        loadAnswer();  
    }
});

document.getElementById('suite-btn').addEventListener('click', () => {
    window.location.href = "/phoneForm.html";  
}); 


function loadAnswer() {
    const lastQuestion = parseInt(localStorage.getItem('lastQuestion')); 
    const lastAnswer = parseInt(localStorage.getItem('lastAnswer')); 

    if (lastQuestion === 3 && lastAnswer === 1) {
        showAnswer('answer-one'); 
    } else if (lastQuestion === 2 && lastAnswer === 1) {
        showAnswer('answer-two'); 
    } else if (lastQuestion === 2 && lastAnswer === 2) {
        showAnswer('answer-three'); 
    } else if (lastQuestion === 4 && lastAnswer === 1) {
        showAnswer('answer-one'); 
    } else if (lastQuestion === 4 && lastAnswer === 2) {
        showAnswer('answer-four'); 
    } else {
        showAnswer('answer-five'); 
    }
}


function showAnswer(templateId) {
    const answer = document.getElementById(templateId); 
    const clone = answer.content.cloneNode(true); 
    finalAnswer.appendChild(clone);
}