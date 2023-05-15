class Load extends Phaser.Scene 
{
    constructor() 
    {
        super('loadingScreen');
    }

    preload() 
    {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, wdth * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';

        // load graphics assets
        this.load.atlas('yoko_atlas', 'atlas/yokoSpriteSheet.png', 'atlas/yokoSpriteSheet.json');
        this.load.atlas('enemy_atlas', 'atlas/EnemySpritesheet.png', 'atlas/EnemySpritesheet.json');
        this.load.image('background', 'image/background.png');
        this.load.image('yokobulletY', 'image/Ybullet.png');
        this.load.image('yokobulletU', 'image/Ubullet.png');
        this.load.image('yokobulletO', 'image/Obullet.png');

        // load audio assets
        this.load.audio('sfx_C1', 'sfx/sfx_C1.mp3');
        this.load.audio('sfx_D1', 'sfx/sfx_D1.mp3');
        this.load.audio('sfx_E1', 'sfx/sfx_E1.mp3');
        this.load.audio('sfx_G1', 'sfx/sfx_G1.mp3');
        this.load.audio('sfx_A1', 'sfx/sfx_A1.mp3');
        this.load.audio('sfx_C2', 'sfx/sfx_C2.mp3');
        this.load.audio('sfx_D2', 'sfx/sfx_D2.mp3');
        this.load.audio('sfx_E2', 'sfx/sfx_E2.mp3');
        this.load.audio('sfx_G2', 'sfx/sfx_G2.mp3');
        this.load.audio('sfx_A2', 'sfx/sfx_A2.mp3');
        this.load.audio('backgroundMusic', 'sfx/bgm.mp3');

        // load font
        this.load.bitmapFont('SLN', 'font/PressStart2P.png', 'font/PressStart2P.xml');

    }

    create() 
    {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>YUI op.:</strong> WASD: move | Y:  first attack | O: second attack | U: deploy mine | I: charge | P: guard';


        // go to Title scene
        this.scene.start('menuScene');
    }
}