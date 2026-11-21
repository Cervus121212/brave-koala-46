'use strict';
/* Night Market — Spot the Difference: game state, timer, score and loop.
   States: start -> play -> levelClear -> play ... -> win, plus gameOver
   when the 90-second timer runs out. Shot mode freezes the timer so a
   screenshot render is deterministic. */

var game = {
  state: 'start',
  levelIndex: 0,
  found: LEVELS[0].differences.map(function () { return false; }),
  combo: 0,
  score: 0,
  timeLeft: LEVEL_TIME_SECONDS,
  levelBonus: 0,
  shake: 0,
  message: '',
  messageGood: true,
  shotMode: false
};

window.__game = game;
window.__errors = [];
window.addEventListener('error', function (ev) {
  window.__errors.push(String(ev.message || ev.error || 'unknown error'));
});

function resetLevel(levelIndex) {
  game.levelIndex = levelIndex;
  game.found = LEVELS[levelIndex].differences.map(function () { return false; });
  game.combo = 0;
  game.timeLeft = LEVEL_TIME_SECONDS;
  game.levelBonus = 0;
  game.message = '';
}

var spotActions = {
  startGame: function () {
    resetLevel(0);
    game.state = 'play';
  },
  completeLevel: function () {
    game.levelBonus = Math.round(game.timeLeft) * 5;
    game.score += game.levelBonus;
    game.state = 'levelClear';
  },
  advanceLevel: function () {
    if (game.levelIndex >= LEVELS.length - 1) {
      game.state = 'win';
      return;
    }
    resetLevel(game.levelIndex + 1);
    game.state = 'play';
  },
  restartLevel: function () {
    resetLevel(game.levelIndex);
    game.state = 'play';
  },
  jumpToLevel: function (levelIndex) {
    if (levelIndex < 0 || levelIndex >= LEVELS.length) return;
    resetLevel(levelIndex);
    game.state = 'play';
  },
  useHint: function () {
    if (game.state !== 'play') return;
    var level = LEVELS[game.levelIndex];
    for (var i = 0; i < level.differences.length; i++) {
      if (!game.found[i]) {
        game.found[i] = true;
        game.score = Math.max(0, game.score - HINT_POINT_COST);
        game.message = 'Hint: ' + level.differences[i].label + '  (−50 pts)';
        game.messageGood = true;
        if (game.found.every(Boolean)) spotActions.completeLevel();
        return;
      }
    }
  }
};

function startSpotGame() {
  var canvas = document.getElementById('game-canvas');
  var ctx = canvas.getContext('2d');
  attachSpotInput(canvas, game, spotActions);
  var last = performance.now();
  function frame(now) {
    // Wall-clock delta (clamped to 1s so a stalled frame cannot eat the
    // whole timer, but slow headless rendering cannot slow the timer down).
    var dt = Math.min(1, (now - last) / 1000);
    last = now;
    if (game.state === 'play' && !game.shotMode) {
      game.timeLeft -= dt;
      if (game.timeLeft <= 0) {
        game.timeLeft = 0;
        game.state = 'gameOver';
      }
    }
    if (game.shake > 0) game.shake -= 1;
    drawGameFrame(ctx, game);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', startSpotGame);
