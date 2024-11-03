'use strict';

/*
//The technical term for interacting with the wedpage using javascript is known as DOM manipulation.
The DOM automatically created by the browser when a HTML page loads and it store as a tree like structure.

Here, document.querySelector() -> querySelector() is one of the method of document Object.
textContent = innerHTML

console.log(document.querySelector('.message').textContent); // -> First you select the element using querySelector() then textContent to access the content / value written inside that element.

// If the DOM is not a part of the JS language, then how does it all works?
  ANS-> The DOM and DOM Methods are actually part of something called the web APIs. So, this web APIs are like libraries which is also written in JS, that the browser implement and that we can access from our JS code. This is all BTS. There is an official DOM specifications that the browser implements.


// Selecting and Manipulating Elements:
document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').innerHTML = 10;

// To get what is written in the input field use .value
document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value) // -> o/p - 23;
*/
/* 
// Handling the Click Events:
AN event is something that happens on the page, for example that a mouse click, mouse moving, key press.
Then with event listener, we can wait for certain event to happen.

*/
//Down all are state variable. They do not depend on the DOM and it is the best way to do it as the data will always save on the script.
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent = guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
