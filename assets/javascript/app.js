$(document).ready(function() {

//object array for question set
var questionSet=[
	{ question: "Which of these U.S. Presidents is not represented on Mount Rushmore?", 
	option1: "Theodore Roosevelt", 
	option2: "John Adams", 
	option3: "George Washington",
	option4: "Abraham Lincoln", 
	answerKey: "option2", 
	answerName: "John Adams",
	picture: "assets/images/john_adams.jpg",
	infoSource: "https://www.nps.gov/Moru/index.htm" // added these in as placeholders thinking I might be able to create a 
		// mid-way timer alert that presented an authoritative information source as a hint
	}, 
	
	{ question: "Who is the tallest President in U.S. History?", 
	option1: "Barack Obama",
	option2: "Thomas Jefferson", 
	option3: "Abraham Lincoln", 
	option4: "George H.W. Bush", 
	answerKey: "option3", 
	answerName: "Abraham Lincoln",
	picture: "assets/images/abraham_lincoln.jpg",
	infoSource: "https://www.nist.gov/pml/weights-and-measures/presidents-and-measurements"
    }, 

	{ question: "Which President was born on the 4th of July?", 
	option1: "Andrew Jackson", 
	option2: "Millard Fillmore", 
	option3: "Calvin Coolidge", 
	option4: "Herbert Hoover", 
	answerKey: "option3", 
	answerName: "Calvin Coolidge",
	picture: "assets/images/calvin_coolidge.jpg",
	infoSource: "http://www.infoplease.com/spot/prestrivia1.html"
	},

	{ question: "Which President was the first to name a woman to a cabinet position?", 
	option1: "Franklin D. Roosevelt", 
	option2: "Lyndon B. Johnson", 
	option3: "Woodrow Wilson", 
	option4:"Harry Truman", 
	answerKey: "option1", 
	answerName: "Franklin D. Roosevelt",
	picture: "assets/images/franklin_d_roosevelt.jpg",
	infoSource: "http://www.smithsonianmag.com/smithsonian-institution/ten-fascinating-bits-of-presidential-trivia-180954227/"
	},

	{ question: "Which President was the first to travel abroad while in office?", 
	option1: "George Washington", 
	option2: "Theodore Roosevelt", 
	option3: "William Taft", 
	option4: "Ulysses S. Grant", 
	answerKey: "option2", 
	answerName: "Theodore Roosevelt",
	picture: "assets/images/theodore_roosevelt.jpg", 
	infoSource: "http://news.nationalgeographic.com/news/2004/08/0823_040823_presidentialtrivia_2.html"
	},

	{ question: "Under which President's administration was the first official White House website developed?", 
	option1: "George H.W. Bush", 
	option2: "Bill Clinton", 
	option3: "George W. Bush", 
	option4: "Ronald Reagan", 
	answerKey: "option2", 
	answerName: "Bill Clinton",
	picture: "assets/images/bill_clinton.jpg",
	infoSource: "https://www.whitehousehistory.org/questions/what-are-some-interesting-facts-about-presidents-first-ladies"
	},

	{ question: "Which of these Presidents held, but was never actually elected to, the office of President?", 
	option1: "Gerald Ford", 
	option2: "Harry Truman", 
	option3: "Andrew Johnson", 
	option4: "Martin Van Buren", 
	answerKey: "option1", 
	answerName: "Gerald Ford",
	picture: "assets/images/gerald_ford.jpg",
	infoSource: "http://www.history.com/topics/us-presidents/presidential-election-facts"
	},
	
	{ question: "Who was the first sitting President to get married in the White House?", 
	option1: "James K. Polk", 
	option2: "Grover Cleveland", 
	option3: "James Monroe", 
	option4: "Chester Arthur", 
	answerKey: "option2", 
	answerName: "Grover Cleveland",
	picture: "assets/images/grover_cleveland.jpg",
	infoSource: "http://www.history.com/this-day-in-history/grover-cleveland-gets-married-in-the-white-house"
	}
];  // end of questionSet array

var currentQuestion; 
var numberCorrect=0;
var numberIncorrect=0;
var numberUnanswered=0;  
var clicked=false;
var time; 
var count=0; 
var countdown; 
var stopCoundown; 


function scoreboard() {
		$("#image").empty(); 

		$("#question").html("Game Over!"); 	
		$("#game-results").html("Correct answers\u2014" + numberCorrect + 
				"/ Incorrect answers\u2014 "+numberIncorrect + 
				"/ Not answered\u2014" + numberUnanswered); 
		var restartBtn=$("<button>"); 
		restartBtn.attr("data-name", "Restart Game?");
		$("#restart-button").html(restartBtn); 
		$(restartBtn).text("Restart Game?"); 
		count=0; 
}


function reStart() {
	$("#image").empty(); 
		$("#question").empty()
		$("#game-results").empty()
		$("#timer").empty(); 
		$("#restart-button").empty();
		askQuestion();
		numberUnanswered=0;
		numberIncorrect=0;
		numberCorrect=0; 

}

function askQuestion() {		
		$("#image").empty(); 
		$("#start").empty(); 			
		$("#question").html(questionSet[count].question); 
		$("#option1").html(questionSet[count].option1); 
		$("#option2").html(questionSet[count].option2); 
		$("#option3").html(questionSet[count].option3); 
		$("#option4").html(questionSet[count].option4); 
		runTime();  
}

function nextQuestion() {		
		$("#image").empty(); 
		$("#start").hide(); 			
		$("#question").html(questionSet[count].question); 
		$("#option1").html(questionSet[count].option1); 
		$("#option2").html(questionSet[count].option2); 
		$("#option3").html(questionSet[count].option3); 
		$("#option4").html(questionSet[count].option4); 
		runTime(); 
}
		
function correctAnswer() {
			$("#question").html("Correct! The answer is " + questionSet[count].answerName); 
			$(".option").empty(); 
			var imageUrl=questionSet[count].picture; 
			var presImage=$("<img>"); 
			presImage.attr("src", imageUrl); 
			$("#image").html(presImage); 
			count++; 
}

function incorrectAnswer() {
	$("#question").html("Incorrect. The correct answer is " + questionSet[count].answerName); 
			$(".option").empty(); 
			var imageUrl=questionSet[count].picture; 
			var presImage=$("<img>"); 
			presImage.attr("src", imageUrl); 
			$("#image").html(presImage); 
			count++
}
function timeUp() {
		$("#question").html("Time's Up! The correct answer is " + questionSet[count].answerName); 
			$(".option").empty(); 
			var imageUrl=questionSet[count].picture; 
			var presImage=$("<img>"); 
			presImage.attr("src", imageUrl); 
			$("#image").html(presImage); 
			count++
}

//defining the timer functions
function runTime() {
	time=10; 
	$("#timer").html("Time Left: " + time +" seconds"); 
	countdown = setInterval(function() {
    	time=time-1; 
    	$("#timer").html("Time Left: " + time +" seconds");   

   		if (time <= 0) {
        	clearInterval(countdown);  
        	timeUp();
        	numberUnanswered++;
			clicked=false;
			if (count<questionSet.length) {
			setTimeout(nextQuestion, 2000)
			} else { setTimeout(scoreboard, 2000)}; 
    	}
	}, 1000); //end of the countdown/setInterval function
}; //end of the runtime function

function stopTime() {
	clearInterval(countdown); 
	$("#timer").empty(); 
}; 

$("#start-button").on("click", askQuestion); 
$("#restart-button").on("click", reStart); 



$(".option").on("click", function() {
			if (clicked===false) {
			var answerChoice=$(this).attr("id");  
			clicked=true; 		 
			} else {
			return }; 


		if (answerChoice===questionSet[count].answerKey) {	
			stopTime(); 		
			correctAnswer(); 
			numberCorrect++;
			clicked=false; 
			if (count<questionSet.length) {
			setTimeout(nextQuestion, 2000)
			} else { setTimeout(scoreboard, 2000)}; 	
		} 

		else if (answerChoice!=questionSet[count].answerKey){
			stopTime(); 
			incorrectAnswer(); 
			numberIncorrect++; 
			clicked=false; 
			if (count<questionSet.length) {
			setTimeout(nextQuestion, 2000)
			} else { setTimeout(scoreboard, 2000)}; 
		
		} 
	}); //end of on click
		

		



}) //end of the document.ready function