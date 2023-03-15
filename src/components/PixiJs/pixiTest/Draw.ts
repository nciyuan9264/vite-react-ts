import * as PIXI from 'pixi.js'

export class Draw extends PIXI.Container {
    root: any;
    graphics: PIXI.Graphics;

    constructor(pixiMain: any) {
        super();
        this.root = pixiMain
        this.graphics = new PIXI.Graphics();
    }

    draw = () => {
        this.graphics.beginFill(0x000fff);
        this.graphics.drawRect(0, 0, 50, 50);
        this.graphics.endFill();
        console.log(this.graphics.x);
        this.graphics.x = 200;
        this.graphics.y = 200;
        this.root.addChild(this.graphics);
    }


    clearDraw = () => {
        this.graphics.clear();
    }
}