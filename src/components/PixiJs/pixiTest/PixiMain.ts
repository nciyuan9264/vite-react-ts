import * as PIXI from 'pixi.js'

class PixiMain extends PIXI.Container {
    renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

    constructor(htmlEle: HTMLCanvasElement) {
        super();

        this.renderer = PIXI.autoDetectRenderer({
            width: 800,
            height: 800,
            antialias: false,
            view: htmlEle,
            transparent: false,
            backgroundColor: 0x1099bb,
        });
        (window as any).root = this;
    }
}

export { PixiMain };


