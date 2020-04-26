//Variables that store the rock, paper, scissors on rockpaperscissors.html
let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");

//Images for rock, paper, scissors and question
let question_image = "https://www.seekpng.com/png/detail/8-84931_question-mark-question-mark-white-background.png";
let rock_image = "https://www.netclipart.com/pp/m/18-182995_awesome-rock-download-free-clipart-with-a-transparent.png";
let paper_image = "https://www.netclipart.com/pp/m/134-1341795_letters-pen-png-pencil-and-paper-png.png";
let scissors_image = "https://i.dlpng.com/static/png/508548_preview.png";

//Images for user and computer
let image1 = document.getElementById("image1");
let image2 = document.getElementById("image2");

score1 = document.getElementById("your-score");
score2 = document.getElementById("computer-score");
winner = document.getElementById("winner");
reset_button = document.getElementById("reset-button");

//Variables that check if the game is over and user has made move
let game_over = false;
let made_move = false;

//Scores for user and the computer
let your_score = 0;
let computer_score = 0;

//Sets image attributes to appropriate amount
function setImageAttributes() {
    image1.style.width = "140%";
    image1.style.height = "9em";
    image1.style.marginTop = "2%";
    image1.style.marginLeft = "-20%";
    image1.style.marginBottom = "30%";
}

//Gets random element, either rock, paper or scissors
function getRandomElement() {
    let random_number = Math.floor(Math.random() * 3) + 1;
    if (random_number == 1) {
        image2.src = rock_image;
    } else if (random_number == 2) {
        image2.src = paper_image;
    } else {
        image2.src = scissors_image;
    }
}

//Checks if user has made move
function userMadeMove() {
    if (!made_move) {
        made_move = true;
        setTimeout(function(){ image1.src = question_image; image2.src = question_image; made_move = false;}, 2000);
    }
}

//Updates points depending on who won the round
function updatePoints() {
    if (image1.src == rock_image && image2.src == scissors_image) {
        your_score++;
        score1.innerHTML = "Your Score: " + your_score;
    } else if (image2.src == rock_image && image1.src == scissors_image) {
        computer_score++;
        score2.innerHTML = "Computer Score: " + computer_score;
    } else if (image1.src == paper_image && image2.src == rock_image) {
        your_score++;
        score1.innerHTML = "Your Score: " + your_score;
    } else if (image2.src == paper_image && image1.src == rock_image) {
        computer_score++;
        score2.innerHTML = "Computer Score: " + computer_score;
    } else if (image1.src == scissors_image && image2.src == paper_image) {
        your_score++;
        score1.innerHTML = "Your Score: " + your_score;
    } else if (image2.src == scissors_image && image1.src == paper_image) {
        computer_score++;
        score2.innerHTML = "Computer Score: " + computer_score;
    }
}

//Checks if the game is over
function isGameOver() {
    if (your_score == 10) {
        game_over = true;
        winner.innerHTML = "Winner: YOU!";
    } else if (computer_score == 10) {
        game_over = true;
        winner.innerHTML = "Winner: COMPUTER!";
        winner.style.left = "33%";
    }
}

//Resets the game
function resetGame() {
    game_over = false;
    made_move = false;
    your_score = 0;
    computer_score = 0;
    image1.src = question_image;
    image2.src = question_image;
    score1.innerHTML = "Your Score: 0";
    score2.innerHTML = "Computer Score: 0";
    winner.innerHTML = "Winner: None";
    winner.style.left = "38%";
}

//Updates the game
function updateGame() {
    setImageAttributes();
    getRandomElement();
    userMadeMove();    
    updatePoints();
    isGameOver();
}

//Changes image src to rock image if conditions are met
rock.onmousedown = function() {
    if (!game_over && !made_move) {
        image1.src = rock_image;
        updateGame();
    }
}

//Changes image src to paper image if conditions are met
paper.onmousedown = function() {
    if (!game_over && !made_move) {
        image1.src = paper_image;
        updateGame();
    }
}

//Changes image src to scissors image if conditions are met
scissors.onmousedown = function() {
    if (!game_over && !made_move) {
        image1.src = scissors_image;
        updateGame();
    }
}

//Resets game if reset button is pressed
reset_button.onmousedown = function() {
    resetGame();
}
