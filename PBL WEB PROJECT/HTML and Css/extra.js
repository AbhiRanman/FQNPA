const questions = [
    {
        question: "Do you see any kinds of irregular spots on the food item (They are mostly greenish, or blue, and pink in certain dairy products.)",
        answers: [
            { text: "yes", correct: 0 },
            { text: "no", correct: 2 },
            { text: "Unsure", correct: 1 },
        ]
    },
    {
        question: "Do you smell an unusual smell, as if the food item is rotting, or any kind of weird smell?",
        answers: [
            { text: "yes", correct: 0 },
            { text: "no", correct: 2 },
            { text: "Unsure", correct: 1 },
        ]
    },
    {
        question: "Do you feel the food item squishy, or unusually soft?",
        answers: [
            { text: "yes", correct: 0 },
            { text: "no", correct: 2 },
            { text: "Unsure", correct: 1 },
        ]
    },
    {
        question: "Was the food item not kept in the refrigerator from the day that it was bought?(Note fruits don't count unless it is kept 3-5 days or more outside, which you can say unsure)",
        answers: [
            { text: "yes", correct: 0 },
            { text: "no", correct: 2 },
            { text: "Unsure", correct: 1 },
        ]
    },
    {
        question: "Is the food item older than 1-2 weeks?",
        answers: [
            { text: "yes", correct: 0 },
            { text: "no", correct: 2 },
            { text: "Unsure", correct: 1 },
        ]
    },
    {
        question: "Have you experienced food poisoning, or food-related diseases in the span of 1 month?",
        answers: [
            { text: "yes", correct: 0 },
            { text: "no", correct: 2 },
            { text: "Unsure", correct: 1 },
        ]
    },
    {
        question: "While dealing with the food, do you use unclean hands or untensils?",
        answers: [
            { text: "yes", correct: 0 },
            { text: "no", correct: 2 },
            { text: "Unsure", correct: 1 },
        ]
    },
    {
        question: "Is there a due date, and if so, has it passed(If there is no date, then select unsure)?",
        answers: [
            { text: "yes", correct: 0 },
            { text: "no", correct: 2 },
            { text: "Unsure", correct: 1 },
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none"; // Hide initially
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    answerButton.innerHTML = ""; // Clear previous buttons
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer));
        answerButton.appendChild(button);
    });
    nextButton.style.display = "none"; // Hide Next button until an answer is selected
}

function selectAnswer(answer) {
    score += answer.correct; // Adjusted scoring system
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    let totalScore = questions.length * 2;
    let percentage = ((score / totalScore) * 100).toFixed(2);
    let message = "";

    if (percentage > 80) {
        message = "The food is all right to eat.";
    } else if (percentage >= 60 && percentage <= 80) {
        message = "Caution: Heat well before eating, or cut open the food item to inspect further. If still Unsure, don't risk it...";
    } else {
        message = "Throw it away! Eat at your own risk...";
    }

    questionElement.innerHTML = `Your score: ${score} out of ${totalScore} (${percentage}%)<br>${message}`;
    answerButton.innerHTML = ""; // Clear the answer buttons
    nextButton.innerHTML = "Restart"; // Option to restart
    nextButton.style.display = "block"; // Show restart button
}

nextButton.addEventListener("click", () => {
    startQuiz();
});

startQuiz();
