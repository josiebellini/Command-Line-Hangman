// require letter objects
var Letter = require('./letter.js');

function Word(word) {
  var that = this;
  //store the string wrd
  this.word = word;
  //collection of letter objects
  this.letters = [];
  this.wordFound = false;

  this.getLets = function() {
    //populate the collection above with new Letter objects
    for(var i = 0; i<that.word.length; i++){
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };

  //found the current word
  this.didWeFindTheWord = function() {
    if(this.letters.every(function(letter){
      return letter.appear === true;
    })){
      this.wordFound = true;
      return true;
    }

  };

  this.checkIfLetterFound = function(guessedLetter) {
    var whatToReturn = 0;
    //iterates through each letter to see if it matches the guessed letter
    this.letters.forEach(function(letter){
      if(letter.letter === guessedLetter){
        letter.appear = true;
        whatToReturn++;
      }
    })
    //if guessLetter matches Letter property, the letter object should be shown
    return whatToReturn;
  };

  this.wordRender = function() {
    var display = '';
    //render the word based on if letters are found or not
    that.letters.forEach(function(letter){
      var currentLetter = letter.letterRender();
      display+= currentLetter;
    });

    return display;
  };
}

module.exports = Word;