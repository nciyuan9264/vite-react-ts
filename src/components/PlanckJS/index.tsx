import React, { useRef } from 'react';
import planckFun from './components/planck'
import './index.scss'

const PlanckJS: React.FC = () => {
    const startBtn = useRef(null);
    const planckTest = () => {
        planckFun();
    };

    return (
        <div className='planck-root'>
            <canvas className='canvas-root' width={500} height={500} />
            <div className='startBtn' ref={startBtn} onClick={planckTest}>开始</div>
        </div>
    );
}

export default PlanckJS;