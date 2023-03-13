import React, { useEffect, useRef } from "react";
import * as PIXI from 'pixi.js'
import { PixiMain } from './pixiTest/PixiMain'
import { Draw } from './pixiTest/Draw'
const PixiJs: React.FC = () => {
    let pixiMain: any = null;
    let draw: any = null;
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

    const update = (delta: number, ticker: any) => {
        console.log(delta, ticker.deltaTime);
    }

    const startDraw = () => {
        draw = new Draw(pixiMain);
        draw.draw();
    }

    const render = () => {
        const ticker = new PIXI.ticker.Ticker();
        ticker.minFPS = 60;
        ticker.deltaTime = 1 / ticker.minFPS;
        ticker.autoStart = true;
        // 添加更新函数到Ticker对象
        ticker.add((delta: number) => {
            // pixiMain.renderer.render(pixiMain);
            update(delta, ticker);
        });
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