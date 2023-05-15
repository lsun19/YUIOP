// LIYU SUN_CMPM 120
// YUI op.
// 25-30 HOURS
/* 
   CITATIONS:
        Music generated by Mubert https://mubert.com/render

        Play Music          : https://github.com/photonstorm/phaser3-examples/blob/master/public/src/audio/Web%20Audio/play%20audio%20file.js
        Menu Bitmap         : https://github.com/nathanaltice/Paddle-Parkour-P360
        FSM                 : https://github.com/nathanaltice/FSM
        "PressStart2P" Font : https://www.fontsc.com/font/press-start-2p
        Loading Bar         : https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
    
    Creative Tilt Justification:
        The Application of Finite State Machine to manage and organize character behaviors


*/

'use strict';

let config =
{
    type    : Phaser.AUTO,
    width   : 1080,
    height  : 720,
    scale: 
    {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: 
    {
        default: 'arcade',
        arcade: 
        {
            debug: true,
            gravity: 
            {
                x: 0,
                y: 0
            }
        }
    },
    scene   : [ Load, Menu, Play, GG ] 
}

let game = new Phaser.Game(config);

// def globals for positioning
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let wdth = game.config.width;
let hght = game.config.height;
let YcdEnd = true;
let UcdEnd = true;
let OcdEnd = true;
const textSpacer  = 64;
const paddingSize = 100;
const enemyAwdth = 200;
const enemyAhght = 150;
const Ycd    = 1000;
const Ucd    = 2000;
const Ocd    = 300;


// def globals for functional var
let level;
let highScore;
let newHighScore = false;

// reserve keyboard variables
let keyW, keyA, keyS, keyD, keyY, keyU, keyI, keyO, keyP, keyF;