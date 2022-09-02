const start = document.getElementById('start');
const quiz = document.getElementById('quiz');
const question = document.getElementById('question');
const answerA = document.getElementById('A');
const answerB = document.getElementById('B');
const answerC = document.getElementById('C');
const answerD = document.getElementById('D');
const counter =  document.getElementById('counter');
const progress = document.getElementById('progress');
const scoreCon = document.getElementById('scoreContainer');
const result = document.getElementById('result');
const inputGroup = document.getElementById('input_group');
const highscoreCon = document.getElementById('highscoreContainer');
const cover = document.getElementById('cover');

const questions = [
    {
        question: "What does HTML stand for?",
        answerA: "HyperText Markup Language",
        answerB: "Cascading Style Sheets",
        answerC: "JavaScript",
        answerD: "Extensible HyperText Markup Language",
        correct: "A"
    },
    {
        question: "Webpage behavior is driven primarily by which language?",
        answerA: "CSS",
        answerB: "Java",
        answerC: "JavaScript",
        answerD: "HTML",
        correct: "C"
    },
    {
        question: "The look, or style, of a website is generally driven by which language?",
        answerA: "HTML",
        answerB: "CSS",
        answerC: "JavaScript",
        answerD: "R",
        correct: "B"
    },
    {
        question: "JavaScipt can be used for__?",
        answerA: "the front end",
        answerB: "the back end",
        answerC: "nothing!",
        answerD: "both the front end and back end",
        correct: "D"
    }
]

const lastQuestion = questions.length -1;
let currentQuestion = 0;
let score = 0;

function renderQuestion(){
    const q = questions[currentQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    answerA.innerHTML = q.answerA;
    answerB.innerHTML = q.answerB;
    answerC.innerHTML = q.answerC;
    answerD.innerHTML = q.answerD;
}

start.addEventListener("click", startQuiz);

function startQuiz(){
    start.style.display = "none";
    highscoreCon.style.display = "none";
    cover.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
};

function renderProgress(){
    for(let qI = 0; qI <= lastQuestion; qI++ ){
        progress.innerHTML += "<div class='prog' id=" + qI + "></div>";
    }
}

function checkAnswer(answer){
    if( answer == questions[currentQuestion].correct){
        score ++;
        answerIsCorrect();
    } else{
        answerisWrong();
    }
    count = 0;
    if(currentQuestion < lastQuestion){
        currentQuestion++;
        renderQuestion();
    } else {
        renderScore();
    }
};

function answerIsCorrect(){
    result.innerHTML = "<p>"+ "correct!" + "</p>";
    setTimeout(function(){
        result.innerHTML = '';
    }, 500);
};

function answerisWrong(){
    result.innerHTML = "<p>"+ "wrong!" + "</p>";
    setTimeout(function(){
        result.innerHTML = '';
    }, 500);
};

function renderScore(){
    quiz.style.display = "none";
    cover.style.display = "none";
    scoreCon.style.display = "block";

    let scorePerCent = Math.round(100 * score/questions.length);

    scoreCon.innerHTML = "<p>"+ "Nice Job! Your Score is "+ scorePerCent + "%</p>";

    scoreCon.innerHTML += "<label for='quizTakersName'>" + "your name is: " + "</label>";
    scoreCon.innerHTML += "<input type='text' name='quizTakersName' id='quizTakersName' placeholder='your name'>";
    scoreCon.innerHTML += "<button class='submit' id='submit'>submit</button>";
    const submit = document.getElementById('submit');
    const quizTakersName  = document.getElementById('quizTakersName');
    let quizTakerArray=[];
    function saveName(){
        let studentTest = 
        {quizTakersName : quizTakersName.value.trim(),
        quizTakersScore: scorePerCent};
        console.log(studentTest);

        quizTakerArray.push(studentTest);
        localStorage.setItem("quizTakerArray", JSON.stringify(quizTakerArray));
    };

    submit.addEventListener("click", function(event) {
        event.preventDefault();
    

        saveName();
        renderHighscore();
    });
};

function renderHighscore(){
    quiz.style.display = "none";
    cover.style.display = "none";
    scoreCon.style.display = "none";
    highscoreCon.style.display = "block";

    let jsonArray = localStorage.getItem('quizTakerArray');
    let retrievedObject = JSON.parse(jsonArray);
    console.log(retrievedObject);
    highscoreCon.innerHTML="<p> Name: " + retrievedObject[0].quizTakersName + "</p><p> Percentage: " + retrievedObject[0].quizTakersScore +"</p>";

    highscoreCon.innerHTML+= '<button class="restart" id="restart">Restart Quiz</button>';
    const restart = document.getElementById('restart');

    restart.addEventListener('click', function(event) {
        event.preventDefault();
        score = 0;
        currentQuestion = 0;
        startQuiz();
    });
};

