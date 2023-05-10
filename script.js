let operators = ['+', "-", "*"];
const startBtn = document.getElementById('start-btn');
const question = document.getElementById('question');
const controls = document.getElementById('controls');
const result   = document.getElementById('result');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-msg');
let answerValue;
let operatorQuestion;


// Generates a random number between two numbers
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const questionGenerator = () => {
    // Getting two random numbers between 0 and 100
    let num1 = getRandomNumber(0, 100);
    let num2 = getRandomNumber(0, 100);

    // Getting random operator
    let operator = operators[getRandomNumber(0, 2)];

    // Solving operation
    let solution = eval(`${num1}${operator}${num2}`);
    
    // Random Guess (Numbers, sign or result)
    let randomVar = getRandomNumber(1, 5);
    
    if (randomVar == 1) {
        answerValue = num1;
        question.innerHTML = `<input type="number" id="inputValue" class="app__number" placeholder="?" pattern="[0-9]+" maxlength="2" \> ${operator} ${num2} = ${solution}`;

    } else if (randomVar == 2) {
        answerValue = num2;
        question.innerHTML = `${num1} ${operator} <input type="number" id="inputValue" class="app__number" placeholder="?" pattern="[0-9]+" maxlength="2" \> = ${solution}`;
        
    } else if (randomVar == 3) {
        answerValue = operator;
        operatorQuestion = true;
        question.innerHTML = `${num1} <input type="text" id="inputValue" class="app__number" placeholder="?" pattern="[+\*-]{1}" maxlength="1" \> ${num2} = ${solution}`;
    } else {
        answerValue = solution;
        question.innerHTML = `${num1} ${operator} ${num2} = <input type="number" id="inputValue" class="app__number" placeholder="?" pattern="[0-9]+" \>`;
    }

    // User Input Check
    const submitHandler = () => {
        errorMessage.classList.add('hide');
        let userInput = document.getElementById('inputValue').value;

        if (userInput) {
            // If user inputs the correct answer
            if (userInput == answerValue) {
                stopGame(`Yippie!! <span class="controls__text">Correcy</span> Answer`);
            // If user inputs an invalid operator (other than +, -, *)
            } else if (operatorQuestion && !operators.includes(userInput)) {
                errorMessage.innerHTML = 'Please enter a valid operator';
                errorMessage.classList.remove('hide');
            // If user guessed
            } else {
                stopGame(`Opps!! <span class="controls__text">Wrong</span> Answer`)
            }
        } else {

            errorMessage.innerHTML = 'Empty or Invalid Input';
            errorMessage.classList.remove('hide');
        }
    };

    submitBtn.addEventListener('click', submitHandler);
    
};

// Start Game
const startHandler = () => {
    operatorQuestion = false;
    answerValue = '';
    errorMessage.innerHTML = '';
    errorMessage.classList.add('hide');
    controls.classList.add('hide');
    startBtn.classList.add('hide');
    questionGenerator();

};

startBtn.addEventListener('click', startHandler);


// Stop Game

const stopGame = (resultText) => {
    result.innerHTML = resultText;
    startBtn.innerText = 'Restart'
    controls.classList.remove('hide');
    startBtn.classList.remove('hide');
}
