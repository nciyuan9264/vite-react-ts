import React, { useEffect, useRef, useState } from 'react';
import './index.scss'

type Props = {
    radius: number;
    setRadius: Function;
};

const SlidingBlock: React.FC<Props> = (props: Props) => {
    // const { radius, setRadius } = props;

    // const [isDragging, setIsDragging] = useState(false);
    // const [lastY, setLastY] = useState(null);

    // const slidingBlockRef = useRef<HTMLDivElement>(null);



    useEffect(() => {

    }, []);


    return (
        <div className='root'>radius
            
        </div>
    );
};

export default SlidingBlock;