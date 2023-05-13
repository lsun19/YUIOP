// LIYU SUN_CMPM 120
// YUI op.
// 25-30 HOURS
/* 
   CITATIONS:
        Music generated by Mubert https://mubert.com/render

        Menu Art        : https://github.com/photonstorm/phaser3-examples/blob/master/public/src/game%20objects/sprites/create%20from%20config.js
        Play Music      : https://github.com/photonstorm/phaser3-examples/blob/master/public/src/audio/Web%20Audio/play%20audio%20file.js
        FSM             : https://github.com/nathanaltice/FSM
        

        I, Li-Yu Sun, hereby assert a claim of co-authorship and joint ownership in relation to the artworks created through a collaborative process involving my creative input and the utilization of Stable Diffusion AI. I contend that these artworks are the result of a unique synergy between my artistic vision, interpretation, and the algorithmic outputs generated by Stable Diffusion AI.

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
const paddingSize = 100;

// def globals for functional var
let level;
let highScore;
let newHighScore = false;

// reserve keyboard variables
let keyW, keyA, keyS, keyD, keyY, keyU, keyI, keyO, keyP;