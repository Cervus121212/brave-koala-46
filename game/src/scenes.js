'use strict';
/* Night Market — Spot the Difference: procedural scene art.
   Every picture is drawn from code, no outside assets. Each scene is drawn
   twice (left = original, right = variant) by the same function; the
   `variant` flag flips exactly the 7 differences listed in config.js, so the
   two pictures stay near-identical except for those spots. */

function drawSky(ctx, level, ox, oy) {
  var g = ctx.createLinearGradient(0, oy, 0, oy + PANEL_H);
  g.addColorStop(0, level.skyTop);
  g.addColorStop(1, level.skyBottom);
  ctx.fillStyle = g;
  ctx.fillRect(ox, oy, PANEL_W, PANEL_H);
}

function drawFiveStar(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  for (var i = 0; i < 5; i++) {
    var a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    var a2 = a + Math.PI / 5;
    ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
    ctx.lineTo(x + Math.cos(a2) * r * 0.45, y + Math.sin(a2) * r * 0.45);
  }
  ctx.closePath();
  ctx.fill();
}

function drawLantern(ctx, x, y, r, color) {
  ctx.strokeStyle = '#2a1a08';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x, y - r - 12);
  ctx.lineTo(x, y - r);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, r, r * 1.15, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffd94d';
  ctx.fillRect(x - 3, y - r - 8, 6, 5);
  ctx.fillRect(x - 3, y + r + 3, 6, 5);
  ctx.strokeStyle = 'rgba(255,217,77,0.85)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - r + 4, y);
  ctx.lineTo(x + r - 4, y);
  ctx.stroke();
}

function drawSittingCat(ctx, x, y, s, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, 16 * s, 20 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y - 26 * s, 12 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - 10 * s, y - 32 * s);
  ctx.lineTo(x - 12 * s, y - 46 * s);
  ctx.lineTo(x - 2 * s, y - 36 * s);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + 10 * s, y - 32 * s);
  ctx.lineTo(x + 12 * s, y - 46 * s);
  ctx.lineTo(x + 2 * s, y - 36 * s);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + 14 * s, y + 14 * s);
  ctx.quadraticCurveTo(x + 34 * s, y + 6 * s, x + 30 * s, y - 14 * s);
  ctx.quadraticCurveTo(x + 26 * s, y + 2 * s, x + 12 * s, y + 8 * s);
  ctx.closePath();
  ctx.fill();
}

function drawFish(ctx, x, y, s, body, fin) {
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.ellipse(x, y, 26 * s, 14 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = fin;
  ctx.beginPath();
  ctx.moveTo(x - 22 * s, y);
  ctx.lineTo(x - 38 * s, y - 12 * s);
  ctx.lineTo(x - 38 * s, y + 12 * s);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#10202e';
  ctx.beginPath();
  ctx.arc(x + 14 * s, y - 3 * s, 3 * s, 0, Math.PI * 2);
  ctx.fill();
}

function drawBubble(ctx, x, y, r) {
  ctx.strokeStyle = 'rgba(255,255,255,0.8)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.beginPath();
  ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.25, 0, Math.PI * 2);
  ctx.fill();
}

/* ---- Level 1: Night Market ---- */
function drawNightMarket(ctx, variant, ox, oy) {
  var level = LEVELS[0];
  drawSky(ctx, level, ox, oy);
  var starSpots = [[40, 40], [200, 30], [330, 55], [470, 35], [580, 60], [90, 130], [380, 110]];
  for (var i = 0; i < starSpots.length; i++) {
    drawFiveStar(ctx, ox + starSpots[i][0], oy + starSpots[i][1], 5, '#ffe9a8');
  }
  if (variant) drawFiveStar(ctx, ox + 540, oy + 210, 9, '#ffe9a8'); // diff 5: extra star
  // moon
  ctx.fillStyle = '#ffe9a8';
  ctx.beginPath();
  ctx.arc(ox + 560, oy + 45, 22, 0, Math.PI * 2);
  ctx.fill();
  // distant buildings
  ctx.fillStyle = '#241640';
  ctx.fillRect(ox, oy + 150, 150, 190);
  ctx.fillRect(ox + 430, oy + 130, 180, 210);
  ctx.fillStyle = '#ffd94d';
  ctx.fillRect(ox + 30, oy + 180, 16, 16);
  ctx.fillRect(ox + 90, oy + 220, 16, 16);
  ctx.fillRect(ox + 470, oy + 170, 16, 16);
  ctx.fillRect(ox + 540, oy + 210, 16, 16);
  // street
  ctx.fillStyle = '#4a3560';
  ctx.fillRect(ox, oy + 340, PANEL_W, 260);
  ctx.fillStyle = '#5d4472';
  ctx.fillRect(ox, oy + 340, PANEL_W, 8);
  // festival bunting across the street (same on both pictures)
  ctx.strokeStyle = '#1c1024';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ox, oy + 270);
  ctx.quadraticCurveTo(ox + 305, oy + 300, ox + PANEL_W, oy + 270);
  ctx.stroke();
  var buntColors = ['#e23b2e', '#ffd94d', '#4fc3f7', '#2ea84f'];
  for (var b = 0; b < 12; b++) {
    var bx = 25 + b * 50;
    var by = 270 + Math.sin((bx / PANEL_W) * Math.PI) * 18;
    ctx.fillStyle = buntColors[b % 4];
    ctx.beginPath();
    ctx.moveTo(ox + bx - 10, oy + by);
    ctx.lineTo(ox + bx + 10, oy + by);
    ctx.lineTo(ox + bx, oy + by + 20);
    ctx.closePath();
    ctx.fill();
  }
  // crates stacked by the stalls (same on both pictures)
  ctx.fillStyle = '#a06a35';
  ctx.fillRect(ox + 120, oy + 530, 30, 30);
  ctx.fillRect(ox + 120, oy + 500, 30, 30);
  ctx.fillStyle = '#8a5a2b';
  ctx.fillRect(ox + 380, oy + 530, 30, 30);
  // sign board (diff 2: letter changes)
  ctx.fillStyle = '#7a2d1e';
  ctx.fillRect(ox + 205, oy + 128, 200, 60);
  ctx.strokeStyle = '#ffd94d';
  ctx.lineWidth = 4;
  ctx.strokeRect(ox + 205, oy + 128, 200, 60);
  ctx.fillStyle = '#fff3c4';
  ctx.font = 'bold 26px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(variant ? 'PASOR MALAM' : 'PASAR MALAM', ox + 305, oy + 158);
  // lantern row (diff 1: lantern at 118,92 turns green)
  var lanternX = [60, 118, 176, 234, 292, 350, 408, 466, 524];
  for (var l = 0; l < lanternX.length; l++) {
    var lx = lanternX[l];
    var col = '#e23b2e';
    if (variant && lx === 118) col = '#2ea84f';
    drawLantern(ctx, ox + lx, oy + 92, 15, col);
  }
  // roof line + cat (diff 3: cat appears on the roof, right only)
  ctx.fillStyle = '#33204e';
  ctx.fillRect(ox + 440, oy + 52, 140, 14);
  if (variant) drawSittingCat(ctx, ox + 492, oy + 66, 0.8, '#14101f');
  // left stall with umbrella (diff 4: umbrella gone on the right)
  ctx.fillStyle = '#8a5a2b';
  ctx.fillRect(ox + 40, oy + 380, 130, 130);
  ctx.fillStyle = '#c98a3d';
  ctx.fillRect(ox + 40, oy + 380, 130, 18);
  if (!variant) {
    ctx.fillStyle = '#e23b2e';
    ctx.beginPath();
    ctx.moveTo(ox + 28, oy + 330);
    ctx.quadraticCurveTo(ox + 88, oy + 288, ox + 148, oy + 330);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#7a2d1e';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(ox + 88, oy + 330);
    ctx.lineTo(ox + 88, oy + 382);
    ctx.stroke();
  }
  // middle stall, awning stripes (diff 6: stripe turns blue on the right)
  ctx.fillStyle = '#6e3b8a';
  ctx.fillRect(ox + 210, oy + 400, 160, 110);
  for (var s = 0; s < 5; s++) {
    ctx.fillStyle = (s % 2 === 0) ? (variant ? '#2e6fb0' : '#e23b2e') : '#fff3c4';
    ctx.fillRect(ox + 210 + s * 32, oy + 400, 32, 22);
  }
  ctx.fillStyle = '#ffd94d';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('SATE', ox + 290, oy + 460);
  // right stall + flag (diff 7: flag changes colour)
  ctx.fillStyle = '#2e6b4f';
  ctx.fillRect(ox + 420, oy + 400, 150, 110);
  ctx.strokeStyle = '#3a2a18';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(ox + 430, oy + 470);
  ctx.lineTo(ox + 430, oy + 400);
  ctx.stroke();
  ctx.fillStyle = variant ? '#ffd94d' : '#e23b2e';
  ctx.beginPath();
  ctx.moveTo(ox + 430, oy + 400);
  ctx.lineTo(ox + 470, oy + 412);
  ctx.lineTo(ox + 430, oy + 424);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#fff3c4';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('ES TEH', ox + 500, oy + 460);
  // shoppers
  ctx.fillStyle = '#f2c14e';
  ctx.beginPath();
  ctx.arc(ox + 180, oy + 540, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(ox + 166, oy + 554, 28, 44);
  ctx.fillStyle = '#4fc3f7';
  ctx.beginPath();
  ctx.arc(ox + 340, oy + 545, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(ox + 326, oy + 559, 28, 40);
}

/* ---- Level 2: Aquarium ---- */
function drawAquarium(ctx, variant, ox, oy) {
  var level = LEVELS[1];
  drawSky(ctx, level, ox, oy);
  // light rays
  ctx.fillStyle = 'rgba(255,255,255,0.07)';
  ctx.beginPath();
  ctx.moveTo(ox + 120, oy);
  ctx.lineTo(ox + 200, oy);
  ctx.lineTo(ox + 320, oy + 500);
  ctx.lineTo(ox + 180, oy + 500);
  ctx.closePath();
  ctx.fill();
  // bubbles (diff 3: one extra bubble at 500,120 on the right)
  var bubbles = [[80, 200, 8], [200, 120, 6], [350, 180, 9], [450, 260, 7], [560, 200, 6]];
  for (var b = 0; b < bubbles.length; b++) drawBubble(ctx, ox + bubbles[b][0], oy + bubbles[b][1], bubbles[b][2]);
  if (variant) drawBubble(ctx, ox + 500, oy + 120, 10);
  // orange fish (diff 1: gone on the right)
  if (!variant) drawFish(ctx, ox + 140, oy + 150, 1, '#ff8c1a', '#e56b00');
  drawFish(ctx, ox + 300, oy + 220, 0.9, '#ffd94d', '#d9a400');
  drawFish(ctx, ox + 480, oy + 320, 1.1, '#ff5a7a', '#c9184a');
  drawFish(ctx, ox + 200, oy + 300, 0.7, '#7fe3ff', '#2ea8c9');
  // seaweed (diff 6: taller on the right)
  ctx.strokeStyle = '#2ea84f';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  var seaH = variant ? 150 : 90;
  ctx.beginPath();
  ctx.moveTo(ox + 250, oy + 500);
  ctx.quadraticCurveTo(ox + 230, oy + 440, ox + 250, oy + (500 - seaH));
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(ox + 270, oy + 500);
  ctx.quadraticCurveTo(ox + 290, oy + 450, ox + 272, oy + 420);
  ctx.stroke();
  // coral (diff 2: orange -> pink on the right)
  ctx.fillStyle = variant ? '#ff5a9e' : '#ff7a3d';
  ctx.beginPath();
  ctx.moveTo(ox + 330, oy + 500);
  ctx.lineTo(ox + 315, oy + 450);
  ctx.lineTo(ox + 325, oy + 430);
  ctx.lineTo(ox + 340, oy + 455);
  ctx.lineTo(ox + 350, oy + 440);
  ctx.lineTo(ox + 355, oy + 500);
  ctx.closePath();
  ctx.fill();
  // shell (diff 5: purple -> yellow on the right)
  ctx.fillStyle = variant ? '#ffd94d' : '#b06ee8';
  ctx.beginPath();
  ctx.arc(ox + 420, oy + 300, 22, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = variant ? '#d9a400' : '#7a3bb0';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ox + 420, oy + 278);
  ctx.lineTo(ox + 420, oy + 300);
  ctx.stroke();
  // treasure chest (diff 7: opens on the right)
  ctx.fillStyle = '#8a5a2b';
  ctx.fillRect(ox + 505, oy + 430, 70, 40);
  ctx.fillStyle = '#ffd94d';
  ctx.fillRect(ox + 535, oy + 445, 10, 10);
  if (variant) {
    ctx.fillStyle = '#a06a35';
    ctx.fillRect(ox + 505, oy + 400, 70, 26);
    ctx.fillStyle = 'rgba(255,217,77,0.9)';
    ctx.beginPath();
    ctx.moveTo(ox + 515, oy + 430);
    ctx.lineTo(ox + 545, oy + 400);
    ctx.lineTo(ox + 565, oy + 430);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.fillStyle = '#a06a35';
    ctx.fillRect(ox + 505, oy + 408, 70, 24);
  }
  // sand + rocks
  ctx.fillStyle = '#e8d29a';
  ctx.beginPath();
  ctx.moveTo(ox, oy + 500);
  ctx.quadraticCurveTo(ox + 300, oy + 480, ox + PANEL_W, oy + 500);
  ctx.lineTo(ox + PANEL_W, oy + PANEL_H);
  ctx.lineTo(ox, oy + PANEL_H);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#9a8a6a';
  ctx.beginPath();
  ctx.arc(ox + 60, oy + 540, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(ox + 560, oy + 560, 26, 0, Math.PI * 2);
  ctx.fill();
  // starfish (diff 4: appears on the sand, right only)
  if (variant) drawFiveStar(ctx, ox + 90, oy + 520, 18, '#ff8c5a');
}

/* ---- Level 3: Rooftop Cats ---- */
function drawRooftopCats(ctx, variant, ox, oy) {
  var level = LEVELS[2];
  drawSky(ctx, level, ox, oy);
  // sun / moon (diff 3: crescent -> full on the right)
  ctx.fillStyle = '#ffe9a8';
  ctx.beginPath();
  ctx.arc(ox + 520, oy + 70, 26, 0, Math.PI * 2);
  ctx.fill();
  if (!variant) {
    ctx.fillStyle = level.skyTop;
    ctx.beginPath();
    ctx.arc(ox + 532, oy + 62, 22, 0, Math.PI * 2);
    ctx.fill();
  }
  // bird (diff 2: flies away on the right)
  if (!variant) {
    ctx.strokeStyle = '#2a1a30';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(ox + 464, oy + 110);
    ctx.quadraticCurveTo(ox + 472, oy + 100, ox + 480, oy + 110);
    ctx.quadraticCurveTo(ox + 488, oy + 100, ox + 496, oy + 110);
    ctx.stroke();
  }
  // rooftops
  ctx.fillStyle = '#4a2b4d';
  ctx.fillRect(ox, oy + 300, 260, 300);
  ctx.fillRect(ox + 300, oy + 260, 310, 340);
  ctx.fillStyle = '#33204e';
  ctx.fillRect(ox, oy + 290, 260, 14);
  ctx.fillRect(ox + 300, oy + 250, 310, 14);
  // windows (diff 4: one window lights up on the right)
  ctx.fillStyle = '#2a1a30';
  ctx.fillRect(ox + 60, oy + 340, 44, 54);
  ctx.fillRect(ox + 150, oy + 340, 44, 54);
  ctx.fillStyle = variant ? '#ffd94d' : '#2a1a30';
  ctx.fillRect(ox + 228, oy + 223, 44, 54);
  ctx.fillStyle = '#2a1a30';
  ctx.fillRect(ox + 360, oy + 300, 44, 54);
  ctx.fillRect(ox + 470, oy + 300, 44, 54);
  // chimney + smoke (diff 6: smoke appears on the right)
  ctx.fillStyle = '#5d2b3a';
  ctx.fillRect(ox + 60, oy + 150, 40, 140);
  if (variant) {
    ctx.fillStyle = 'rgba(255,240,220,0.85)';
    ctx.beginPath();
    ctx.arc(ox + 80, oy + 130, 12, 0, Math.PI * 2);
    ctx.arc(ox + 72, oy + 108, 9, 0, Math.PI * 2);
    ctx.arc(ox + 88, oy + 92, 7, 0, Math.PI * 2);
    ctx.fill();
  }
  // antenna (diff 7: taller on the right)
  ctx.strokeStyle = '#1c1024';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(ox + 430, oy + 250);
  ctx.lineTo(ox + 430, oy + (variant ? 150 : 190));
  ctx.stroke();
  ctx.strokeStyle = '#ffd94d';
  ctx.beginPath();
  ctx.moveTo(ox + 422, oy + (variant ? 150 : 190));
  ctx.lineTo(ox + 438, oy + (variant ? 150 : 190));
  ctx.stroke();
  // laundry line (diff 5: shirt turns red on the right)
  ctx.strokeStyle = '#1c1024';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ox + 310, oy + 330);
  ctx.lineTo(ox + 420, oy + 330);
  ctx.stroke();
  ctx.fillStyle = variant ? '#e23b2e' : '#4fc3f7';
  ctx.fillRect(ox + 345, oy + 330, 30, 34);
  ctx.fillStyle = '#fff3c4';
  ctx.fillRect(ox + 390, oy + 330, 22, 28);
  // cats on the roofs
  drawSittingCat(ctx, ox + 180, oy + 290, 1, '#f2f2f2');
  drawSittingCat(ctx, ox + 520, oy + 250, 0.9, '#ff8c1a');
  if (variant) drawSittingCat(ctx, ox + 120, oy + 300, 0.9, '#14101f'); // diff 1: black cat appears
  // potted plant
  ctx.fillStyle = '#2ea84f';
  ctx.beginPath();
  ctx.arc(ox + 560, oy + 540, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#c96a2b';
  ctx.fillRect(ox + 545, oy + 550, 30, 22);
}

/* The static picture of a scene is painted once to an offscreen canvas and
   blitted every frame: repainting two full procedural scenes per frame made
   the timer run slow on weak machines. Markers and HUD stay live. */
var sceneCache = {};
function getSceneCanvas(levelIndex, variant) {
  var key = levelIndex + (variant ? '-right' : '-left');
  if (sceneCache[key]) return sceneCache[key];
  var c = document.createElement('canvas');
  c.width = PANEL_W;
  c.height = PANEL_H;
  var ctx = c.getContext('2d');
  drawSceneInto(ctx, levelIndex, variant, 0, 0);
  sceneCache[key] = c;
  return c;
}

function drawSceneInto(ctx, levelIndex, variant, ox, oy) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(ox, oy, PANEL_W, PANEL_H);
  ctx.clip();
  if (levelIndex === 0) drawNightMarket(ctx, variant, ox, oy);
  else if (levelIndex === 1) drawAquarium(ctx, variant, ox, oy);
  else drawRooftopCats(ctx, variant, ox, oy);
  ctx.restore();
}

function drawScene(ctx, levelIndex, variant, ox, oy) {
  ctx.drawImage(getSceneCanvas(levelIndex, variant), ox, oy);
}
