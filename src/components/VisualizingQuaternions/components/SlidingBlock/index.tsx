import React, { useEffect, useRef, useState } from 'react';
import './index.scss'

type Props = {
    radius: number;
    setRadius: Function;
    activeFlag: any;
    setActiveFlag: Function;
};

let timeFlag: string | number | NodeJS.Timeout | undefined;
const SlidingBlock: React.FC<Props> = (props: Props) => {
    const { radius, setRadius, setActiveFlag } = props;

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
            setActiveFlag(true);
            if (timeFlag) {
                clearTimeout(timeFlag);
            }
        }
    };


    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                setLastY(null);
                timeFlag = setTimeout(() => {
                    setActiveFlag(false);
                }, 1500);
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
        <div className='sb-root' ref={slidingBlockRef}>radius
            <span className='colon'>:</span>
            <span className='num'
                onMouseDown={handleMouseDown}>
                {Math.round(radius)}
            </span>
        </div>
    );
};

export default SlidingBlock;