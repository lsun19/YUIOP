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
        this.load.image('background', 'image/background.png');

        // load audio assets
        // this.load.audio('', ['audio/']);

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

        // go to Title scene
        this.scene.start('menuScene');
    }
}