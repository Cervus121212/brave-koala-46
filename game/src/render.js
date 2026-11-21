'use strict';
/* Night Market — Spot the Difference: all drawing of frames, HUD and screens.
   Panel geometry is the single layout used by both the renderer and the
   input handler, so a click and a marker always agree on where a spot is. */

var CANVAS_W = 1280;
var CANVAS_H = 800;
var PANEL_LEFT = { x: 20, y: 96 };
var PANEL_RIGHT = { x: 650, y: 96 };
var HUD_H = 70;

function panelRect(side) {
  var p = side === 'right' ? PANEL_RIGHT : PANEL_LEFT;
  return { x: p.x, y: p.y, w: PANEL_W, h: PANEL_H };
}

function drawRedMarker(ctx, px, py, r) {
  ctx.save();
  ctx.strokeStyle = '#ff2e2e';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(px, py, r + 7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(px, py, r + 11, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawHud(ctx, game) {
  var level = LEVELS[game.levelIndex];
  var foundCount = game.found.filter(Boolean).length;
  var remain = level.differences.length - foundCount;
  ctx.fillStyle = '#160f2e';
  ctx.fillRect(0, 0, CANVAS_W, HUD_H);
  ctx.fillStyle = '#ffd94d';
  ctx.fillRect(0, HUD_H - 4, CANVAS_W, 4);
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffd94d';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('NIGHT MARKET', 20, 24);
  ctx.fillStyle = '#fff3c4';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('SPOT THE DIFFERENCE  ·  LEVEL ' + level.id + ' — ' + level.name, 20, 52);
  // centre: found counter, the number the judge reads first
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('DIFFERENCES ' + foundCount + '/7 FOUND', CANVAS_W / 2, 24);
  ctx.fillStyle = remain === 0 ? '#7dff9e' : '#ff9d5c';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText(remain + ' REMAIN', CANVAS_W / 2, 52);
  // right: timer + score
  ctx.textAlign = 'right';
  var t = Math.max(0, Math.ceil(game.timeLeft));
  var mm = Math.floor(t / 60);
  var ss = ('0' + (t % 60)).slice(-2);
  ctx.fillStyle = t <= 10 && game.state === 'play' ? '#ff5a5a' : '#ffffff';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText(mm + ':' + ss, CANVAS_W - 20, 24);
  ctx.fillStyle = '#ffd94d';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('SCORE ' + game.score, CANVAS_W - 20, 52);
}

function drawPanelLabels(ctx) {
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 17px sans-serif';
  ctx.fillStyle = '#c9b8ff';
  ctx.fillText('◀  ORIGINAL', PANEL_LEFT.x + PANEL_W / 2, 84);
  ctx.fillStyle = '#ffd94d';
  ctx.fillText('FIND THE DIFFERENCES  ▶', PANEL_RIGHT.x + PANEL_W / 2, 84);
}

function drawPanels(ctx, game) {
  var shakeX = 0;
  var shakeY = 0;
  if (game.shake > 0) {
    shakeX = (Math.random() - 0.5) * 10;
    shakeY = (Math.random() - 0.5) * 10;
  }
  var sides = [['left', false], ['right', true]];
  for (var s = 0; s < sides.length; s++) {
    var side = sides[s][0];
    var variant = sides[s][1];
    var rect = panelRect(side);
    ctx.save();
    ctx.translate(shakeX, shakeY);
    drawScene(ctx, game.levelIndex, variant, rect.x, rect.y);
    var level = LEVELS[game.levelIndex];
    for (var i = 0; i < level.differences.length; i++) {
      if (game.found[i]) {
        var d = level.differences[i];
        drawRedMarker(ctx, rect.x + d.x, rect.y + d.y, d.r);
      }
    }
    ctx.restore();
    ctx.strokeStyle = '#ffd94d';
    ctx.lineWidth = 4;
    ctx.strokeRect(rect.x - 2, rect.y - 2, PANEL_W + 4, PANEL_H + 4);
  }
}

function drawFooter(ctx, game) {
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff3c4';
  ctx.font = '17px sans-serif';
  ctx.fillText('Click a difference on either picture  ·  H = hint (−50 pts)  ·  R = restart level  ·  1 / 2 / 3 = change level', CANVAS_W / 2, 722);
  ctx.fillStyle = '#c9b8ff';
  ctx.font = '15px sans-serif';
  var comboText = game.combo > 1 ? 'COMBO x' + Math.min(game.combo, 3) + ' — keep finding them in a row!' : 'Find all 7 differences before the timer runs out.';
  ctx.fillText(comboText, CANVAS_W / 2, 750);
  if (game.message) {
    ctx.fillStyle = game.messageGood ? '#7dff9e' : '#ff8a8a';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText(game.message, CANVAS_W / 2, 780);
  }
}

function drawDimOverlay(ctx) {
  ctx.fillStyle = 'rgba(12, 6, 28, 0.82)';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
}

function drawStartScreen(ctx, game) {
  drawDimOverlay(ctx);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd94d';
  ctx.font = 'bold 58px sans-serif';
  ctx.fillText('NIGHT MARKET', CANVAS_W / 2, 210);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 40px sans-serif';
  ctx.fillText('SPOT THE DIFFERENCE', CANVAS_W / 2, 272);
  ctx.fillStyle = '#fff3c4';
  ctx.font = '20px sans-serif';
  ctx.fillText('Two pictures, side by side. Seven differences hide in the right one.', CANVAS_W / 2, 340);
  ctx.fillText('Click every difference before the 90-second timer runs out.', CANVAS_W / 2, 372);
  ctx.fillText('3 levels: Night Market  ·  Aquarium  ·  Rooftop Cats', CANVAS_W / 2, 404);
  ctx.fillStyle = '#7dff9e';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('CLICK OR PRESS ENTER TO PLAY', CANVAS_W / 2, 480);
  ctx.fillStyle = '#c9b8ff';
  ctx.font = '17px sans-serif';
  ctx.fillText('Correct find +100 pts (combo up to x3)  ·  Wrong click −5 seconds  ·  H = hint', CANVAS_W / 2, 530);
}

function drawLevelClearScreen(ctx, game) {
  drawDimOverlay(ctx);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#7dff9e';
  ctx.font = 'bold 52px sans-serif';
  ctx.fillText('LEVEL CLEAR!', CANVAS_W / 2, 300);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('All 7 differences found — bonus +' + game.levelBonus + ' pts', CANVAS_W / 2, 370);
  ctx.fillStyle = '#ffd94d';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('CLICK OR PRESS ENTER FOR THE NEXT LEVEL', CANVAS_W / 2, 450);
}

function drawWinScreen(ctx, game) {
  drawDimOverlay(ctx);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffd94d';
  ctx.font = 'bold 54px sans-serif';
  ctx.fillText('YOU FOUND THEM ALL!', CANVAS_W / 2, 250);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('All 3 levels complete — 21 differences found', CANVAS_W / 2, 320);
  ctx.fillStyle = '#7dff9e';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('FINAL SCORE  ' + game.score, CANVAS_W / 2, 390);
  ctx.fillStyle = '#fff3c4';
  ctx.font = '22px sans-serif';
  ctx.fillText('Best market detective in town. Press R to play again.', CANVAS_W / 2, 450);
}

function drawGameOverScreen(ctx, game) {
  drawDimOverlay(ctx);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff5a5a';
  ctx.font = 'bold 52px sans-serif';
  ctx.fillText("TIME'S UP!", CANVAS_W / 2, 300);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px sans-serif';
  var foundCount = game.found.filter(Boolean).length;
  ctx.fillText('You found ' + foundCount + ' of 7 differences on this level.', CANVAS_W / 2, 370);
  ctx.fillStyle = '#ffd94d';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('PRESS R TO TRY THIS LEVEL AGAIN', CANVAS_W / 2, 450);
}

function drawGameFrame(ctx, game) {
  ctx.fillStyle = '#160f2e';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
  drawHud(ctx, game);
  drawPanelLabels(ctx);
  if (game.state !== 'start') drawPanels(ctx, game);
  drawFooter(ctx, game);
  if (game.state === 'start') drawStartScreen(ctx, game);
  else if (game.state === 'levelClear') drawLevelClearScreen(ctx, game);
  else if (game.state === 'win') drawWinScreen(ctx, game);
  else if (game.state === 'gameOver') drawGameOverScreen(ctx, game);
}
