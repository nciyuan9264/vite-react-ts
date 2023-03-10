import React, { useEffect, useRef } from "react";
import { PixiMain } from './pixiTest/PixiMain'
import { Draw } from './pixiTest/Draw'
const PixiJs: React.FC = () => {
    let pixiMain: any = null;
    const pixiRoot = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        initPixiMain();
        startDraw();
        render();
    }, []);

    const initPixiMain = () => {
        pixiMain = new PixiMain(pixiRoot.current as HTMLCanvasElement);
    }

    const startDraw = () => {
        let draw = new Draw(pixiMain);
        draw.draw();
    }

    const render = () => {
        pixiMain.renderer.render(pixiMain);
    }

    return (
        <canvas className="pixi-root" ref={pixiRoot}></canvas>
    )
}
export default PixiJs;