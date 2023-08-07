import React, { useEffect, useRef, useState } from 'react';
import './index.scss'

type Props = {
    radius: number;
    setRadius: Function;
};

const SlidingBlock: React.FC<Props> = (props: Props) => {
    const { radius, setRadius } = props;

    const [isDragging, setIsDragging] = useState(false);
    const [lastY, setLastY] = useState(null);

    const slidingBlockRef = useRef<HTMLDivElement>(null);


    const handleMouseDown = (event: any) => {
        setIsDragging(true);
        setLastY(event.clientY);
        document.addEventListener('onMouseUp', () => {
            setIsDragging(false);
            setLastY(null);
        })
    };

    const handleMouseMove = (event: any) => {
        const step = 10;
        if (isDragging) {
            if (lastY !== null) {
                const deltaY = event.clientY - lastY;
                if (Math.floor(radius - deltaY / step) !== radius) {
                    setRadius(Math.floor(radius - deltaY / step));
                }
            }
            setLastY(event.clientY);
        }

    };


    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                setLastY(null);
            }
        };

        document.addEventListener('mouseup', handleGlobalMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging]);


    return (
        <div className='root' ref={slidingBlockRef}>radius
            <span className='colon'>:</span>
            <span className='num'
                onMouseDown={handleMouseDown}>
                {radius}
            </span>
        </div>
    );
};

export default SlidingBlock;