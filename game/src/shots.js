'use strict';
/* Night Market — Spot the Difference: deterministic screenshot states.
   ?shot=cover  level 1 mid-game, 3 of 7 found (red markers + "4 REMAIN")
   ?shot=start  title screen
   ?shot=level2 level 2 mid-game, 2 of 7 found
   ?shot=win    final win screen
   These are real renders of the game code, with the timer frozen. */

function applyShotState() {
  var params = new URLSearchParams(window.location.search);
  var shot = params.get('shot');
  if (!shot || SHOT_STATES.indexOf(shot) === -1) return;
  window.__shot = shot;
  game.shotMode = true;
  if (shot === 'cover') {
    resetLevel(0);
    game.found[0] = true;
    game.found[1] = true;
    game.found[2] = true;
    game.combo = 3;
    game.score = 300;
    game.timeLeft = 73;
    game.message = 'Found: A cat appears on the roof  (+100)';
    game.messageGood = true;
    game.state = 'play';
  } else if (shot === 'start') {
    resetLevel(0);
    game.state = 'start';
  } else if (shot === 'level2') {
    resetLevel(1);
    game.found[0] = true;
    game.found[1] = true;
    game.combo = 2;
    game.score = 500;
    game.timeLeft = 61;
    game.message = 'Found: Coral turns pink  (+100)';
    game.messageGood = true;
    game.state = 'play';
  } else if (shot === 'win') {
    resetLevel(2);
    game.found = LEVELS[2].differences.map(function () { return true; });
    game.score = 2150;
    game.timeLeft = 42;
    game.state = 'win';
  }
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.title = 'SHOT-READY';
    });
  });
}

document.addEventListener('DOMContentLoaded', applyShotState);
