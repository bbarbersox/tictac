This is the readme file for the tictac code game.

The user interface is primarly made up of a number of divs
that are tied to a container.  The size of the divs are proportional
to size of the container and then positions relatively to get the
proper positioning.

There are still formatting issues to be dealt with and cleaned
up.

The game works successfully on the PC.

The game board and game environment initializes properly.  Moves are
reflected on the game board and in an array used for tracking (and
ultimately to be passed to mar-cell handler ajax interface - this
is not currently working - the object is being populated properly,
but it is being pass through to mark-cell function).

Other functions such as identifying winners, ties, and uncomplete games
all work locally.

The functions are registering, player login, and create game using
the ajax apis (provided by Antony) are working.

My game logic was reworkd a few times.  The first was when I moved
from a winning combination check (which seem to be working but later
found there were issues) to a brute force check.  Even then it was
largely rewritten by Matt as I ran into event handler (was turning them
on and off) issues we thin.  He rewrote it never to turn event handlers
off.

The wireframe for this project is in tictactoewireframe.jpg


              TIC TAC TOE Use Cases

board initialization/reset
  reset all text in each square to “”
  reset all square to have event listeners set to on
  reset tracking array
  reset all player information


player & game initialization
  create a player (email, password) on the server
  login to the server (email, password) - receive back a token
  create a game on the server - receive back a game token
  assign player as X player or O player (not impelmented)

use an array within an array to track the board : 3 x 3 array

when square is selected
  put an  X or O onto the screen, after checking if player is X player or O player
  Update tracking array to indicate square has an X or O in it
  remove the event listener from that square
  use ajax to inform server of game move
  check to see if there is a winner

Winner Checks
  perform brute force checks to see if either player has 3 squares in a row
  inform user if winner is detected
  update server that the game is complete, and win was detected
  reset the game environment

Tie checks
  if no winner detected to see if more moves are possible (open squares remain)
  inform user if tie is detected
  update server that the game is complete, and tie was detected
  reset the game environment

Prepare for next move
  if no winner or tie is detected, wait for the next square to be click
  inform players which player goes next
