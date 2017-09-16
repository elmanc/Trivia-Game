var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What was the first full length cgi movie?", "Which of these is not a name of one of the spice girls?", "Which nba team won the most titles in the 90s?", "Which group released the hit song Smells Like Teen Spirit?"];
var answerArray = [["a bugs life", "monsters inc", "toy story", "the lion king"], ["sporty spice", "fred spice", "scary spice", "posh spice"], ["new york knicks", "portland trialblazers", "los angeles lakers", "chicago bulls"], ["nirvana", "backstreet boys", "the offspring", "no doubt"]]; 
var correctAnswers = ["the lion king", "fred spice", "los angeles lakers", "nirvana"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");


$(document).ready(function() {

function initialScreen() {
startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
$(".mainArea").html(startScreen);
}

initialScreen();


$("body").on("click", ".start-button", function(event){
event.preventDefault();  
clickSound.play();
generateHTML();

timerWrapper();

}); 

$("body").on("click", ".answer", function(event){

clickSound.play();
selectedAnswer = $(this).text();
if(selectedAnswer === correctAnswers[questionCounter]) {


clearInterval(theClock);
generateWin();
}
else {

clearInterval(theClock);
generateLoss();
}
}); 

$("body").on("click", ".reset-button", function(event){
clickSound.play();
resetGame();
});

});  

function generateLossDueToTimeOut() {
unansweredTally++;
gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
$(".mainArea").html(gameHTML);
setTimeout(wait, 4000);  
}

function generateWin() {
correctTally++;
gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
$(".mainArea").html(gameHTML);
setTimeout(wait, 4000);  
}

function generateLoss() {
incorrectTally++;
gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
$(".mainArea").html(gameHTML);
setTimeout(wait, 4000); 
}

function generateHTML() {
gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
$(".mainArea").html(gameHTML);
}

function wait() {
if (questionCounter < 7) {
questionCounter++;
generateHTML();
counter = 30;
timerWrapper();
}
else {
finalScreen();
}
}

function timerWrapper() {
theClock = setInterval(thirtySeconds, 1000);
function thirtySeconds() {
if (counter === 0) {
clearInterval(theClock);
generateLossDueToTimeOut();
}
if (counter > 0) {
counter--;
}
$(".timer").html(counter);
}
}

function finalScreen() {
gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
$(".mainArea").html(gameHTML);
}

function resetGame() {
questionCounter = 0;
correctTally = 0;
incorrectTally = 0;
unansweredTally = 0;
counter = 30;
generateHTML();
timerWrapper();
}

