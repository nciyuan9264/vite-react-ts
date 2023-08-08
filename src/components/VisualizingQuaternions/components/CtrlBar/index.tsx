import React, { useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import './index.scss'

// type Props = {
//     radius: number;
//     setRadius: Function;
// };

const CtrlBar: React.FC = () => {
    // const { radius, setRadius } = props;

    const [play, setPlay] = useState(false);
    // const [lastY, setLastY] = useState(null);

    // const slidingBlockRef = useRef<HTMLDivElement>(null);



    useEffect(() => {


    }, []);

    const sound = new Howl({
        src: ['/3.mp3'], // 替换成您的音频文件路径
        autoplay: false,
        loop: false,
        volume: 0.5, // 设置音量，范围从0到1
    });

    const playOrStop = () => {
        if (!play) {
            sound.play();
        } else {
            sound.stop();
            console.log(123);
        }

        setPlay(!play);
    };


    return (
        <div className='cb-root'>
            <div className='playBtn' onClick={playOrStop}>
                {play ? <span className='stop'>{'||'}</span> : <span className='play'>{'>'}</span>}
            </div>
        </div>
    );
};

export default CtrlBar;