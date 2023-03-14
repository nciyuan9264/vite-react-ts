import * as PIXI from 'pixi.js'

class PixiMain extends PIXI.Container {
    renderer: any;

    constructor(htmlEle: HTMLCanvasElement) {
        super();

        this.renderer = PIXI.autoDetectRenderer({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: false,
            view: htmlEle,
            backgroundColor: 0x1099bb,
        });
        (this.renderer as any).stage = this;
        (window as any).PixiMain = this;
    }
}

export { PixiMain };


