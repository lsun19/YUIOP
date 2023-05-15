class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    create()
    {
        // reset parameters
        this.enemyASpeed = -450;
        this.enemyASpeedMax = -1000;
        level = 0;
        this.extremeMODE = false;
        this.shadowLock = false;

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

        // set yoko z depth
        this.yoko.setDepth(1);  

        /******************************  create animations from texture atlas ******************************/
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

        this.anims.create
        ({ 
            key: 'TypeAenemy', 
            frames: this.anims.generateFrameNames('enemy_atlas', {      
                prefix: 'typeAenemy',
                start: 1,
                end: 7,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 5,
            repeat: -1 
        });

        this.anims.create
        ({ 
            key: 'TypeBenemy', 
            frames: this.anims.generateFrameNames('enemy_atlas', {      
                prefix: 'typeBenemy',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 5,
            repeat: -1 
        });

        this.anims.create
        ({ 
            key: 'enemyBulletFire', 
            frames: this.anims.generateFrameNames('enemy_atlas', {      
                prefix: 'enemybullet',
                start: 1,
                end: 5,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 5,
            repeat: -1 
        });
        /******************************  create animations from texture atlas ******************************/

        /******************************  set up enemy groups ******************************/

        // set up enemyA group
        this.enemyAGroup = this.add.group
        ({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning enemies
        this.time.delayedCall(2500, () => 
        { 
            this.addEnemyA(); 
        });

        // set up enemyB group
        this.enemyBGroup = this.add.group
        ({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning enemies
        this.time.delayedCall(5000, () => 
        { 
            this.addEnemyB(); 
        });

        // set up bulletY group
        this.enemyBulletGroup = this.add.group
        ({
            runChildUpdate: true    // make sure update runs on group children
        });

        // wait a few seconds before spawning enemies
        // this.time.delayedCall(5000, () => 
        // { 
        //     this.addEnemyBullet(this.enemyBGroup.x, this.enemyBGroup.y);
        // });

        /******************************  set up enemy groups ******************************/

        /******************************  set up bullet groups ******************************/

        // set up bulletY group
        this.bulletYGroup = this.add.group
        ({
            runChildUpdate: true    // make sure update runs on group children
        });

        // set up bulletU group
        this.bulletUGroup = this.add.group
        ({
            runChildUpdate: true    // make sure update runs on group children
        });

        // set up bulletO group
        this.bulletOGroup = this.add.group
        ({
            runChildUpdate: true    // make sure update runs on group children
        });

        /******************************  set up bullet groups ******************************/

        // set up collision event between enemyA and yoko
        this.physics.add.overlap(this.enemyAGroup, this.yoko, (enemyA, yoko) =>
        {
            enemyA.destroy();

            if(!guardpos)
            {
                yoko.setAlpha(0.5);

                this.time.delayedCall(500, () => 
                { 
                    yoko.setAlpha(1);
                });
                yokoHP--;
            }
        });

        // set up collision event between enemyB and yoko
        this.physics.add.overlap(this.enemyBGroup, this.yoko, (enemyB, yoko) =>
        {
            enemyB.destroy();

            if(!guardpos)
            {
                yoko.setAlpha(0.5);

                this.time.delayedCall(500, () => 
                { 
                    yoko.setAlpha(1);
                });
                yokoHP--;
            }
        });

        // set up collision event between enemyBullet and yoko
        this.physics.add.overlap(this.enemyBulletGroup, this.yoko, (enemyBullet, yoko) =>
        {
            enemyBullet.destroy();

            if(!guardpos)
            {
                yoko.setAlpha(0.5);

                this.time.delayedCall(500, () => 
                { 
                    yoko.setAlpha(1);
                });
                yokoHP--;
            }

        });

        /******************************  set up collision event between enemyA and three types of bullets ******************************/

        // set up collision event between enemyA and bulletY
        this.physics.add.overlap(this.enemyAGroup, this.bulletYGroup, (enemyA, bulletY) =>
        {
            enemyA.EnemyAHP -= 2;

            bulletY.destroy();
        });

        // set up collision event between enemyA and bulletU
        this.physics.add.overlap(this.enemyAGroup, this.bulletUGroup, (enemyA, bulletU) =>
        {
            enemyA.destroy();

            bulletU.destroy();
        });

        // set up collision event between enemyA and bulletO
        this.physics.add.overlap(this.enemyAGroup, this.bulletOGroup, (enemyA, bulletO) =>
        {
            enemyA.EnemyAHP--;

            bulletO.destroy();
        });
        /******************************  set up collision event between enemyA and three types of bullets ******************************/

        /******************************  set up collision event between enemyB and three types of bullets ******************************/

        // set up collision event between enemyA and bulletY
        this.physics.add.overlap(this.enemyBGroup, this.bulletYGroup, (enemyB, bulletY) =>
        {
            enemyB.EnemyBHP -= 2;

            bulletY.destroy();
        });

        // set up collision event between enemyA and bulletU
        this.physics.add.overlap(this.enemyBGroup, this.bulletUGroup, (enemyB, bulletU) =>
        {
            enemyB.destroy();

            bulletU.destroy();
        });

        // set up collision event between enemyA and bulletO
        this.physics.add.overlap(this.enemyBGroup, this.bulletOGroup, (enemyB, bulletO) =>
        {
            enemyB.EnemyBHP--;

            bulletO.destroy();
        });
        /******************************  set up collision event between enemyB and three types of bullets ******************************/

        /******************************  set up collision event between enemyBullet and three types of bullets ******************************/

        // set up collision event between enemyA and bulletY
        this.physics.add.overlap(this.enemyBulletGroup, this.bulletYGroup, (enemyBullet, bulletY) =>
        {
            enemyBullet.destroy();

            bulletY.destroy();
        });

        // set up collision event between enemyA and bulletU
        this.physics.add.overlap(this.enemyBulletGroup, this.bulletUGroup, (enemyBullet, bulletU) =>
        {
            enemyBullet.destroy();

            bulletU.destroy();
        });

        // set up collision event between enemyA and bulletO
        this.physics.add.overlap(this.enemyBulletGroup, this.bulletOGroup, (enemyBullet, bulletO) =>
        {
            enemyBullet.destroy();

            bulletO.destroy();
        });
        /******************************  set up collision event between enemyBullet and three types of bullets ******************************/

        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 1800, 720, 'background').setOrigin(0, 0);
    }

    /******************************  create new bullets and add them to existing group ******************************/
    addBulletY() 
    {
        let bulletY = new YokoBulletY(this, this.yoko.x, this.yoko.y, 300);
        this.bulletYGroup.add(bulletY);
    }

    addBulletU() 
    {
        let bulletU = new YokoBulletU(this, this.yoko.x, this.yoko.y, 0);
        this.bulletUGroup.add(bulletU);
    }

    addBulletO() 
    {
        let bulletO = new YokoBulletO(this, this.yoko.x, this.yoko.y, 500);
        this.bulletOGroup.add(bulletO);
    }

    /******************************  create new bullets and add them to existing group ******************************/


    /******************************  create new enemy and add them to existing group ******************************/
    addEnemyA() 
    {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let enemyA = new EnemyTypeA(this, this.enemyASpeed - speedVariance);
        this.enemyAGroup.add(enemyA);
        enemyA.anims.play('TypeAenemy');
    }

    addEnemyB() 
    {
        let speedVariance =  Phaser.Math.Between(0, 50);
        let enemyB = new EnemyTypeB(this, this.enemyASpeed - speedVariance);
        this.enemyBGroup.add(enemyB);
        enemyB.anims.play('TypeBenemy');
    }

    addEnemyBullet(posx, posy) 
    {
        let enemyBullet = new EnemyBullet(this, posx, posy, -500);
        this.enemyBulletGroup.add(enemyBullet);
        enemyBullet.anims.play('enemyBulletFire');
    }
    /******************************  create new enemy and add them to existing group ******************************/



    update()
    {   
        // initiate yoko's FSM
        this.yokoFSM.step();

        /******************************  monitor key event for 5 different functional keys ******************************/
        if(Phaser.Input.Keyboard.JustDown(keyY) && YcdEnd) 
        {
            this.addBulletY(); 

            YcdEnd = false;

            this.Ycooldown = this.time.delayedCall(Ycd, ()=>
            {
                YcdEnd = true;
            })
        }

        if(Phaser.Input.Keyboard.JustDown(keyU) && UcdEnd) 
        {
            this.addBulletU();

            UcdEnd = false;

            this.Ucooldown = this.time.delayedCall(Ucd, ()=>
            {
                UcdEnd = true;
            })
        }

        if(Phaser.Input.Keyboard.JustDown(keyO) && OcdEnd) 
        {
            this.addBulletO();

            OcdEnd = false;

            this.Ocooldown = this.time.delayedCall(Ocd, ()=>
            {
                OcdEnd = true;
            })
        }
        /******************************  monitor key event for 5 different functional keys ******************************/

        // update tile sprite
        this.background.tilePositionX += 0.5;  

    }

}