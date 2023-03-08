import React, { useEffect } from 'react';
import planckFun from './components/planck'


const PlanckJS: React.FC = () => {

    useEffect(() => {
        planckFun();
    }, []);

    return <canvas width={500} height={500} />;
}

export default PlanckJS;