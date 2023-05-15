class EnemyTypeB extends Phaser.Physics.Arcade.Sprite 
{
    constructor(scene, velocity) 
    {
        // call Phaser Physics Sprite constructor
        switch(Phaser.Math.Between(0, 1))
        {
            case 1:
                super(scene, Phaser.Math.Between(centerX, game.config.width - enemyBwdth/2), enemyBhght/2, 'enemy_atlas', 'typeBenemy1'); 
                velocity = -velocity;
                break;

            default:
                super(scene, Phaser.Math.Between(centerX, game.config.width - enemyBwdth/2), game.config.height + enemyBhght/2, 'enemy_atlas', 'typeBenemy1'); 
                break;
        }
        
        this.parentScene = scene;                           // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);                // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);        // add to physics system
        this.setVelocityY(velocity);                        // make it go!
        this.setImmovable();
        this.tint = Math.random() * 0xFFFFFF;               // randomize tint
        this.newEnemyB = true;                              // custom property to control barrier spawning
        this.EnemyBHP  = 5;
        this.bulletCounter = 60;
    }

    create()
    {
        this.parentScene.time.delayedCall(5000, () => 
        { 
            this.parentScene.addEnemyB(this.parent, this.velocity);
        });
        
    }

    update() 
    {
        // add new enemyA when existing enemyA hits center X
        if(this.newEnemyB && this.y == centerY) 
        {

            // (recursively) call parent scene method from this context
            this.parentScene.addEnemyB(this.parent, this.velocity);
            this.newEnemyB = false;
        }

        if(this.newEnemyB) 
        {
            // (recursively) call parent scene method from this context
            this.parentScene.time.delayedCall(enemyBcd, () => 
            { 
                this.parentScene.addEnemyB(this.parent, this.velocity);
            });
            this.newEnemyB = false;
        }

        if(this.bulletCounter > 0) 
        {
            // (recursively) call parent scene method from this context
            this.parentScene.time.delayedCall(500, () => 
            { 
                this.parentScene.addEnemyBullet(this.x, this.y);
            });
            this.bulletCounter--;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width || this.EnemyBHP <= 0) 
        {
            this.destroy();
        }
    }

}