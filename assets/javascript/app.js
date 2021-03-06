$("document").ready(function() {
    //Array for Question Count
    var triviaQuestions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    //Objects for Questions
    triviaQuestions[0] = {
        displayQuestion : "What year was Galaga released?",
        correctAnswer : "1981",
        incorrectAnswers : ["1990", "1978", "1985"],
        allAnswers: ["1981", "1983", "1978", "1985"]
    };

    triviaQuestions[1] = {
        displayQuestion : "What year was Centipede released?",
        correctAnswer : "1981",
        incorrectAnswers : ["1978", "1978", "1985"],
        allAnswers: ["1980", "1985", "1978", "1981"]
    };

    triviaQuestions[2] = {
        displayQuestion : "What year was Pac-Man released?",
        correctAnswer : "1980",
        incorrectAnswers : ["1990", "1978", "1985"],
        allAnswers: ["1984", "1981", "1980", "1985"]
    };

    triviaQuestions[3] = {
        displayQuestion : "What year was Street Fighter released?",
        correctAnswer : "1994",
        incorrectAnswers : ["1990", "1978", "1985"],
        allAnswers: ["1994", "1990", "1978", "1985"]
    };

    triviaQuestions[4] = {
        displayQuestion : "What year was Mortal Kombat released?",
        correctAnswer : "1992",
        incorrectAnswers : ["1990", "1978", "1985"],
        allAnswers: ["1991", "1990", "1992", "1994"]
    };

    triviaQuestions[5] = {
        displayQuestion : "What year was Rampage released?",
        correctAnswer : "1986",
        incorrectAnswers : ["1990", "1978", "1985"],
        allAnswers: ["1986", "1990", "1989", "1985"]
    };

    triviaQuestions[6] = {
        displayQuestion : "What year was Asteroids released?",
        correctAnswer : "1979",
        incorrectAnswers : ["1990", "1978", "1985"],
        allAnswers: ["1979", "1980", "1978", "1982"]
    };

    triviaQuestions[7] = {
        displayQuestion : "What year was Tempest released?",
        correctAnswer : "1981",
        incorrectAnswers : ["1990", "1978", "1985"],
        allAnswers: ["1979", "1983", "1978", "1981"]
    };

    triviaQuestions[8] = {
        displayQuestion : "What year was Donkey Kong released?",
        correctAnswer : "1981",
        incorrectAnswers : ["1990", "1978", "1985"],
        allAnswers: ["1985", "1981", "1984", "1986"]
    };

    triviaQuestions[9] = {
        displayQuestion : "What year was Dance Dance Revolution(DDR) released?",
        correctAnswer : "1998",
        incorrectAnswers : ["1990", "1978", "1985"],
        allAnswers: ["2002", "1997", "1998", "2000"]
    };

    //Variables for Game
    var gameButtons = ["Start", "Skip", "Reset"];
    var radioButtonSelected;

    var gameStarted = false;
    var startButtonEnabled = true;
    var skipButtonEnabled = false;
    var resetButtonEnabled = false;

    var countdownEnabled = false;
    var countdownTimer;
    const maxTime = 20;
    var timeRemaining = maxTime;

    var questionCounter = 0;
    var questionsCorrect = 0;
    var questionsIncorrect = 0;

    //Sets Up The Page
    function createGameElements() {
        var gameElement = $("#game");
        $("header").append($("<h1 id='header-title'>"));
        gameElement.append("<section id='question-element'>");
        $("#question-element").text("Arcade Edition");
        gameElement.append("<section id='game-score'>");
        $("#game-score").text("Game Score: -");
        gameElement.append("<section id='question-timer'>");
        $("#question-timer").text("Time Remaining: -");
        gameElement.append("<section id='answer-area'>");
        $("#answer-area").text("Click Start Button to Begin the Game");
        gameElement.append("<section id='results'>");
        gameElement.append("<section id='button-area'>");
        $("#header-title").html("Trivia Game");
    }

    function createButtons() {
        for (var i = 0; i < gameButtons.length; i++) {
            var playerButton = $("<button>");
            playerButton.addClass("game-button");
            playerButton.attr("id", gameButtons[i].toLocaleLowerCase() + "-button");
            playerButton.attr("button-name", gameButtons[i]);
            playerButton.text(playerButton.attr("button-name"));
            $("#button-area").append(playerButton);
        }
    }

    function gameLogic() {
        $("#question-element").html("");
        $("#game-score").html("");
        $("#game-score").append("<div id='correct'>Correct: 0</div>");
        $("#game-score").append("<div id='incorrect'>Incorrect: 0</div>");
        loadQuestion();
    }

    //This is what makes the game work
    function loadQuestion() {
        $("#question-element").append($("<div id='current-question'></div>"));
        $("#current-question").append("Question #" + (questionCounter + 1) + ": <br>");
        $("#current-question").append(triviaQuestions[questionCounter].displayQuestion);
        loadAnswers();
        questionCounter++;
        
    }

    function checkAnswer() {
        if (questionCounter < triviaQuestions.length) {
            if (radioButtonSelected === triviaQuestions[(questionCounter - 1)].correctAnswer) {
                stopTimer();
                alert("You got it right!");
                questionsCorrect++;
                $("#correct").html("Correct: " + questionsCorrect);
                clearGameSpace();
                loadQuestion();
            }
            else {
                stopTimer();
                alert("You got it wrong! The correct answer was: " + triviaQuestions[(questionCounter - 1)].correctAnswer);
                questionsIncorrect++;
                $("#incorrect").html("Incorrect: " + questionsIncorrect);
                clearGameSpace();
                loadQuestion();
            }
        }
        else if (questionCounter === triviaQuestions.length) {
            if (radioButtonSelected === triviaQuestions[(questionCounter - 1)].correctAnswer) {
                stopTimer();
                alert("You got it right!");
                questionsCorrect++;
                $("#correct").html("Correct: " + questionsCorrect);
                clearGameSpace();
                $("#answer-area").html("Click Reset Button to Reset the Game.");
                $("#question-timer").text("Time Remaining: -");
                $("#question-element").text("Arcade Edition");
                calculateScore();
                resetGame();
            }
            else {
                stopTimer();
                alert("You got it wrong! The correct answer was: " + triviaQuestions[(questionCounter - 1)].correctAnswer);
                questionsIncorrect++;
                $("#incorrect").html("Incorrect: " + questionsIncorrect);
                clearGameSpace();
                $("#answer-area").html("Click Reset Button to Reset the Game.");
                $("#question-timer").text("Time Remaining: -");
                $("#question-element").text("Arcade Edition");
                calculateScore();
                resetGame();
            }
        }
    }

    function loadAnswers() {
        for (var i = 0; i < triviaQuestions[questionCounter].allAnswers.length; i++) {
            var answerToQuestion = triviaQuestions[questionCounter].allAnswers[i];

            $("#answer-area").append("<input type='radio' name='current-question-choice' value='" + answerToQuestion + "' id='" + i + "-answer-" + answerToQuestion + "'><label for='" + answerToQuestion + "'>" + answerToQuestion + "</label><br>");
        }
        countdownEnabled = false;
        startTimer();
        $("input[type=radio][name=current-question-choice]").on("change", function() {
            radioButtonSelected = $(this).attr("value");
            checkAnswer();
        });
    }

    function startTimer() {
        if (countdownEnabled === false) {
            countdownTimer = setInterval(subtractTime, 1000);
            countdownEnabled = true;
        }
    }

    function subtractTime() {
        timeRemaining--;
        $("#question-timer").html("Time Remaining: " + timeRemaining + " seconds.");
        if (timeRemaining === 0) {
            stopTimer();
            countdownEnabled = false;
            timeRemaining = maxTime;
            alert("You should of guessed! The correct answer was: " + triviaQuestions[(questionCounter - 1)].correctAnswer);
            questionsIncorrect++;
            $("#incorrect").html("Incorrect: " + questionsIncorrect);
            clearGameSpace();
            if (questionCounter < triviaQuestions.length) {
                loadQuestion();
            }
        }
        else if ((timeRemaining === 0) && (questionCounter === triviaQuestions.length)) {
            stopTimer();
            countdownEnabled = false;
            timeRemaining = maxTime;
            alert("You should of guessed! The correct answer was: " + triviaQuestions[(questionCounter - 1)].correctAnswer);
            $("#incorrect").html("Incorrect: " + questionsIncorrect);
            skipButtonEnabled = false;
            clearGameSpace();
            calculateScore();
            resetGame();
            $("#answer-area").html("Click Reset Button to Reset the Game.");
            $("#question-timer").text("Time Remaining: -");
            $("#question-element").text("Arcade Edition");
            }
        }

    function stopTimer() {
        clearInterval(countdownTimer);
        countdownEnabled = false;
        timeRemaining = maxTime;
    }

    function clearGameSpace() {
        $("#question-element").html("");
        $("#answer-area").html("");
    }

    function resetGame() {
        questionsCorrect = 0;
        questionsIncorrect = 0;
        startButtonEnabled = true;
        skipButtonEnabled = false;
        resetButtonEnabled = false;
        gameStarted = false;
        questionCounter = 0;
        stopTimer();
        $("#answer-area").html("");
    }

    function calculateScore() {
        var scorePercentage = 0;
        scorePercentage = questionsCorrect / triviaQuestions.length;
        console.log(scorePercentage);
        if (scorePercentage >= .7) {
            alert("You scored a " + scorePercentage.toString().replace("0.", "") + "0%.  You know your stuff!")
        }
        else if (scorePercentage < .7) {
            alert("You scored a " + scorePercentage.toString().replace("0.", "") + "0%.  Better luck next time.")
        }
        else if (scorePercentage === 1) {
            alert("You scored a 100%.  You are a arcade machine...literally!!!");
        }

    }

    //When the page Loads (Interface)
    createGameElements();
    createButtons();

    //Interactivity
    $("#start-button").on("click", function() {
        if (gameStarted === false) {
            resetGame();
            gameStarted = true;
            skipButtonEnabled = true;
            resetButtonEnabled = true;
            gameLogic();
        }
    });
    $("#skip-button").on("click", function() {
        if (questionCounter === triviaQuestions.length) {
            alert("You should of guessed! The correct answer was: " + triviaQuestions[(questionCounter - 1)].correctAnswer);
                $("#incorrect").html("Incorrect: " + questionsIncorrect);
                clearGameSpace();
                $("#answer-area").html("Click Reset Button to Reset the Game.");
                $("#question-timer").text("Time Remaining: -");
                $("#question-element").text("Arcade Edition");
                stopTimer();
                calculateScore();
                resetGame();
        }
        if(skipButtonEnabled === true) {
            if (questionCounter < triviaQuestions.length) {
                alert("You should of guessed! The correct answer was: " + triviaQuestions[(questionCounter - 1)].correctAnswer);
                questionsIncorrect++;
                $("#incorrect").html("Incorrect: " + questionsIncorrect);
                clearGameSpace();
                stopTimer();
                loadQuestion();
            }
            else if (questionCounter === triviaQuestions.length) {
                alert("You should of guessed! The correct answer was: " + triviaQuestions[(questionCounter - 1)].correctAnswer);
                $("#incorrect").html("Incorrect: " + questionsIncorrect);
                clearGameSpace();
                stopTimer();
                calculateScore();
                resetGame();
            }
        }
    });
    $("#reset-button").on("click", function() {
        if (resetButtonEnabled === true) {
            resetGame();
        clearGameSpace();
        $("#correct").html("");
        $("#incorrect").html("");
        $("#answer-area").html("Click Start Button to Begin the Quiz");
        $("#question-timer").text("Time Remaining: -");
        $("#question-element").text("Arcade Edition");
        $("#game-score").text("Game Score: -");
        }
    });     
});