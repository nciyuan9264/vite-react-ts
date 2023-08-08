import React, { useRef, useState } from 'react';
import Model3D from './components/Model3D'
import './index.scss'
import SlidingBlock from './components/SlidingBlock';
import CtrlBar from './components/CtrlBar';
import Mouse from './components/Mouse';

const VisualizingQuaternions: React.FC = () => {
    let activeFlag = useRef(false);
    const [radius, setRadius] = useState(15);

    const setActiveFlag = (flag: any) => {
        activeFlag.current = flag;
    }
    return (
        <div className='vq-root'>
            <div className='model3D'>
                <Model3D radius={radius} setRadius={setRadius}></Model3D>
            </div>
            <div className='slidingBlock'>
                <SlidingBlock radius={radius} setRadius={setRadius}
                activeFlag={activeFlag} setActiveFlag={setActiveFlag}></SlidingBlock>
            </div>
            <div className='ctrlBar'>
                <CtrlBar radius={radius} setRadius={setRadius}
                activeFlag={activeFlag} setActiveFlag={setActiveFlag}></CtrlBar>
            </div>
            <div className='mouse'>
                {/* <Mouse></Mouse> */}
            </div>
        </div>
    );
};

export default VisualizingQuaternions;