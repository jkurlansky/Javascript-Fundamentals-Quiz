// Question Array for quiz bank

var myQuestions = [
    {
        question: 'Which of the following keywords is used to define a variable in Javascript?', 
        answers: ["var","let","Both var and let","None of the above"],
        correctAnswer: "Both var and let"
    },

    {
        question: 'Which of the following methods is used to access HTML elements using Javascript?',
        answers: ['getElementbyID()','getElementsByClassName()','Both A and B','None of the above'],
        correctAnswer: "Both A and B"
    },

    {
        question: 'Which function is used to serialize an object into a JSON string in Javascript',
        answers: ['stringify()','parse()','convert()','None of the above'],
        correctAnswer: "stringify()"
    },
]

//global objects needed for functions
var quizDisplay = document.getElementById("question-container");
var timeEl = document.getElementById("timer");
var timeLeft = 60;
var startEl = document.getElementById("start");
var questionElement = document.getElementById('question');
var score = 0;
var counter = 0;


// quiz question progression and answer selection

startEl.addEventListener("click", function () {
    document.getElementById("startDiv").style.display = "none";
    var timeInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = "Time: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timeInterval);
         
        }
    }, 1000);
    console.log(timeEl);
 
    showQuestion ();

});



// check answers to quiz questions

function checkAnswer(){
    var uAns = this.value;
    console.log(myQuestions[counter].correctAnswer)
    if(uAns === myQuestions[counter].correctAnswer)
    {
        score = score + 10;
        counter++;
        if(counter === myQuestions.length)
        {
            endQuiz();
        }
        else
        {
            showQuestion();
        }

    }
    else{
        timeLeft = timeLeft - 5;
        counter++;
        if(counter === myQuestions.length)
        {
            endQuiz();
        }
        else
        {
            showQuestion();
        }
    }
}

// show questions sequentially
function showQuestion() {
    document.getElementById("question").innerHTML = "";
   var h3 = document.createElement("h3");
   h3.innerHTML = myQuestions[counter].question;
   document.getElementById("question").appendChild(h3);
   for(var i=0; i<myQuestions[counter].answers.length;i++)
   {
    var btn = document.createElement("button");
    btn.setAttribute("value", myQuestions[counter].answers[i])
    btn.innerHTML = myQuestions[counter].answers[i];
    btn.onclick = checkAnswer;
    document.getElementById("question").appendChild(btn);
   }
   
};

// remove all questions and let user submit initials to post their score
function endQuiz () {
    document.getElementById("timer").style.display = "none";
    document.getElementById("question").style.display = "none";
    var endTitle = document.createElement("h3");
    var submitBtn = document.createElement("button");
    var playerName = document.createElement("textarea");
    endTitle.innerHTML = "Your score is " + score + ". Enter your initials to save your score:";
    submitBtn.innerHTML = "Submit";
    document.getElementById("user-score").appendChild(endTitle);
    document.getElementById("user-score").appendChild(playerName);
    document.getElementById("user-score").appendChild(submitBtn);
    submitBtn.addEventListener("click", function (event){
        event.preventDefault();
        localStorage.setItem("score", score);
        localStorage.setItem("initials", playerName.value);
        console.log(localStorage.score);
        showScore ();
    })
}

// function to pull initials and score from local storage and display on page
function showScore() {
    var lineBreak = document.createElement("br");
    var userScore = document.createElement("h3");
    var storageScore = localStorage.getItem("score");
    var storageInitials = localStorage.getItem("initials");
    userScore.innerHTML = storageInitials + ": " + storageScore
    document.getElementById("user-score").appendChild(lineBreak);
    document.getElementById("user-score").appendChild(userScore);
}
