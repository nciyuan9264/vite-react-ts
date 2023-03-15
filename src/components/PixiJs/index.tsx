import React, { useEffect, useRef } from "react";
import * as PIXI from 'pixi.js'
import { PixiMain } from './pixiTest/PixiMain'
import { Draw } from './pixiTest/Draw'
const PixiJs: React.FC = () => {
    let pixiMain: any = null;
    let draw: any = null;
    let flag = true;
    const pixiRoot = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        initPixiMain();
        startDraw();
        render();
        window.addEventListener('resize', changeCanvasSize);
        return () => window.removeEventListener('resize', changeCanvasSize);
    }, []);

    const initPixiMain = () => {
        pixiMain = new PixiMain(pixiRoot.current as HTMLCanvasElement);
    }

    const update = (delta: number) => {
        if (draw.graphics.x > 400) flag = false
        if (draw.graphics.x < 10) flag = true
        if (flag) {
            draw.graphics.x += delta * 60
        } else {
            draw.graphics.x -= delta * 60
        }
        pixiMain.renderer.render(pixiMain);
        // console.log(draw.graphics.x);
    }

    const startDraw = () => {
        draw = new Draw(pixiMain);
        draw.draw();
    }

    const render = () => {
        const ticker = new PIXI.Ticker();
        ticker.maxFPS = 60;
        ticker.minFPS = 10;
        ticker.autoStart = true;
        // 添加更新函数到Ticker对象
        ticker.add((delta: number) => {
            pixiMain.renderer.render(pixiMain);
            let FPM = delta / PIXI.Ticker.targetFPMS / 1000;
            update(FPM);
        })
    }

    const changeCanvasSize = () => {
        pixiMain.renderer.resize(window.innerWidth, window.innerHeight);
        pixiMain.renderer.render(pixiMain);
    }

    return (
        <canvas className="pixi-root" ref={pixiRoot}></canvas>
    )
}
export default PixiJs;