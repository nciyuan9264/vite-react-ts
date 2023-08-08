import React, { useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import './index.scss'

type Props = {
    radius: number;
    setRadius: Function;
    activeFlag: any;
    setActiveFlag: Function;
};
let sound: any;
let controlRCalled = false; // 初始化变量
let requestAnimation: number;
const CtrlBar: React.FC<Props> = (props: Props) => {
    const { radius, setRadius, activeFlag } = props;

    const [play, setPlay] = useState(false);



    useEffect(() => {
        if (!sound) {
            sound = new Howl({
                src: ['/3.mp3'], // 替换成您的音频文件路径
                html5: true,
                autoplay: false,
                loop: false,
                volume: 0.5, // 设置音量，范围从0到1
                onseek: () => {
                    console.log(sound.seek());
                }
            });
            // 监听播放事件
            sound.on('play', () => {
                // 设置一个定时器来监听播放进度
                const progressInterval = setInterval(() => {
                    const currentTime = sound.seek(); // 获取当前播放时间
                    // 
                    if (currentTime < 13 && currentTime > 7 && !controlRCalled && !activeFlag.current) {
                        controlR();
                        controlRCalled = true; // 设置变量，避免再次调用
                    }

                    // 如果音频播放完毕，清除定时器
                    if (currentTime >= sound.duration()) {
                        clearInterval(progressInterval);
                    }
                }, 100); // 以毫秒为单位，每秒更新一次播放进度

                // 清除定时器
                sound.on('end', () => {
                    clearInterval(progressInterval);
                });
                sound.on('pause', () => {
                    clearInterval(progressInterval);
                });
            });
        }
    }, []);

    const controlR = () => {

        const animateRadiusChange = () => {
            let currentTime = sound.seek();
            let deltaTime = currentTime - 7;
            let shouldR = deltaTime > 2 ? 30 - 5 * (deltaTime - 2) : 15 + deltaTime * 7.5;

            setRadius(shouldR);
            if (currentTime > 13 || activeFlag.current) {
                cancelAnimationFrame(requestAnimation);
                controlRCalled = false;
            } else {
                requestAnimation = requestAnimationFrame(animateRadiusChange);
            }
        };

        requestAnimation = requestAnimationFrame(animateRadiusChange);
    };


    const playOrStop = () => {
        if (!play) {
            sound.play();
        } else {
            sound.pause();
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