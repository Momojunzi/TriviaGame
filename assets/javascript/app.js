$('document').ready(function() {

    var questions = [

        {
            question: "What is your name?",
            answers: ["Launcelot", "Sir Robin", "Bedevere", "Arthur King of the Britons"],
            correctAnswer: "Arthur King of the Britons",
            gif: "bDWVjClPLRvTa"
        },
        {
            question: "What is your favorite color?",
            answers: ["red", "blue", "green", "yellow"],
            correctAnswer: "blue",
            gif: "8shYYsJxDI5rO"
        },
        {
            question: "What is the capitol of Assyria?",
            answers: ["London", "Cairo", "Baghdad", "Nineveh"],
            correctAnswer: "Nineveh",
            gif: "WIg8P0VNpgH8Q"
        },
        {
            question: "What is airspeed velocity of and unladen swallow?",
            answers: ["10km/h", "5km/h", "100km/h", "What do you mean? An African or a European swallow?"],
            correctAnswer: "What do you mean? An African or a European swallow?",
            gif: "pjSnEe2wTayAw"
        },
        {
            question: "What is your quest?",
            answers: ["to die", "to sleep", "to sleep, perchance to dream", "to seek the holy grail"],
            correctAnswer: "to seek the holy grail",
            gif: "yyzXlOGKc2b5K"
        },
        {
            question: "what have I got in my pocket?",
            answers: ["handses", "a knife", "string or nothing", "a ring"],
            correctAnswer: "a ring",
            gif: "12tG0wsJCOAjhm"
        },
    ];
    
    var questionCounter = 0;
    var timerCount = 15;
    var correct;
    var answered = false;
    var countdown;
    var playerAnswer;
    var correctCount = 0;
    var wrongCount = 0;
    
    startGame();
   


    function createQuestion() {
        if(questionCounter == questions.length) {
            $('#game-page').css({display: 'none'});
            $('#end-page').css({display:"block"});
            $('#correct').html('correct answers: ' + correctCount);
            $('#wrong').html('wrong answers: ' + wrongCount);
        }
        var currentQuestion = questions[questionCounter];
       
        $('#question-div').html('<h2>' + currentQuestion.question + '</h2>');
        $('#answer-div').empty();
        $('#gif-div').empty();

        for (var i=0; i<currentQuestion.answers.length; i++) {
            var answer = currentQuestion.answers[i];
            correct = currentQuestion.correctAnswer;
            var answerDiv = '<div class="answer-wrapper"><h4 class="answer" id="exampleRadios1" value="' + answer + '">' + answer + '</h4></div>'
            $('#answer-div').append(answerDiv);
        }
        
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
            answered = true; 

            if(answered && playerAnswer !== correct) {
                wrongCount++;
                wrongAnswer();
            }
            if(playerAnswer === correct) {
                correctCount++;
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
         getGif('#gif-div');
        answered = false;
        questionCounter++;
        timerCount = 15;
        if(questionCounter == questions.length) {
            // $('#game-page').css({display: 'none'});
            // $('#end-page').css({display:'block'});
            // $('#correct').html('correct answers: ' + correctCount);
            // $('#wrong').html('wrong answers: ' + wrongCount);
            // questionCounter = questions.length -1;
            // getGif();
            endGame();
        }else {
             setTimeout(createQuestion, 5000);
        }
       
    }

    function corrAnswer() {
        var correctContent = '<h3>Your guess was correct!</h3>';
        var answer = '<h4>' + correct + '</h4>';
        clearInterval(countdown);
        $('#question-div').html(correctContent);
        $('#answer-div').html(answer);
         getGif('#gif-div');
        answered = false;
        questionCounter++;
        timerCount = 15;

         if(questionCounter == questions.length) {
            // $('#game-page').css({display: 'none'});
            // $('#end-page').css({display:'block'});
            // $('#correct').html('correct answers: ' + correctCount);
            // $('#wrong').html('wrong answers: ' + wrongCount);
            endGame();
        }else {

            setTimeout(createQuestion, 5000);
        }
    }

    function startGame() {
        $('#start-button').click(function(){
            $('#start-page').css({display:"none"});
            $('#game-page').css({display: "block"});
            createQuestion();
        });
    }

    function endGame() {
        
        $('#game-page').css({display: 'none'});
        $('#end-page').css({display:'block'});
        $('#correct').html('correct answers: ' + correctCount);
        $('#wrong').html('wrong answers: ' + wrongCount);
        questionCounter = questions.length -1;
        getGif('#end-gif');
        reset();
    }

    function getGif(parent) {
        var gifId = questions[questionCounter].gif;

        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/' + gifId + '?api_key=fcbade029e424a97adcc1b0110ad18c8',
            method: "GET"
        }).done(function(response) {
            console.log(response);
            $(parent).html('<img class="img-fluid gif-img" src=' + response.data.images.downsized.url + '>').css('display', 'block');
            
            console.log($('img').attr('src'));
        });
    }

    function reset() {
        $('#reset').on('click', function() {
            location.reload();
        });
    }
});