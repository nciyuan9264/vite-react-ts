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
        this.graphics.drawRect(200, 200, 50, 50);
        this.graphics.endFill();
        this.root.addChild(this.graphics);
    }


    clearDraw = () => {
        this.graphics.clear();
    }
}