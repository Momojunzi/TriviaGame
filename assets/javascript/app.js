$('document').ready(function() {

    var questions = [

        {
            question: "What is my name?",
            answers: ["Matthew", "Mark", "Luke", "John"],
            correctAnswer: "Mark"
        },
        {
            question: "What is my favorite color?",
            answers: ["red", "blue", "green", "yellow"],
            correctAnswer: "blue"
        },
        {
            question: "What is the capitol of Assyria?",
            answers: ["London", "Cairo", "Baghdad", "Nineveh"],
            correctAnswer: "Nineveh"
        },
        {
            question: "What is airspeed velocity of and unladen swallow?",
            answers: ["10km/h", "5km/h", "100km/h", "what do you mean? An African or a European swallow?"],
            correctAnswer: "What do you mean? An African or a European swallow?"
        },
        {
            question: "What is your quest?",
            answers: ["to die", "to sleep", "to sleep, perchance to dream", "to seek the holy grail"],
            correctAnswer: "to seek the holy grail"
        },
        {
            question: "what have I got in my pocket?",
            answers: ["handses", "a knife", "string or nothing", "a ring"],
            correctAnswer: "a ring"
        },
    ];

    var questionCounter = 0;
    var timerCount = 15;
    var correct;
    var answered = false;
    var countdown;
    var playerAnswer;
    
    createQuestion();


    function createQuestion() {
        var currentQuestion = questions[questionCounter];
       
        $('#question-div').html('<h2>' + currentQuestion.question + '</h2>');
        $('#answer-div').empty();

        for (var i=0; i<currentQuestion.answers.length; i++) {
            var answer = currentQuestion.answers[i];
            correct = currentQuestion.correctAnswer;
            var answerDiv = '<div class="answer-wrapper"><h4 class="answer" id="exampleRadios1" value="' + answer + '">' + answer + '</h4></div>'
            $('#answer-div').append(answerDiv);
        }
        console.log(correct, answer);
        createTimer();
    }

    function createTimer() {
        
        countdown = setInterval(function() {
            timerCount --;

            $('#timer-div').html('<h4>Time Remaining ' + timerCount + ' seconds</h4>');

            
            if(timerCount <= 0){
               wrongAnswer();
            }
        }, 1000);

        $('.answer').on('click', function(event) {
            playerAnswer = $(this).attr('value');
            console.log(typeof(correct), typeof(playerAnswer));
            answered = true; 

            if(answered && playerAnswer !== correct) {
                console.log(correct, playerAnswer);
                wrongAnswer();
            }
            if(playerAnswer === correct) {
                console.log(correct, playerAnswer);
                corrAnswer();
            }
        });
    }

    function wrongAnswer(){
        var nextUpCount = 5;
        var lostContent = '<h3>Your guess was wrong!</h3>';
        var answer = '<h4>The correct answer was ' + correct + '</h4>';
        var nextUpContent = '<h4>Next question in ' + nextUpCount + ' seconds</h4>';
        clearInterval(countdown);
        $('#question-div').html(lostContent);
        $('#answer-div').html(answer);
        answered = false;
        questionCounter++;
        timerCount = 15;
        console.log(questionCounter, timerCount);
        setTimeout(createQuestion, 5000);
    }

    function corrAnswer() {
        var correctContent = '<h3>Your guess was correct!</h3>';
        var answer = '<h4>' + correct + '</h4>';
        clearInterval(countdown);
        $('#question-div').html(correctContent);
        $('#answer-div').html(answer);
        answered = false;
        questionCounter++;
        timerCount = 15;
        console.log(questionCounter, timerCount);
        setTimeout(createQuestion, 5000);
    }


});