'use strict';

//
// Game initiation logic
//

var gameArray = ['', '', '', '', '', '', '', '', ''];  // reset the game board
var numOfMoves = 0;      // reset number of moves made
var playerXMoveTotal = 0; // reset player X # of moves
var playerYMoveTotal = 0; // reset player Y # of moves
var moveTotal = 0;

var gameInit = function gameInit(gameArray) {
  moveTotal = 0;
  numOfMoves = 0;
  playerXMoveTotal = 0;
  playerYMoveTotal = 0;
  console.log(gameArray);
  $('.square').text(null);
  $('.square').on('Click', squareClick());
  for (var i = 0; i < gameArray.length; i++) {
    gameArray[i] = '';
  };
  console.log(gameArray);
  return gameArray;
};

var moveInit = function moveInit (moveTotal) {
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
// })
 //
// Process a player move
//
 var squareClick = $('.square').on('click', function(){
//    var moveValue = parseInt($(this).text());
    var moveValue = $(this).data("num");

    var i = $(this).data("index");

    gameArray[i] = currentPlayer;
    $(this).text(currentPlayer);
    $(this).off();
    numOfMoves ++;

    // If at leaast one of the players has made at least
    // three moves check to see if the current player has
    // won the game

    if (numOfMoves >= 5) {checkWinner(gameArray, currentPlayer, numOfMoves)};

    //
    // ajax callout here to send move to server
    //

    // switch current player to opponet
    currentPlayer = (currentPlayer == 'O' ? 'X' : 'O');

  });
});


// var checkWinner = function checkWinner(num1, num2, moves) {
//  var winner = null;
var checkWinner = function checkWinner(gameArray, player, moves) {
  var winner = null;
  if ((gameArray[0] === player && gameArray[1] === player && gameArray[2] === player ) ||
    (gameArray[3] === player && gameArray[4] === player && gameArray[5] === player ) ||
    (gameArray[6] === player && gameArray[7] === player && gameArray[8] === player ) ||
     (gameArray[0] === player && gameArray[3] === player && gameArray[6] === player ) ||
     (gameArray[1] === player && gameArray[4] === player && gameArray[7] === player ) ||
     (gameArray[2] === player && gameArray[5] === player && gameArray[8] === player ) ||
     (gameArray[0] === player && gameArray[4] === player && gameArray[8] === player ) ||
     (gameArray[2] === player && gameArray[4] === player && gameArray[6] === player )) {
    winner = player;
    alert(winner + ' has won this game');
    gameInit(gameArray);
  };

if ((winner === null) && (moves === 9)) {
    winner = 'tie';
    alert('this game is a tie');
    alert('Hit start new game to play again');
  };
  return winner;
};

  // for (var i = 0; i < winningCombos.length; i++) {
  //   debugger
  //   if (num1 === winningCombos[i]) {
  //     debugger
  //     winner = 'playerX';
  //     alert('Player X is has won');
  //     alert('Hit start new game to play again')
  //   } else if (num2 === winningCombos[i]) {
  //       debugger
  //       winner = 'playerY';
  //       alert('Player Y has won');
  //       alert('WHit start new game to play again')
  //     };
  //     // else if (moves === 9) {
  //     //   winner = 'tie';
  //     //   alert('This game has ended in a tie');
  //     // };
  // };



var tttapi = {
  gameWatcher: null,
  ttt: 'http://ttt.wdibos.com',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxher: jqxhr, status: status, error: error});
    });
  },


  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/users',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json',
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json',
    }, callback);
  },

  //Authenticated api actions
  listGames: function (token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  createGame: function (token, callback) {
    this.ajax({
      method: 'POST',
      url: this.ttt + '/games',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  showGame: function (id, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.ttt + '/games/'+id,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  joinGame: function (id, token, callback) {
    this.ajax({
    }, callback);
  },


  markCell: function (id, data, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.ttt + '/games/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      dataType: 'json'
    }, callback);
  },

  watchGame: function (id, token) {
    var url = this.ttt + '/games/' + id + '/watch';
    var auth = {
      Authorization: 'Token token=' + token
    };
    this.gameWatcher = resourceWatcher(url, auth); //jshint ignore: line
    return this.gameWatcher;
  }
};


//$(document).ready(...
$(function() {
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };

  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };

  $('.register').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    tttapi.register(credentials, callback);
    e.preventDefault();
  });

  $('.login').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      $('.token').val(data.user.token); // sets all forms a token value
      console.log(data.user.token);
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

  $('#list-games').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.listGames(token, callback);
  });

  $('#create-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(token, callback);
  });

  $('#show-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#show-id').val();
    e.preventDefault();
    tttapi.showGame(id, token, callback);
  });

  $('#join-game').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#join-id').val();
    e.preventDefault();
    tttapi.joinGame(id, token, callback);
  });

  $('#mark-cell').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    var id = $('#mark-id').val();
    var data = wrap('game', wrap('cell', form2object(this)));
    e.preventDefault();
    tttapi.markCell(id, data, token, callback);
  });

  $('#watch-game').on('submit', function(e){
    var token = $(this).children('[name="token"]').val();
    var id = $('#watch-id').val();
    e.preventDefault();

    var gameWatcher = tttapi.watchGame(id, token);

    gameWatcher.on('change', function(data){
      var parsedData = JSON.parse(data);
      if (data.timeout) { //not an error
        this.gameWatcher.close();
        return console.warn(data.timeout);
      }
      var gameData = parsedData.game;
      var cell = gameData.cell;
      $('#watch-index').val(cell.index);
      $('#watch-value').val(cell.value);
    });
    gameWatcher.on('error', function(e){
      console.error('an error has occured with the stream', e);
    });
  });

});



// async.whilst(
//   gameShouldContinue,
//   playTurn,
//   gameDone);
