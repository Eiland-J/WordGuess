//NPM modules to obtain player input (letter guesses) and to add color to the display
var Word = require("./word.js");
var inquirer = require('inquirer');
var colors = require('colors');

wordList = ["TUPAC", "DRAKE", "JAYZ", "KANYE WEST", "SNOOP DOGG", "EMINEM", "LIL WAYNE", "NAS", "KENDRICK LAMAR", "JCOLE", "FUTURE", "ICE CUBE", "POST MALONE", "RICK ROSS"];
var select = 0;
var rapArtist = "";
var usedWord = "";
var counter = 0;

//Chooses a word from the word array, uses the word constructor to create the proper display and functionality;
//'rapArtist' is used for comparison later to check if the word is solved
function startGame() {
    if (rapArtist.length<2) {
        rapArtist = ["Tupac", "DRAKE", "JAYZ", "KANYE WEST", "SNOOP DOGG", "EMINEM", "LIL WAYNE", "Nas", "KENDRICK LAMAR", "", "FUTURE", "ICE CUBE", "POST MALONE", "RICK ROSS"];
    }
    select = Math.floor(Math.random()*wordList.length);
    rapArtist = wordList[select];
    usedWord = new Word(rapArtist);
    usedWord.makeWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\nYou get 6 chances to find the correct rapper.\n".cyan)
    promptUser();
}





//Allows the user to input a letter guess, restarts the game if player is out of wrong guesses.
function promptUser() {
    if (counter<6) {
        console.log(usedWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter and press enter. ".cyan
            }
        ]).then(function(data) {
                checkAnswer(data);
        });
    }
    else{
        console.log("\nSorry, you're out of guesses.\n".inverse);
        console.log(rapArtist.green);
        rapArtist = "";
        usedWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
}

//MAKES SURE THAT THE USER INPUTS A LETTER
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = usedWord.showWord();
        usedWord.checkGuess(checkable);
        if (temp === usedWord.showWord()) {
            console.log("\nSorry, wrong letter!\n".red);
            counter++;
            console.log(((6 - counter) + " guesses remaining").red);
            promptUser();
        }
        else {
            rightGuess();
        }
    }
    else {
        console.log("\n ONE LETTER AT A TIME! \n".red);
        promptUser();
    }
}



//If the user's guess is correct, the word array displays the word with the chosen letters, 
//If the entire word is correct game is over.
function rightGuess() {
    console.log("\nYou guessed correctly.\n".green);
    if (rapArtist.replace(/ /g,"") == (usedWord.showWord()).replace(/ /g,"")) {
        console.log(usedWord.showWord().white);
        console.log('\nYou win!!\n'.white);
        rapArtist = "";
        usedWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
    else {
        promptUser();
    }
}

startGame();
