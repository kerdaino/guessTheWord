// global variables

const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
// let word = "magnolia";
const guessedLetter = [];
let remainingGuesses = 8;

const getWord = async function(){
    const wordSeries  = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await wordSeries.text();
    // console.log(words);
    const wordArray = words.split('\n');
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    symbolHolder(word);
};

// let word = "magnolia";
let word = "";
getWord();

// functions for the placeholders 
const symbolHolder = function (word) {
    const symbolHolderLetters = [];

    for (const hold of word) {
        // console.log(hold);
        symbolHolderLetters.push("●");
    }
    wordInProgress.innerText = symbolHolderLetters.join("");
}

// symbolHolder(word);

button.addEventListener("click", function (e) {
    e.preventDefault();

    const inputButton = letter.value;

    const rightWord = validate(inputButton);

    if (rightWord) {
        makeGuess(inputButton);
    }

    console.log(inputButton);
    letter.value = "";
    // message.innerText = "";

    // const check = validate(inputButton);
});

// const check = validate(message);
// console.log(check);

const validate = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    // const acceptedLetterMatch = 
    if (input.length === 0) {
        message.innerText = "PUT IN A LETTER IN THE BOX,FRIEND";
    }
    else if (input.length > 1) {
        message.innerText = "Not more than one letter,THANKS";
    }
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Enter letters from A to Z,try again";
    }
    else {
        return input;
    }
};

const makeGuess = function (inputButton) {
    inputButton = inputButton.toUpperCase();
    if (guessedLetter.includes(inputButton)) {
        message.innerText = "You already entered that letter,try again";
    }
    else {
        guessedLetter.push(inputButton);
        console.log(guessedLetter);
        guess(inputButton);
        updateGuess();
        updateWordInProgress(guessedLetter);
    };
};

const updateGuess = function () {
    guessedLetters.innerHTML = "";
    for (const letters of guessedLetter) {
        const li = document.createElement("li");
        li.innerText = letters;
        guessedLetters.append(li);
    }
};

const updateWordInProgress = function (guessedLetter) {
    const wordUpper = word.toUpperCase();

    const wordArray = wordUpper.split("");
    const revealWord = [];

    // console.log(revealWord);
    for (const letter of wordArray) {
        if (guessedLetter.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        }
        else {
            revealWord.push("●");
        }
    }

    wordInProgress.innerText = revealWord.join("");
    winGame();
};

const guess = function (inputButton) {
    const upper = word.toUpperCase();
    if (!upper.includes(inputButton)) {
        message.innerText = `Sorry, the word has no ${inputButton}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${inputButton}.`;
    };

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        span.innerText = `${remainingGuesses} guess`;
    } else {
        span.innerText = `${remainingGuesses} guesses`;
    }
};

const winGame = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`
    }
};