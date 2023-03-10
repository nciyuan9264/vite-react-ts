import * as PIXI from 'pixi.js'

export class Draw extends PIXI.Container {
    root: any;

    constructor(pixiMain: any) {
        super();
        this.root = pixiMain
    }

    draw = () => {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x000fff);
        graphics.drawRect(200, 200, 50, 50);
        graphics.endFill();
        this.root.addChild(graphics);
    }
}