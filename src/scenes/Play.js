class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    create()
    {
        // setup keyboard input
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // add new Yoko to scene (scene, x, y, texture, frame, direction)
        this.yoko = new Yoko(this, paddingSize, centerY, 'yoko_atlas', 'yokoIdle1');
        
        // initialize state machine managing yoko (initial state, possible states, state args[])
        this.yokoFSM = new StateMachine('idle', 
        {
            idle: new IdleState(),
            move: new MoveState(),
            guard: new GuardState(),
            charge: new ChargeState(),
        }, [this, this.yoko]);

        this.yoko.setDepth(1);  

        this.anims.create
        ({ 
            key: 'idling', 
            frames: this.anims.generateFrameNames('yoko_atlas', {      
                prefix: 'yokoIdle',
                start: 1,
                end: 7,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 3,
            repeat: -1 
        });

        this.anims.create
        ({ 
            key: 'flying', 
            frames: this.anims.generateFrameNames('yoko_atlas', {      
                prefix: 'yokofly',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 3,
            repeat: -1 
        });

        this.anims.create
        ({ 
            key: 'guarding', 
            frames: this.anims.generateFrameNames('yoko_atlas', {      
                prefix: 'yokoguard',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 10,
            repeat: 0 
        });

        this.anims.create
        ({ 
            key: 'charging', 
            frames: this.anims.generateFrameNames('yoko_atlas', {      
                prefix: 'yokoCharge',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 10,
            repeat: 0 
        });

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 1800, 720, 'background').setOrigin(0, 0);

    }


    update()
    {   
        this.yokoFSM.step();

        this.starfield.tilePositionX += 0.5;  // update tile sprite
    }

}