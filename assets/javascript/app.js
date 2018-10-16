//list of all the questions and answers
var triviaquestion = [{
	question: "What color is a normal Chocobo?",
	answerList: ["Black", "White", "Red", "Yellow"],
	answer: 3
},{
	question: "What group was Vincent Valentine a part of?",
	answerList: ["The Turks", "Deepground", "AVALANCHE", "SOLDIER"],
	answer: 0
},{
	question: "Which character is a secret character?",
	answerList: ["Barret", "Yuffie", "Red XIII", "Zack"],
	answer: 1
},{
	question: "Who is Zack?",
	answerList: ["A villain", "Cloud's father", "Cloud's mentor", "Shinra Employee"],
	answer: 2
},{
	question: "Who is Sephiroth's Mother?",
	answerList: ["Jessie", "Tifa", "Aerith", "Jenova"],
	answer: 3
},{
	question: "How many discs was Final Fantasy 7",
	answerList: ["1", "3", "2", "4"],
	answer: 3
},{
	question: "What is the strongest summon in Final Fantasy 7?",
	answerList: ["Choco Mog", "Knights of The Round", "Ifrit", "Titan"],
	answer: 1
},{
	question: "What is Cloud's final limit break?",
	answerList: ["Omnislash", "Blade beam", "Braver", "Calamity"],
	answer: 0
},{
	question: "Who was Barret's best friend?",
	answerList: ["Squal", "Cloud", "Dyne", "Reno"],
	answer: 2
},{
	question: "Where did Aerith die?",
	answerList: ["Temple of the Ancients", "Midgar", "Golden Saucer", "City of the Ancients"],
	answer: 0
},{
	question: "Which game is NOT a game you can play in the Golden Saucer?",
	answerList: ["G-Bike", "Super Dunk", "Tetra Master", "Mog's House"],
	answer: 2
},{
	question: "Who said 'if this is a dream, dont wake me up'?",
	answerList: ["Vincent", "Cloud", "Aerith", "Barret"],
	answer: 1
},{
	question: "Who transforms when they use a limit break?",
	answerList: ["Cait Sith", "Vincent", "Red xIII", "Cid"],
	answer: 1
},{
	question: "What is the name of the air ship in Final Fantasy 7?",
	answerList: ["Highwind", "Shera", "Ragnarok", "Hilda Garde"],
	answer: 0
},{
	question: "Who is not a character in Final Fantasy 7?",
	answerList: ["Professor Hojo", "Reno", "Seifer", "Don Corneo"],
	answer: 2
}];
// gifs corresponding with each question and messages
var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "that's right!",
	incorrect: "wrong, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaquestion.length);
	$('.question').html('<h2>' + triviaquestion[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaquestion[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}

	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}
function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}



function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerMessage = triviaquestion[currentQuestion].answerList[triviaquestion[currentQuestion].answer];
	var rightAnswer = triviaquestion[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	if((userSelect == rightAnswer) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswer) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerMessage);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerMessage);
		answered = true;
	}
	
	if(currentQuestion == (triviaquestion.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
