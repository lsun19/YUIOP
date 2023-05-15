class YokoBulletY extends Phaser.Physics.Arcade.Sprite 
{
    constructor(scene, x, y, velocity) 
    {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, 'yokobulletY'); 
        
        this.parentScene = scene;                           // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);                // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);        // add to physics system
        this.setVelocityX(velocity);                        // make it go!
        this.setImmovable();                    
    }

    update() 
    {
        // destroy paddle if it reaches the left edge of the screen
        if(this.x > wdth + this.width) 
        {
            this.destroy();
        }
    }

}