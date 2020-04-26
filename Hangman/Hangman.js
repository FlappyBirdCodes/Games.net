//Lists that contain all words and hints in the game
let words = ["sunglasses","textbook","safely","together","gorgeous","education","instruction","hideous","tactics","impossible","presentation","heartbroken","parking","tissues","painting","exciting","monkey","chinese","secretive","programming","stubborn","spanish","furious","mathematics","eastern"]
let hints = [
    "something that you wear",
    "studying material",
    "BE CAREFUL",
    "close and closer",
    "your mom",
    "slightly overrated",
    "what your teacher gives out",
    "has the word hide in it",
    "strategy is key",
    "never say never",
    "what every kid hates",
    "something's broken",
    "don't pay for this",
    "what every kid has in their room",
    "art is art right?",
    "heart-beating fast",
    "animal that's brown",
    "dumplings and ping-pong",
    "kinda like a spy",
    "hello world",
    "every asian parent",
    "hola, como estas",
    "fast and",
    "9 + 10 = 21",
    "yugoslavia"
]

//Generates random word from words list
let random_index = Math.floor(Math.random() * words.length)
let random_word = words[random_index]

let game_over = false;
let correct_letters = []

//Fills array of certain length with value
function fillArray(value, len) {
    if (len == 0) return [];
    var a = [value];
    while (a.length * 2 <= len) a = a.concat(a);
    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
  }

//Sets word and hint on Hangman.html
let word = document.getElementById("word")
let new_word = fillArray("_", random_word.length);
word.innerHTML = new_word.join("")
let hint = document.getElementById("hint");
hint.innerHTML = "Hint: " + hints[random_index];

//Keeps track of the number of guesses and updates Hangman.html accordingly
let guesses_left = document.getElementById("guesses-left");
let letters_left = document.getElementById("letters-left");
let number_guesses_left = Math.ceil(random_word.length * 1.5);
guesses_left.innerHTML = "Guesses Left: " + number_guesses_left;
letters_left.innerHTML = "Letters Left: " + random_word.length;
let guessed_correctly = 0

//Finds location of substring in string
function locations(substring,string){
    let a=[],i=-1;
    while((i=string.indexOf(substring,i+1)) >= 0) a.push(i);
    return a;
  }
  
//Gets all indexes of letter in string
function getIndexes(str, letter) {
    let indices = [];

    if (!correct_letters.includes(letter)) {
        for(var i=0; i<str.length;i++) {
            if (str[i] === letter) {
                indices.push(i);
                correct_letters.push(letter);
            }
        }
    }

    guessed_correctly += indices.length;
    return indices;
}

//Gets new word after indexes have been changed
function getNewWord(indexes, letter) {
    for (let i = 0; i < indexes.length; i++) {
        new_word[indexes[i]] = letter;
    }
}

//Checks if the full word has been guesses
function guessedFullWord(guess) {
    if (guess == random_word) {
        word.innerHTML = random_word;
    }
}

let winner = document.getElementById("winner");
let reset_button = document.getElementById("reset-button");
//Checks if game is over and changes html accordingly
function isGameOver(guess) {
    if (word.innerHTML == random_word) {
        winner.innerHTML = "You won!";
        winner.style.marginLeft = "4%";
        winner.style.marginTop = "-2%";
        reset_button.style.marginTop = "10%";
        word.innerHTML = random_word;
        letters_left.innerHTML = "Letters Left: 0";
        game_over = true;
    } else if (number_guesses_left == 0) {
        winner.innerHTML = "You lost!";
        winner.style.marginLeft = "4%";
        winner.style.marginTop = "-2%";
        reset_button.style.marginTop = "10%";
        word.innerHTML = random_word;
        game_over = true;
    }
}

//Updates game 
function updateGame() {
    if (!game_over && document.getElementById("guess").value != "") {
        let guess = document.getElementById("guess").value;
        let indexes = getIndexes(random_word, guess);
        getNewWord(indexes, guess);
        word.innerHTML = new_word.join("");
        document.getElementById("guess").value = "";
        guessedFullWord(guess);
        number_guesses_left -= 1;
        guesses_left.innerHTML = "Guesses Left: " + number_guesses_left;
        letters_left.innerHTML = "Letters Left: " + (random_word.length - guessed_correctly);
        isGameOver(guess);
    }
}

let submit = document.getElementById("submit");
//Updates game if submit button is pressed
submit.onmousedown = function() {
    updateGame();
}

//Resets game if reset button is pressed
reset_button.onmousedown = function() {
    game_over = false;
    random_index = Math.floor(Math.random() * words.length)
    random_word = words[random_index]
    new_word = fillArray("_", random_word.length);
    word.innerHTML = new_word.join("")
    number_guesses_left = Math.ceil(random_word.length * 1.5)
    guesses_left.innerHTML = "Guesses Left: " + number_guesses_left;
    letters_left.innerHTML = "Letters Left: " + random_word.length;
    guessed_correctly = 0;
    hint.innerHTML = "Hint: " + hints[random_index];
    winner.innerHTML = "";
    reset_button.style.marginTop = "4%";
    correct_letters = [];
}

