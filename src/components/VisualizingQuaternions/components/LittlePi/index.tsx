import React, { useEffect, useRef } from 'react';
import './index.scss'
type Props = {
    eye_x: number, 
    eye_y: number;
};
const LittlePi: React.FC<Props> = () => {
    const { radius, setRadius, setActiveFlag } = props;


    return (
        <div className="lp-root">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300.22 281.9">
                <defs>
                    <linearGradient id="linus-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "rgb(255, 255, 255)" }}></stop>
                        <stop offset="100%" style={{ stopColor: "rgb(190, 190, 190)" }}></stop>
                    </linearGradient>
                </defs>
                <g style={{ transitionProperty: "transform", transitionDuration: "100ms", transform: "translate(0px, 0px) scale(1, 1)" }}>
                    <path className="_whdw9f" d="M155.89,19 a19,19,0,0,1-3.74,11.35l-30.38.29 a18.17,18.17,0,0,1-4-11.64,19,19,0,0,1,38.09,0Z"></path>
                    <path style={{}} d="M142.28,4.21 a2.53,2.53,0,1,0,.17,0h-.17l2.92-1 a7.71,7.71,0,1,1-7.71,7.71,7.71,7.71,0,0,1,7.71-7.71" transform="translate(1.3828584503233579,12)"></path>
                </g>
                <g style={{ transitionProperty: "transform", transitionDuration: "100ms", transform: "translate(0px, 0px) scale(1, 1)" }}>
                    <path className="_whdw9f" d="M210.89,19 a19,19,0,0,1-3.74,11.35l-30.38.29 a18.17,18.17,0,0,1-4-11.64,19,19,0,0,1,38.09,0Z"></path>
                    <path d="M197.28,4.21 a2.53,2.53,0,1,0,.17,0h-.17l2.92-1 a7.71,7.71,0,1,1-7.71,7.71,7.71,7.71,0,0,1,7.71-7.71" transform="translate(0.2198654159998874,12)"></path>
                </g>
                <g>
                    <path d="M196.41,61.43H132 c15.38,63.8,25.07,105.39,25.07,151,0,8,0,69.5-23.36,69.5-12, 0-22.22-10.83-22.22-20.51,0-2.85,0-4,4-12.53,15.38-39.31, 15.38-88.31,15.38-92.29,0-3.42,0-43.87-12-95.14H85.13c-7.4, 0-23.54,13.12-23.54-5.11,0-12.53,8.16-25.65,18.41-25.65H237.43 c13.1,0,28.27,12.91,29.94,35.38,1.14,15.25-6.27,30.21-29.64, 30.6-22.58.37-37.1-6.42-57.91-14.63-3.71-1.46-10.85-14.32-7.29 -11.66C187.59,81.6,240.12,82.54,242,61.43H209.52c12.53,42.73, 26.77,92.29,73.49,192,4.55,9.12,4.55,10.26,4.55,13.68,0,12-10.25, 14.81-15.38,14.81-16.52,0-21.08-14.81-27.91-38.74-9.12-29.06 -9.12-30.19-14.81-53L196.41,61.43" style={{ fill: "rgb(88, 196, 221)" }}></path>
                    <path d="M150.65,53.43c5.53,0,1.93,.07,13.51,0,10.31,0,12.42-.09,15.7-.15,0,0-.27-3.11-.27-3.11-3.67.06-9.31.18-14.71.18-3.86,0-8.54,0-14.57,0"></path>
                </g>
            </svg>
        </div>
    );
};

export default LittlePi;