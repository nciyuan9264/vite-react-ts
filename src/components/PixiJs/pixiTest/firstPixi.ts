import * as PIXI from 'pixi.js'

class FirstPixi {
    a: string;

    constructor() {
        this.a = '111';
    }

    draw() {
        const app = new PIXI.Application({
            width: 512,
            height: 512,
            backgroundColor: 0x000000
        });

        document.body.appendChild(app.view);

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x0000ff);
        graphics.drawRect(200, 0, 50, 50);
        graphics.endFill();
        app.stage.addChild(graphics);

        function animate() {
            requestAnimationFrame(animate);
            app.render();
        }

        animate();
    }
}

export { FirstPixi };


