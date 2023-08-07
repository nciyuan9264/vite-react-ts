import React, { useEffect, useRef, useState } from 'react';
import Model3D from './components/Model3D'
import './index.scss'

const VisualizingQuaternions: React.FC = () => {
    const [radius, setRadius] = useState(15);
    // useEffect(() => {

    // }, []);

    const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRadius = parseFloat(event.target.value);
        setRadius(newRadius);
    };

    return (
        <div className='root'>
            <Model3D radius={radius}></Model3D>
            <input type="range" min="1" max="50" step="0.1" defaultValue="20" onChange={handleRadiusChange} />
        </div>
    );
};

export default VisualizingQuaternions;