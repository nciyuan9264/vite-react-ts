import React, { useEffect, useRef } from 'react';
const { HemisphericLight, Vector3, ArcRotateCamera, MeshBuilder } = BABYLON;

const BabylonJs = () => {
    const canvasRef = useRef();
    let scene;
    let camera;
    let engine;

    const createScene = function () {
        const canvas = canvasRef.current;
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("camera1", 0, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 10;
        window.a = scene
        camera.attachControl(canvas, true);

        const environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("/environment.env", scene);

        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

        scene.createDefaultSkybox(environmentTexture, true, undefined, 0.3, true);

        // var pbr = new BABYLON.StandardMaterial("sta", scene);

        var pbr = new BABYLON.PBRMaterial("pbr", scene);
        sphere.material = pbr;

        pbr.albedoColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        pbr.metallic = 1.0;
        pbr.roughness = 0.0;

        pbr.iridescence.isEnabled = true;

        return scene;
    };

    useEffect(() => {
        engine = new BABYLON.Engine(canvasRef.current, true);
        scene = createScene();

        engine.runRenderLoop(() => {
            scene.render();
        });

        return () => {
            engine.dispose();
        };
    }, []);

    return (
        <canvas ref={canvasRef} className='model' width='1000px' height='600px'>
        </canvas>
    );
};

export default BabylonJs;