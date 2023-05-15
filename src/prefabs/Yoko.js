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

        this.yokoVelocity   = 500;    // in pixels

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

        guardpos = true;

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(Pcd, () => {
            guardpos = false;
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
        scene.time.delayedCall(Icd, () => 
        {
            this.stateMachine.transition('idle');
        });
    }
}