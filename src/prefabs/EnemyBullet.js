class EnemyBullet extends Phaser.Physics.Arcade.Sprite 
{
    constructor(scene, x, y, velocity) 
    {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, 'enemy_atlas', 'enemybullet1'); 
        
        this.parentScene = scene;                           // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);                // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);        // add to physics system
        this.setVelocityX(velocity);                        // make it go!
        this.setImmovable();
        this.posx = x;
        this.posy = y;
        this.newEnemyBullet = true;              
    }

    create()
    {
        // this.parentScene.time.delayedCall(6000, () => 
        // { 
        //     this.parentScene.addEnemyBullet();
        // });
    }

    update() 
    {
        // if(this.newEnemyBullet) 
        // {
        //     // (recursively) call parent scene method from this context
        //     this.parentScene.time.delayedCall(500, () => 
        //     { 
        //         this.parentScene.addEnemyBullet();
        //     });
        //     this.newEnemyBullet = false;
        // }

        // destroy bullet if it reaches the left edge of the screen
        if(this.x > wdth + this.width) 
        {
            this.destroy();
        }
    }

}