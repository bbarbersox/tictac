'use strict';

// var tttapi = {
//   gameWatcher: null,
//   ttt: 'http://ttt.wdibos.com',

//   ajax: function(config, cb) {
//     $.ajax(config).done(function(data, textStatus, jqxhr) {
//       cb(null, data);
//     }).fail(function(jqxhr, status, error) {
//       cb({jqxher: jqxhr, status: status, error: error});
//     });
//   },

//   register: function register(credentials, callback) {
//     this.ajax({
//       method: 'POST',
//       url: this.ttt + '/users',
//       contentType: 'application/json; charset=utf-8',
//       data: JSON.stringify(credentials),
//       dataType: 'json',
//     }, callback);
//   },

  // login: function login(credentials, callback) {
  //   this.ajax({
  //     method: 'POST',
  //     url: this.ttt + '/login',
  //     contentType: 'application/json; charset=utf-8',
  //     data: JSON.stringify(credentials),
  //     dataType: 'json',
  //   }, callback);
  // },

  // //Authenticated api actions
  // listGames: function (token, callback) {
  //   this.ajax({
  //     method: 'GET',
  //     url: this.ttt + '/games',
  //     headers: {
  //       Authorization: 'Token token=' + token
  //     },
  //     dataType: 'json'
  //   }, callback);
  // },

  // createGame: function (token, callback) {
  //   this.ajax({
  //     method: 'POST',
  //     url: this.ttt + '/games',
  //     headers: {
  //       Authorization: 'Token token=' + token
  //     },
  //     dataType: 'json'
  //   }, callback);
  // },

  // showGame: function (id, token, callback) {
  //   this.ajax({
  //     method: 'GET',
  //     url: this.ttt + '/games/'+id,
  //     headers: {
  //       Authorization: 'Token token=' + token
  //     },
  //     dataType: 'json'
  //   }, callback);
  // },

  // joinGame: function (id, token, callback) {
  //   this.ajax({
  //   }, callback);
  // },


  // markCell: function (id, data, token, callback) {
  //   this.ajax({
  //     method: 'PATCH',
  //     url: this.ttt + '/games/' + id,
  //     headers: {
  //       Authorization: 'Token token=' + token
  //     },
  //     contentType: 'application/json; charset=utf-8',
  //     data: JSON.stringify(data),
  //     dataType: 'json'
  //   }, callback);
  // },

  // watchGame: function (id, token) {
  //   var url = this.ttt + '/games/' + id + '/watch';
  //   var auth = {
  //     Authorization: 'Token token=' + token
  //   };
  //   this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
  //   return this.gameWatcher;
  // }
// };



//
// Game initiation logic
//

var gameArray = boardInitiation;  // reset the game board
var numOfMoves = 0;      // reset number of moves made
var playerXMoveTotal = 0; // reset player X # of moves
var playerYMoveTotal = 0; // reset player Y # of moves


var boardInitiation = function boardInitiation(gameArray) {
  for (i=o; i < gameArray.length; i++) {
    gameArray[i] = '';
  };
  return gameArray;
};

var moveInit = function moveInit (moveTotal) {
  moveTotal = 0;
  numOfMoves = 0;
  playerXMoveTotal = 0;
  playerYMoveTotal = 0;
  return moveTotal;
};


//
// choose the first player to move
//
var currentPlayer = "X";

if (Math.random() > .50) {
  currentPlayer = "O";
};

var moveValues = [1, 2, 5, 13, 34, 89, 233, 610, 1597];

var winningCombos = [8, 136, 247, 272, 646, 1632, 1691, 2440];








$(document).ready(function() {

 // create a user id
// $('.create').on('click', function() {
//   var playerXName = $("#name").val(name);
//   // var playerName = $(this).name.text("name");
//   // var playerEmail = $()
//   alert(playerName);
// });

// Antony's code to create a user
// $('#register').on('submit', function(e) {
//     var credentials = wrap('credentials', form2object(this));
//     tttapi.register(credentials, callback);
//     e.preventDefault();
//   });



 //
// Process a player move
//
 $('.square').on('click', function(){
//    var moveValue = parseInt($(this).text());
    var moveValue = $(this).data("num");
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

// $(function() {
//   var form2object = function(form) {
//     var data = {};
//     $(form).children().each(function(index, element) {
//       var type = $(this).attr('type');
//       if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
//         data[$(this).attr('name')] = $(this).val();
//       }
//     });
//     return data;
//   };


var checkWinner = function checkWinner(num1, num2, moves) {
  var winner = null;

  for (var i = 0; i < winningCombos.length; i++) {
    if (num1 === winningCombos[i]) {
      winner = 'playerX';
      alert('Player X is has won');
      alert('Hit start new game to play again')
    } else if (num2 === winningCombos[i]) {
        winner = 'playerY';
        alert('Player Y has won');
        alert('WHit start new game to play again')
      };
      // else if (moves === 9) {
      //   winner = 'tie';
      //   alert('This game has ended in a tie');
      // };
  };
  if ((winner === null) && (moves === 9)) {
    winner = 'tie';
    alert('this game is a tie');
    alert('Hit start new game to play again');
  };
  return winner;
};




// async.whilst(
//   gameShouldContinue,
//   playTurn,
//   gameDone);
