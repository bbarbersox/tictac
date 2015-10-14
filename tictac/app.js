'use strict';

// alert('What is your name');

// choose the first player to move
//

var currentPlayer = "X";

if (Math.random() > .50) {
  currentPlayer = "O";
};
var numOfMoves = 0;
var playerXMoveTotal = 0;
var playerYMoveTotal = 0;

var moveValues = [1, 2, 5, 13, 34, 89, 233, 610, 1597];

var winningCombos = [8, 136, 247, 272, 646, 1632, 1691, 2440];

//
// Process a player move
//
$(document).ready(function() {

  $('.square').on('click', function(){
    var moveValue = parseInt($(this).text());

    $(this).text(currentPlayer);

    $(this).off();
    numOfMoves ++;
    // ajax callout here to send move to server

    if (currentPlayer === "O") {
      playerYMoveTotal = playerYMoveTotal + moveValue;
      currentPlayer = "X";
    } else {
      playerXMoveTotal = playerXMoveTotal + moveValue;
      currentPlayer = "O";
    };

   if (numOfMoves >= 5) {checkWinner(playerXMoveTotal, playerYMoveTotal, numOfMoves)};
  });
});

var checkWinner = function checkWinner(num1, num2, moves) {
  var winner = null;

  for (var i = 0; i < winningCombos.length; i++) {
    if (num1 === winningCombos[i]) {
      winner = 'playerX';
      alert('Player X is has won');
    } else if (num2 === winningCombos[i]) {
        winner = 'playerY';
        alert('Player Y has won');
      };
      // else if (moves === 9) {
      //   winner = 'tie';
      //   alert('This game has ended in a tie');
      // };
  };
  if ((winner === null) && (moves === 9)) {
    alert('this game is a tie');
  };
  return winner;
};

 alert(playerXMoveTotal, playerYMoveTotal);



// async.whilst(
//   gameShouldContinue,
//   playTurn,
//   gameDone);
