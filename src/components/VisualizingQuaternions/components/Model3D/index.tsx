import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


type Props = {
    radius: number;
    setRadius: Function;
};

const Model3D: React.FC<Props> = (props: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { radius } = props;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let sphere: THREE.Mesh;
    useEffect(() => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
            75,
            (canvasRef.current as HTMLCanvasElement).clientWidth / (canvasRef.current as HTMLCanvasElement).clientHeight,
            0.1,
            1000
        );
        renderer = new THREE.WebGLRenderer({ canvas: (canvasRef.current as HTMLCanvasElement), antialias: true });

        const geometry = new THREE.SphereGeometry(radius, 64, 64);
        const material = new THREE.MeshLambertMaterial({ color: 0x00aadd });
        sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        camera.position.z = 100;
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        light.position.set(8, 8, 2);
        scene.add(light);

        // 初始化半径并开始动画
        animate();
    }, [radius]);

    // 渲染函数
    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };


    return (
        <canvas ref={canvasRef} className='model' width='1000px' height='600px'>
        </canvas>
    );
};

export default Model3D;