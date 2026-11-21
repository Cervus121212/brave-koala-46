'use strict';
/* Night Market — Spot the Difference: game data.
   One source of truth: every level lists its 7 differences as panel-local
   coordinates (panel is 610 x 600). The renderer draws the right-hand picture
   from the same list, so a difference and its marker always line up. */

var PANEL_W = 610;
var PANEL_H = 600;
var LEVEL_TIME_SECONDS = 90;
var POINTS_PER_FIND = 100;
var WRONG_CLICK_TIME_PENALTY = 5;
var HINT_POINT_COST = 50;

var LEVELS = [
  {
    id: 1,
    name: 'NIGHT MARKET',
    subtitle: 'Lantern stalls on a busy night street',
    skyTop: '#1c1440',
    skyBottom: '#3d1f5e',
    differences: [
      { x: 118, y: 92,  r: 26, label: 'Lantern turns green' },
      { x: 305, y: 158, r: 24, label: 'Sign letter changes' },
      { x: 492, y: 66,  r: 24, label: 'A cat appears on the roof' },
      { x: 88,  y: 330, r: 30, label: 'Umbrella disappears' },
      { x: 540, y: 210, r: 20, label: 'Extra star in the sky' },
      { x: 250, y: 420, r: 26, label: 'Awning stripe turns blue' },
      { x: 430, y: 470, r: 26, label: 'Stall flag changes colour' }
    ]
  },
  {
    id: 2,
    name: 'AQUARIUM',
    subtitle: 'A quiet tank full of fish and coral',
    skyTop: '#062a4a',
    skyBottom: '#0e6b8a',
    differences: [
      { x: 140, y: 150, r: 26, label: 'Orange fish disappears' },
      { x: 330, y: 470, r: 28, label: 'Coral turns pink' },
      { x: 500, y: 120, r: 22, label: 'Extra bubble rises' },
      { x: 90,  y: 520, r: 24, label: 'Starfish appears on the sand' },
      { x: 420, y: 300, r: 24, label: 'Shell changes colour' },
      { x: 250, y: 380, r: 26, label: 'Seaweed grows taller' },
      { x: 540, y: 430, r: 24, label: 'Treasure chest opens' }
    ]
  },
  {
    id: 3,
    name: 'ROOFTOP CATS',
    subtitle: 'Cats watching the sunset from the roofs',
    skyTop: '#ff9a5a',
    skyBottom: '#7a3b6e',
    differences: [
      { x: 120, y: 300, r: 26, label: 'A black cat appears' },
      { x: 480, y: 110, r: 22, label: 'Bird flies away' },
      { x: 520, y: 70,  r: 26, label: 'Moon turns full' },
      { x: 250, y: 250, r: 24, label: 'Window lights up' },
      { x: 360, y: 330, r: 26, label: 'Laundry turns red' },
      { x: 80,  y: 180, r: 24, label: 'Chimney smoke appears' },
      { x: 430, y: 190, r: 22, label: 'Antenna grows taller' }
    ]
  }
];

var SHOT_STATES = ['cover', 'start', 'level2', 'win'];
