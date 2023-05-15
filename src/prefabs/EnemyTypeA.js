class EnemyTypeA extends Phaser.Physics.Arcade.Sprite 
{
    constructor(scene, velocity) 
    {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + enemyAwdth, Phaser.Math.Between(enemyAhght/2, game.config.height - enemyAhght/2), 'enemy_atlas', 'typeAenemy1'); 
        
        this.parentScene = scene;                           // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);                // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);        // add to physics system
        this.setVelocityX(velocity);                        // make it go!
        this.setImmovable();   
        this.tint = Math.random() * 0xFFFFFF;               // randomize tint
        this.newEnemyA = true;                              // custom property to control barrier spawning
        this.EnemyAHP  = 3;

    }

    create()
    {
        this.parentScene.time.delayedCall(5000, () => 
        { 
            this.parentScene.addEnemyA(this.parent, this.velocity);
        });
    }

    update() 
    {
        // add new enemyA when existing enemyA hits center X
        if(this.newEnemyA && this.x < centerX) 
        {
            // (recursively) call parent scene method from this context
            this.parentScene.addEnemyA(this.parent, this.velocity);
            this.newEnemyA = false;
        }

        if(this.newEnemyA) 
        {
            // (recursively) call parent scene method from this context
            this.parentScene.time.delayedCall(enemyAcd, () => 
            { 
                this.parentScene.addEnemyA(this.parent, this.velocity);
            });
            this.newEnemyA = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width || this.EnemyAHP <= 0) 
        {
            this.destroy();
        }
    }

}