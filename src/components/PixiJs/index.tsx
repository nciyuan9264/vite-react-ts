import React, { useEffect } from "react";
import { FirstPixi } from './pixiTest/firstPixi'
const PixiJs: React.FC = () => {

    useEffect(() => {
        const p = new FirstPixi()
        p.draw();
    }, []);
    return (
        <div id='pixi'>pixi</div>
    )
}
export default PixiJs;