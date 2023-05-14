class Yoko extends Phaser.Physics.Arcade.Sprite 
{
    constructor(scene, x, y, texture, frame) 
    {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, texture, frame); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);            // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system

        this.body.setCollideWorldBounds(true);

        this.yokoVelocity = 500;    // in pixels
        this.shieldCooldown = 300;   
        this.beamCooldown = 300;         
        // this.tint = Math.random() * 0xFFFFFF;   // randomize tint

        // this.sfxNoteY1 = scene.sound.add('sfx_C1');
        // this.sfxNoteY1.volume = 0.1;
        // this.sfxNoteU1 = scene.sound.add('sfx_D1');
        // this.sfxNoteU1.volume = 0.1;
        // this.sfxNoteI1 = scene.sound.add('sfx_E1');
        // this.sfxNoteI1.volume = 0.1;
        // this.sfxNoteO1 = scene.sound.add('sfx_G1');
        // this.sfxNoteO1.volume = 0.1;
        // this.sfxNoteP1 = scene.sound.add('sfx_A1');
        // this.sfxNoteP1.volume = 0.1;
        // this.sfxNoteY2 = scene.sound.add('sfx_C2');
        // this.sfxNoteY2.volume = 0.1;
        // this.sfxNoteU2 = scene.sound.add('sfx_D2');
        // this.sfxNoteU2.volume = 0.1;
        // this.sfxNoteI2 = scene.sound.add('sfx_E2');
        // this.sfxNoteI2.volume = 0.1;
        // this.sfxNoteO2 = scene.sound.add('sfx_G2');
        // this.sfxNoteO2.volume = 0.1;
        // this.sfxNoteP2 = scene.sound.add('sfx_A2');
        // this.sfxNoteP2.volume = 0.1;
        // this.sfxNoteY3 = scene.sound.add('sfx_C3');
        // this.sfxNoteY3.volume = 0.1;
        // this.sfxNoteU3 = scene.sound.add('sfx_D3');
        // this.sfxNoteU3.volume = 0.1;
        // this.sfxNoteI3 = scene.sound.add('sfx_E3');
        // this.sfxNoteI3.volume = 0.1;
        // this.sfxNoteO3 = scene.sound.add('sfx_G3');
        // this.sfxNoteO3.volume = 0.1;
        // this.sfxNoteP3 = scene.sound.add('sfx_A3');
        // this.sfxNoteP3.volume = 0.1;
    }
}

// state classes
class IdleState extends State 
{
    enter(scene, yoko) 
    {
        yoko.setVelocity(0);
        yoko.anims.play('idling', true);
    }

    execute(scene, yoko) 
    {
        // use destructuring to make a local copy of the keyboard object
        // const { left, right, up, down, space, shift } = scene.keys;
        // const HKey = scene.keys.HKey;

        // attack during different states
        // if( Phaser.Input.Keyboard.JustDown(keyY)) 
        // {
            
        // }
        
        // if( Phaser.Input.Keyboard.JustDown(keyU)) 
        // {
            
        // }

        // if( Phaser.Input.Keyboard.JustDown(keyI)) 
        // {
            
        // }

        // if( Phaser.Input.Keyboard.JustDown(keyO)) 
        // {
            
        // }

        // transition to guard if pressing P
        if(Phaser.Input.Keyboard.JustDown(keyP)) 
        {
            this.stateMachine.transition('guard');
            return;
        }

        // transition to charge if pressing I
        if(Phaser.Input.Keyboard.JustDown(keyI)) 
        {
            this.stateMachine.transition('charge');
            return;
        }

        // transition to move if pressing a movement key
        if( keyW.isDown || keyA.isDown || keyS.isDown || keyD.isDown ) 
        {
            this.stateMachine.transition('move');
            return;
        }
    }
}

class MoveState extends State 
{
    execute(scene, yoko) 
    {
        // use destructuring to make a local copy of the keyboard object
        // const { left, right, up, down, space, shift } = scene.keys;
        // const HKey = scene.keys.HKey;

        // transition to guard if pressing P
        if(Phaser.Input.Keyboard.JustDown(keyP)) 
        {
            this.stateMachine.transition('guard');
            return;
        }

        // transition to charge if pressing I
        if(Phaser.Input.Keyboard.JustDown(keyI)) 
        {
            this.stateMachine.transition('charge');
            return;
        }

        // transition to idle if not pressing movement keys
        if(!(keyW.isDown || keyA.isDown || keyS.isDown || keyD.isDown)) 
        {
            this.stateMachine.transition('idle');
            return;
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0);
        if(keyW.isDown) 
        {
            moveDirection.y = -1;
        } 
        else if(keyS.isDown) 
        {
            moveDirection.y = 1;
        }
        if(keyA.isDown) 
        {
            moveDirection.x = -1;
        } 
        else if(keyD.isDown) 
        {
            moveDirection.x = 1;
        }

        // normalize movement vector, update position, and play proper animation
        moveDirection.normalize();
        yoko.setVelocity(yoko.yokoVelocity * moveDirection.x, yoko.yokoVelocity * moveDirection.y);
        yoko.anims.play('flying', true);
    }
}

class GuardState extends State 
{
    enter(scene, yoko) 
    {
        yoko.setVelocity(0);
        yoko.anims.play('guarding');

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(yoko.shieldCooldown, () => {
            this.stateMachine.transition('idle');
        });
    }
}

class ChargeState extends State 
{
    enter(scene, yoko) 
    {
        yoko.setVelocity(0);
        yoko.anims.play('charging');

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(yoko.beamCooldown, () => {
            this.stateMachine.transition('idle');
        });
    }
}