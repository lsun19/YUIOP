class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    create()
    {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, centerY, 'SLN', 'YUI op.', 64).setOrigin(0.5).setTint(0xff0000);
        let title02 = this.add.bitmapText(centerX, centerY, 'SLN', 'YUI op.', 64).setOrigin(0.5).setTint(0xff00ff).setBlendMode('SCREEN');
        let title03 = this.add.bitmapText(centerX, centerY, 'SLN', 'YUI op.', 64).setOrigin(0.5).setTint(0xffff00).setBlendMode('ADD');
       
        this.add.bitmapText(centerX, centerY + textSpacer*2, 'SLN', 'Press F to Start', 36).setOrigin(0.5);
        this.add.bitmapText(centerX, hght - textSpacer*2, 'SLN', 'LIYU SUN', 16).setOrigin(0.5);

        // set up audio, play bgm
        this.bgm = this.sound.add('backgroundMusic', 
        { 
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        // title text tweens
        let yoyoTweenA = this.tweens.add
        ({
            targets: title01,
            duration: 2500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1
        });

        yoyoTweenA.on('yoyo', () => { this.cameras.main.shake(100, 0.0025); });
        let yoyoTweenB = this.tweens.add
        ({
            targets: title02,
            duration: 2500,
            angle: { from: 1, to: -1 },
            yoyo: true,
            repeat: -1
        });
        yoyoTweenB.on('yoyo', () => { this.cameras.main.shake(100, 0.0025); });

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update()
    {
        // check for F input
        if (Phaser.Input.Keyboard.JustDown(keyF)) 
        {
            // let textureManager = this.textures;
            // // take snapshot of the entire game viewport
            // // https://newdocs.phaser.io/docs/3.55.2/Phaser.Renderer.WebGL.WebGLRenderer#snapshot
            // // .snapshot(callback, type, encoderOptions)
            // // the image is automatically passed to the callback
            // this.game.renderer.snapshot((snapshotImage) => 
            // {
            //     // make sure an existing texture w/ that key doesn't already exist
            //     if(textureManager.exists('titlesnapshot')) 
            //     {
            //         textureManager.remove('titlesnapshot');
            //     }
            //     // take the snapshot img returned from callback and add to texture manager
            //     textureManager.addImage('titlesnapshot', snapshotImage);
            // });
            
            // start next scene
            this.scene.start('playScene');
        }
    }
}