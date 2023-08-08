import React, { useState } from 'react';
import './index.scss'
function Mouse() {
    const [mousePath, setMousePath] = useState(Array<any>);
    const [progress, setProgress] = useState(0);

    const handleMouseMove = (event: { buttons: number; clientX: any; clientY: any; }) => {
        setMousePath([...mousePath, { x: event.clientX, y: event.clientY }]);
    };

    const handleProgressChange = (event: any) => {
        setProgress(event.target.value);
    };

    return (
        <div className='m-root'>
            <svg
                className='draw'
                width="500"
                height="500"
                onMouseMove={handleMouseMove}
            >
                {/* 在SVG上绘制移动路径 */}
                {mousePath.map((point, index) => (
                    <circle key={index} cx={point.x} cy={point.y} r="5" fill="blue" />
                ))}
            </svg>

            {/* 播放进度条 */}
            <input
                type="range"
                min="0"
                max={mousePath.length - 1}
                value={progress}
                onChange={handleProgressChange}
            />

            {/* 重新展示SVG移动 */}
            <svg width="500" height="500" className='show'>
                <circle
                    cx={mousePath[progress] ? mousePath[progress].x : 0}
                    cy={mousePath[progress] ? mousePath[progress].y : 0}
                    r="10"
                    fill="red"
                />
            </svg>
        </div>
    );
}

export default Mouse;