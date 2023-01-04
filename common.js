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

export {showQuestion}; 