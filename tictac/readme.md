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

The code is not documented well.
