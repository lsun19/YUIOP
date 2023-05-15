class GG extends Phaser.Scene 
{
    constructor() 
    {
        super('ggScene');
    }

    create() 
    {
        // check for high score in local storage
        // uncomment console.log statements if you need to debug local storage
        if(localStorage.getItem('hiscore') != null) 
        {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            //console.log(`storedScore: ${storedScore}`);
            // see if current score is higher than stored score
            if(level > storedScore) {
                //console.log(`New high score: ${level}`);
                localStorage.setItem('hiscore', level.toString());
                highScore = level;
                newHighScore = true;
            } else {
                //console.log('No new high score :/');
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } 
        else 
        {
            //console.log('No high score stored. Creating new.');
            highScore = level;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }

        // add GAME OVER text
        if(newHighScore) 
        {
            this.add.bitmapText(centerX, centerY - textSpacer, 'SLN', 'New Hi-Score!', 25).setOrigin(0.5);
        }
        this.add.bitmapText(centerX, centerY, 'SLN', `You've survived for ${level}s`, 30).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer, 'SLN', `This browser's best: ${highScore}s`, 15).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + textSpacer*2, 'SLN', `Press F to Restart`, 20).setOrigin(0.5);

        // set up cursor keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update() 
    {
        if (Phaser.Input.Keyboard.JustDown(keyF)) 
        {

            // start next scene
            this.scene.start('playScene');
        }
    }
}