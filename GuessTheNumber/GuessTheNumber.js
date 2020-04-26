//Generates random number and sets state of game and number of moves left
let random_number = Math.floor((Math.random() * 100) + 1);
let game_over = false;
let number_moves_left = 6;

//Variables that store html id's
let submit = document.getElementById("submit");
let table = document.getElementById("table-data");
let winner = document.getElementById("winner");
let moves_left = document.getElementById("moves-left");
let big_result = document.getElementById("big-result");
let reset_button = document.getElementById("reset-button");

//Returns whether a guess is too high, too low or correct
function overUnderCorrect(user_guess) {
    if (user_guess > random_number) {
        return "Too High";
    } else if (user_guess < random_number) {
        return "Too Low";
    } else if (user_guess == random_number) {
        return "Just Right";
    } else {
        return "Insufficient";
    }
}

//Checks if game is over
function isGameOver(user_guess) {
    if (user_guess == random_number) {
        game_over = true;
        winner.innerHTML = "You won!";
        winner.style.marginLeft = "4%";
        reset_button.style.marginTop = "10%";
        table.style.marginTop = "-33.98%";
    } else if (number_moves_left == 0) {
        game_over = true;
        winner.innerHTML = "You Lost! Correct Answer: " + random_number;         
        winner.style.marginLeft = "-15%";
        reset_button.style.marginTop = "10%";
        table.style.marginTop = "-33.98%";
    }
}

//Checks if submit button is pressed
submit.onmousedown = function() {
    if (!game_over && document.getElementById("user-guess").value != "") {
        //Finds if user value is too high, too low or correct
        let user_guess = document.getElementById("user-guess").value;
        user_guess = parseInt(user_guess);
        let description = overUnderCorrect(user_guess);
        number_moves_left -= 1;

        //Insert row and cells to table
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        //Sets css attributes to cells
        cell1.align = "center";
        cell2.align = "center";
        cell1.style.backgroundColor = "lightgoldenrodyellow";
        cell2.style.backgroundColor = "lightgreen";
        cell1.style.borderWidth = "0px 1px 1.5px 2px";
        cell2.style.borderWidth = "0px 2px 1.5px 1.5px";
        cell1.innerHTML = user_guess;
        cell2.innerHTML = description;
        moves_left.innerHTML = "Guesses Left: " + number_moves_left;
        big_result.innerHTML = "Result: " + description;
        
        //Setting user input back to an empty string
        document.getElementById("user-guess").value = "";
        //Checks if game is over
        isGameOver(user_guess);
    }
}

//Checks if reset button is pressed
reset_button.onmousedown = function() {
    //Resets game if function evaluates to True
    random_number = Math.floor((Math.random() * 100) + 1);
    game_over = false;
    number_moves_left = 6;
    reset_button.style.marginTop = "4%";
    table.style.marginTop = "-28%";
    moves_left.innerHTML = "Guesses Left: 6";
    big_result.innerHTML = "Result: None";
    winner.innerHTML = "";
    //Deletes all rows from table    
    let i = 1;
    while (i < table.rows.length) {
        table.deleteRow(i);
    }
}