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
var game = {
      "cell": {
        "index": 0,
        "value": "x"
      },
      "owner": false
};
var currentPlayer = "X";

var squareClick, resetBoard;

var updateCell;

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

// function to process winners, tie and on-going games
var checkWinner = function() {
  if (isWinner(currentPlayer)) {
    game.over = 'true';
    // ajax call goes here to update server of move & win
    // updateCell(token, gameId, game);
    console.log(currentPlayer + ' has won this game');
    alert(currentPlayer + ' has won the game');
    // reset the board and start again
    resetBoard();
  } else if (!movesLeft()) {
      moveData.game.over = 'true';
      // ajax call goes here to update server of move & tie
      console.log('this game is a tie');
      alert("This game is a tie.  Let's play again!");
      // reset the board and start again
      resetBoard();
  } else {
    // if nobody has won, switch current player
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
    } else {
      currentPlayer = 'X';
    };
    console.log('calling updateCell');
   // ajax call goes here to update server of the move
   //  updateCell(token, gameId, game);
    console.log("to " + currentPlayer);
  }
  return null;
};

// use some method to check if there are untaken squares on the board
var movesLeft = function() {
  return gameArray.some(function(element){return element === '';});
};

$(document).ready(function() {

  squareClick = function(){
    // this function processes a square that was clicked
    var i = $(this).data("index"); // assign the suare's index to i
    console.log(game);

    // set cell index & cell value for the ajax call to server
    game.cell.index = i;
    game.cell.value = currentPlayer;

    console.log(game);

    // checks to see if a player has won
    if (gameArray[i] !== '' || isWinner("X") || isWinner("O") || !movesLeft()) {return;}

    // game array is updated to reflect the move made
    gameArray[i] = currentPlayer;

    // set the square to X or O
    $(this).text(currentPlayer);

    // calls function to process the winner or tie or prepare the next move
    checkWinner();
  };

  resetBoard = function(){
    // this functions resets the game and game board to prepare for a new game
    moveTotal = 0;

    // reset the board to nulls
    $('.square').text(null);

    // reset the game arrays to nulls
    gameArray = ['', '', '', '', '', '', '', '', ''];

    // set the first player to move
    currentPlayer = "X";
  };

  $(".square").on('click', squareClick);

  $('button').on('click', resetBoard); // reset button logic


  // }); --- used to close $(document).ready function

  // var checkWinner = function checkWinner(num1, num2, moves) {
  //  var winner = null;

// });

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

   updateCell = function updateCell(token, gameID, game) {
     // var token = $(this).children('[name="token"]').val();
     // var id = $('#mark-id').val();
     alert('we got to updateCell');
     var data = wrap('game', wrap('cell', form2object(this)));
     // e.preventDefault();
     tttapi.markCell(id, data, token, callback);
   };

  // $('.square').on('click', function(e) {
  //    alert('we got to mark-cell function');
  //    // var token = $(this).children('[name="token"]').val();
  //    // var id = $('#mark-id').val();
  //    squareClick();
  //    var data = wrap('game', wrap('cell', form2object(this)));
  //    e.preventDefault();
  //    tttapi.markCell(id, data, token, callback);
  // });


  // $('#mark-cell').on('submit', function(e) {
  //   var token = $(this).children('[name="token"]').val();
  //   var id = $('#mark-id').val();
  //   alert('we got to mark-cell function');
  //   var data = wrap('game', wrap('cell', form2object(this)));
  //   e.preventDefault();
  //   tttapi.markCell(id, data, token, callback);
  // });

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

});

// async.whilst(
//   gameShouldContinue,
//   playTurn,
//   gameDone);
