$(document).ready(function () {

    $("#submitGuess").click(submitGuessNumber);
    $("#showSecret").click(showSecretNumber);


    //get random number
    var randomNum = Math.floor(Math.random() * 10).toString();
    //get 4 random numbers to a string, no repeats.
    for (var i = 0; i < 3; i++) {
        var randomAnswer = Math.floor(Math.random() * 10).toString();
        if (randomNum.includes(randomAnswer) === false) {
            randomNum += randomAnswer;
        } else {
            i--;
        }
    }

    //count how many right positions
    var bulls = 0;
    //count how many right wrong pos. but right number
    var cows = 0;
    var secretNumber = randomNum.toString();
    var guessCount = 0;
    var wrongGuesses = 0;


    // validate guesses
    var myRules = {
        guessNum:
            {
                required: true,
                digits: true,
                min: 4,
                max: 4,
            }
    }

    var myMessages = {
        guessNum:
            {
                required: "This field is required.",
                digits: "Please enter a four digit number.",
                min: "Guess must contain 4 digits.",
                max: "Guess must contain 4 digits.",
            }
    }

    $("form").validate(
        {
            submitHandler: submitGuessNumber,
            rules: myRules,
            messages: myMessages,
        }
    );


    function submitGuessNumber(event) {
        event.preventDefault();

        var userGuess = $("#guessNum").val().toString();
        //repeating numbers loop


        for (var i = 0; i < 4; i++) {
            if (userGuess[i] === userGuess[i + 1]) {
                $("#guessOutput").text("Guess can't have repeating numbers.");
                wrongGuesses = 1;

            }

        }


        if (wrongGuesses === 0) {
            if (userGuess === secretNumber) {
                guessCount++;
                $("#winnerMessage").html("Congratulations, you guessed the secret number.<br> The secret number was: " + secretNumber
                + "<br> Guess Attempts = " + guessCount);


            } else {
                for (var k = 0; k < 4; k++) {
                    if (userGuess[k] === secretNumber[k]) {
                        bulls++;
                    } else if (secretNumber.includes(userGuess[k])) {
                        cows++;
                    }
                }

                guessCount++;
                $("#guessOutput").html(`Guess Attempt # ${guessCount} <br>
                  Users guess = ${userGuess} <br> Bulls = ${bulls} <br> Cows = ${cows}`);
                bulls = 0;
                cows = 0;

            }


        }

    }

    function showSecretNumber(event) {
        event.preventDefault();
        $("#winnerMessage").text("The secret number is: " + secretNumber);

    }

});