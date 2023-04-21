import * as PIXI from 'pixi.js'
import Cat from '../jsdemo.js'
// import { a } from '../tsdemo.ts'
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
        this.graphics.x = 200;
        this.graphics.y = 200;
        this.root.addChild(this.graphics);
        Cat.sayHello();
        // console.log(a);
    }


    clearDraw = () => {
        this.graphics.clear();
    }
}