
var inquirer = require('inquirer');
var Word = require('./word.js');
var Game = require('./game.js');


var hangman = {
  //import the word bank from Game.js
  wordBank: Game.newWord.wordList,
  livesRemaining: 10,
  //array to hold letters guessed by user and prompts if the user guessed the letter already
  guessedLetters: [],
  currentWord: null,
  //asks user if they are ready to play
  startGame: function() {
    var that = this;
    //clears guessedLetters before a new game starts
    if(this.guessedLetters.length > 0){
      this.guessedLetters = [];
    }

    inquirer.prompt([{
      name: "start",
      type: "confirm",
      message: "Ready to play?"
    }]).then(function(answer) {
      if(answer.play){
        that.newGame();
      } else{
        console.log("You're no fun..");
      }
    })},
  //if they want to play starts new game.
  newGame: function() {
    if(this.livesRemaining === 10) {
      console.log("Okay! Let's Play!");
      console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
      //generates random number based on the wordBank
      var randNum = Math.floor(Math.random()*this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNum]);
      this.currentWord.getLets();
      //displays current word as blanks.
      console.log(this.currentWord.wordRender());
      this.keepPromptingUser();
    } else{
      this.resetGuessesRemaining();
      this.newGame();
    }
  },
  resetGuessesRemaining: function() {
    this.livesRemaining = 10;
  },
  keepPromptingUser : function(){
    var that = this;
    //asks player for a letter
    inquirer.prompt([{
      name: "chosenLetter",
      type: "input",
      message: "Choose a letter:",
      
    }]).then(function(letter) {
      //toUpperCase because words in word bank are all caps
      var letterReturned = (letter.chosenLetter).toUpperCase();
      //adds to the guessedLetters array if it isn't already there
      var guessedAlready = false;
        for(var i = 0; i<that.guessedLetters.length; i++){
          if(letterReturned === that.guessedLetters[i]){
            guessedAlready = true;
          }
        }
        //if the letter wasn't guessed already run through entire function, else reprompt user
        if(guessedAlready === false){
          that.guessedLetters.push(letterReturned);

          var found = that.currentWord.checkIfLetterFound(letterReturned);
          //if none were found tell user they were wrong
          if(found === 0){
            console.log('Try again!');
            that.livesRemaining--;
           
            console.log('Lives Remaining: ' + that.livesRemaining);
    

            console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
            console.log(that.currentWord.wordRender());
            console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

            console.log("Letters guessed: " + that.guessedLetters);
          } else{
            console.log('Yay! You guessed right!');
              //checks to see if user won
              if(that.currentWord.didWeFindTheWord() === true){
                console.log(that.currentWord.wordRender());
                console.log('\n\n~~*-|-*~~ \n\n YOU WON! \n\n~~*-|-*~~\n\n');
                // that.startGame();
              } else{
                // display the user how many guesses remaining
                console.log('Lives Remaining: ' + that.livesRemaining);
                console.log(that.currentWord.wordRender());
                console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                console.log("Letters guessed: " + that.guessedLetters);
              }
          }
          if(that.livesRemaining > 0 && that.currentWord.wordFound === false) {
            that.keepPromptingUser();
          }else if(that.livesRemaining === 0){
            console.log('\n\n~~*-|-*~~ \n\nGAME OVER \n\n~~*-|-*~~\n\n');
            console.log('The word you could not guess was: ' + that.currentWord.word + '\n\n');
          }
        } else{
            console.log("You've guessed that letter already. Try again.")
            that.keepPromptingUser();
          }
    });
  }
}

hangman.startGame();