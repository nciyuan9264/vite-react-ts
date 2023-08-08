import React, { useState } from 'react';
import Model3D from './components/Model3D'
import './index.scss'
import SlidingBlock from './components/SlidingBlock';
import CtrlBar from './components/CtrlBar';
import Mouse from './components/Mouse';

const VisualizingQuaternions: React.FC = () => {
    const [radius, setRadius] = useState(15);

    return (
        <div className='vq-root'>
            <div className='model3D'>
                <Model3D radius={radius} setRadius={setRadius}></Model3D>
            </div>
            <div className='slidingBlock'>
                <SlidingBlock radius={radius} setRadius={setRadius}></SlidingBlock>
            </div>
            <div className='ctrlBar'>
                <CtrlBar></CtrlBar>
            </div>
            <div className='mouse'>
                {/* <Mouse></Mouse> */}
            </div>
        </div>
    );
};

export default VisualizingQuaternions;