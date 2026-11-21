'use strict';
/* Night Market — Spot the Difference: mouse + keyboard input.
   A click is tested against the same panel geometry and the same
   difference list the renderer uses, on either picture. */

function attachSpotInput(canvas, game, actions) {
  function canvasPoint(clientX, clientY) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (CANVAS_W / rect.width),
      y: (clientY - rect.top) * (CANVAS_H / rect.height)
    };
  }

  function panelAt(point) {
    var left = panelRect('left');
    var right = panelRect('right');
    if (point.x >= left.x && point.x <= left.x + left.w && point.y >= left.y && point.y <= left.y + left.h) {
      return { side: 'left', localX: point.x - left.x, localY: point.y - left.y };
    }
    if (point.x >= right.x && point.x <= right.x + right.w && point.y >= right.y && point.y <= right.y + right.h) {
      return { side: 'right', localX: point.x - right.x, localY: point.y - right.y };
    }
    return null;
  }

  function handlePictureClick(point) {
    if (game.state !== 'play') return;
    var hit = panelAt(point);
    if (!hit) return;
    var level = LEVELS[game.levelIndex];
    var best = -1;
    var bestDist = Infinity;
    for (var i = 0; i < level.differences.length; i++) {
      if (game.found[i]) continue;
      var d = level.differences[i];
      var dist = Math.hypot(hit.localX - d.x, hit.localY - d.y);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    if (best >= 0 && bestDist <= level.differences[best].r + 14) {
      game.found[best] = true;
      game.combo += 1;
      var mult = Math.min(game.combo, 3);
      game.score += POINTS_PER_FIND * mult;
      game.message = 'Found: ' + level.differences[best].label + '  (+' + (POINTS_PER_FIND * mult) + ')';
      game.messageGood = true;
      if (game.found.every(Boolean)) actions.completeLevel();
    } else {
      game.combo = 0;
      game.timeLeft = Math.max(0, game.timeLeft - WRONG_CLICK_TIME_PENALTY);
      game.shake = 14;
      game.message = 'Not a difference!  −5 seconds';
      game.messageGood = false;
    }
  }

  canvas.addEventListener('click', function (ev) {
    if (game.state === 'start') {
      actions.startGame();
      return;
    }
    if (game.state === 'levelClear') {
      actions.advanceLevel();
      return;
    }
    handlePictureClick(canvasPoint(ev.clientX, ev.clientY));
  });

  window.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' || ev.key === ' ') {
      if (game.state === 'start') actions.startGame();
      else if (game.state === 'levelClear') actions.advanceLevel();
      ev.preventDefault();
      return;
    }
    if (game.state !== 'play' && game.state !== 'gameOver' && game.state !== 'win') return;
    var k = ev.key.toLowerCase();
    if (k === 'h') actions.useHint();
    else if (k === 'r') actions.restartLevel();
    else if (k === '1' || k === '2' || k === '3') actions.jumpToLevel(Number(k) - 1);
  });
}
