// global variables

const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";


const symbolHolder = function(word){
    const symbolHolderLetters = [];

    for(const hold of word){
        console.log(hold);
        symbolHolderLetters.push("●");
    }
    wordInProgress.innerText = symbolHolderLetters.join("");
}

symbolHolder(word);

button.addEventListener("click",function(e){
    e.preventDefault();

    const input = letter.value;
    console.log(input);
    letter.value = "";
});