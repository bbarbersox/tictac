'use strict';

//
// Game initiation logic
//

var gameArray = ['', '', '', '', '', '', '', '', ''];  // reset the game board
// var numOfMoves = 0;      // reset number of moves made
var playerXMoveTotal = 0; // reset player X # of moves
var playerYMoveTotal = 0; // reset player Y # of moves
var moveTotal = 0;
var token = null;
var gameId = null;
var moveData = {
  "game": {
    "cell": {
      "index": 0,
      "value": "x"
    },
    "over": false
  }
};

/// hidden code
  // var gameInit = function gameInit(gameArray) {
  //   moveTotal = 0;
  //   numOfMoves = 0;
  //   playerXMoveTotal = 0;
  //   playerYMoveTotal = 0;

  //   // reset the board to nulls
  //   $('.square').text(null);

  //   // reenable the click handler on squares
  //   // $('.square').on('click', squareClick());
  //   // $('.square').on(squareClick);
  //   // $('.sqaure').on();

  //   // reset the game arrays to nulls
  //   for (var i = 0; i < gameArray.length; i++) {
  //     gameArray[i] = '';
  //   };
  //   return gameArray;
  // };

//
// choose the first player to move
//
var currentPlayer = "X";

var squareClick, resetBoard;

// if (Math.random() > .50) {
//  currentPlayer = "O";
// };

// var moveValues = [1, 2, 5, 13, 34, 89, 233, 610, 1597];

// var winningCombos = [8, 136, 247, 272, 646, 1632, 1691, 2440];

var isWinner = function(player) {
  return  (gameArray[0] === player && gameArray[1] === player && gameArray[2] === player ) ||
          (gameArray[3] === player && gameArray[4] === player && gameArray[5] === player ) ||
          (gameArray[6] === player && gameArray[7] === player && gameArray[8] === player ) ||
          (gameArray[0] === player && gameArray[3] === player && gameArray[6] === player ) ||
          (gameArray[1] === player && gameArray[4] === player && gameArray[7] === player ) ||
          (gameArray[2] === player && gameArray[5] === player && gameArray[8] === player ) ||
          (gameArray[0] === player && gameArray[4] === player && gameArray[8] === player ) ||
          (gameArray[2] === player && gameArray[4] === player && gameArray[6] === player );
};

var checkWinner = function() {
  if (isWinner(currentPlayer)) {
    moveData.game.over = 'true';
    // ajax call goes here
    console.log(currentPlayer + ' has won this game');
    alert(currentPlayer + ' has won the game');
    resetBoard();
  } else if (!movesLeft()) {
      moveData.game.over = 'true';
      // ajax call goes here
      console.log('this game is a tie');
      console.log('Hit start new game to play again');
      alert("This game is a tie.  Let's play again!");
      resetBoard();
  } else {
    // if nobody has won, switch current player
    console.log("still in play; play swiching from " + currentPlayer);
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    };
    console.log('calling updateCell');
    updateCell(token, gameId, moveData);
    console.log("to " + currentPlayer);
  }
  return null;
};

var movesLeft = function() {
  return gameArray.some(function(element){return element === '';});
};

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

  squareClick = function(){
    //    var moveValue = parseInt($(this).text());
    //    // if ($(this.hasClass('available'))) {
    var moveValue = $(this).data("num");
    var i = $(this).data("index");
    console.log(moveData);
    // moveData.game = gameId;
    moveData.game.cell.index = i;
    moveData.game.cell.value = currentPlayer;
    console.log(moveData);

    if (gameArray[i] !== '' || isWinner("X") || isWinner("O") || !movesLeft()) {return;}

    gameArray[i] = currentPlayer;

    $(this).text(currentPlayer);

    // turn off the event handler for this square
    // $(this).off();
    //    $(this).off();

    // numOfMoves++;

    // If at leaast one of the players has made at least
    // three moves check to see if the current player has
    // won the game

    checkWinner();

    //
    // ajax callout here to send move to server
    //

    //    currentPlayer = (currentPlayer == 'O' ? 'X' : 'O');
      // } else {
      //   alert('This square is taken/  Please try again.');
      // };
  };

  resetBoard = function(){
    playerXMoveTotal = 0;
    playerYMoveTotal = 0;
    // numOfMoves = 0;
    moveTotal = 0;

    // reset the board to nulls
    $('.square').text(null);

    // reset the game arrays to nulls
    gameArray = ['', '', '', '', '', '', '', '', ''];

    // set the first player to move
    currentPlayer = "X";
  };

  $(".square").on('click', squareClick);
  // $('button').on('click', resetBoard); // reset button logic


  // }); --- used to close $(document).ready function

  // var checkWinner = function checkWinner(num1, num2, moves) {
  //  var winner = null;

});

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
      //$('.token').val(data.user.token); // sets all forms a token value
      token = data.user.token;
    };
    e.preventDefault();
    tttapi.login(credentials, cb);
  });

  $('#list-games').on('submit', function(e) {
    var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.listGames(token, callback);
  });

  var createGameCB = function createGameCB(err, data) {
    console.log(data);
    if (err) {
      console.error(err);
      return;
    } else {
      gameId = data.game.id;
    }
  }

  $('#create-game').on('submit', function(e) {
    //var token = $(this).children('[name="token"]').val();
    e.preventDefault();
    tttapi.createGame(token, createGameCB);
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

  var updateCell = function updateCell(token, gameID, Data) {
    // var token = $(this).children('[name="token"]').val();
    // var id = $('#mark-id').val();
    alert('we got here');
    var data = wrap('game', wrap('cell', form2object(this)));
    e.preventDefault();
    tttapi.markCell(id, data, token, callback);
  };

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
