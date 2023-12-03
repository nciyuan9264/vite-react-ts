import React, { useEffect, useRef } from 'react';
const { HemisphericLight, Vector3, ArcRotateCamera, MeshBuilder } = BABYLON;

const BabylonJs = () => {
    const canvasRef = useRef();
    let scene;
    let camera;
    let engine;

    // Actively selected mesh to use as camera's target
    var activeMesh = null;
    var targetLocation = null;
    var animationsActive = true;
    var waitForPanning = false;

    /**
     * Create spheres that are pickable in scene
     */
    var createMeshes = function (scene) {
        let dim = 3;
        let sphereNum = 0;
        let sphereNode = new BABYLON.Mesh("spheres", scene);

        for (let i = -dim; i < dim; i++) {
            for (let j = -dim; j < dim; j++) {
                for (let k = -dim; k < dim; k++) {
                    let name = `sphere${sphereNum++}`;
                    let sphere = BABYLON.MeshBuilder.CreateSphere(name, { diameter: 2, segments: 32 }, scene);
                    let variance = Math.floor(Math.random() * 5)
                    sphere.position = new BABYLON.Vector3(i * 12 + variance, j * 12 + variance, k * 12 + variance);
                    sphere.outlineWidth = 0.1;
                    sphereNode.addChild(sphere);
                }
            }
        }
    };

    /********** ANIMATION SECTION **********/
    /**
     * Fade target sphere back into scene
     */
    var fadeInTarget = function () {
        const fadeFrames = [];
        const frameRate = 10;
        const fadeTarget = new BABYLON.Animation("fadeInTarget", "alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT);

        fadeFrames.push({
            frame: 0,
            value: 0
        });

        fadeFrames.push({
            frame: frameRate / 4,
            value: 0.75
        });

        fadeTarget.setKeys(fadeFrames);
        targetLocation.material.animations = [];
        targetLocation.material.animations.push(fadeTarget);
        scene.beginAnimation(targetLocation.material, 0, frameRate, false);
    };

    /**
     * Move target sphere to picked mesh/target
     */
    var moveToMesh = function (mesh, scene) {
        const moveFrames = [];
        const fadeFrames = [];
        const frameRate = 10;
        const origin = targetLocation.position.clone();
        const destination = mesh.position.clone();
        const moveTarget = new BABYLON.Animation("moveTarget", "position", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
        const fadeTarget = new BABYLON.Animation("fadeTarget", "alpha", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
        const mergeEase = new BABYLON.CircleEase();
        mergeEase.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
        moveTarget.setEasingFunction(mergeEase);

        moveFrames.push({
            frame: 0,
            value: origin
        });

        moveFrames.push({
            frame: frameRate,
            value: destination
        });

        fadeFrames.push({
            frame: 0,
            value: 0.75
        });

        fadeFrames.push({
            frame: frameRate,
            value: 0
        });

        moveTarget.setKeys(moveFrames);
        fadeTarget.setKeys(fadeFrames);
        targetLocation.material.animations = [];
        targetLocation.animations = [];
        targetLocation.animations.push(moveTarget);
        targetLocation.material.animations.push(fadeTarget);
        scene.beginAnimation(targetLocation, 0, frameRate, false);
        scene.beginAnimation(targetLocation.material, 0, frameRate, false);
    };
    /******** END ANIMATION SECTION **********/

    /**
     * Reset the camera's target so that it's back at the center of it's viewpoint
     */
    var resetCameraTarget = function (camera) {
        if (activeMesh) {
            /**
             * Basically, we're going reverse what we did when we set the offsets.  Our goal is just to
             * set our camera to be looking at the center with a default radius of 10.  We first get the
             * difference between our current radius and desired one.  Next, we set our localDirection to
             * be our we'd want to pan the camera in relative space.  We calculate and move our camera's
             * target in absolute space and then remove our offsets.
             */
            let diff = camera.radius - 10;
            let relPos = activeMesh.getPositionInCameraSpace(camera);
            let localDirection = new BABYLON.Vector3(relPos.x, relPos.y, diff);
            let viewMatrix = camera.getViewMatrix();
            let transformMatrix = camera.getTransformationMatrix();
            let transformedDirection = BABYLON.Vector3.Zero();

            viewMatrix.invertToRef(transformMatrix);
            localDirection.multiplyInPlace(new BABYLON.Vector3(1, 1, 1));
            BABYLON.Vector3.TransformNormalToRef(localDirection, transformMatrix, transformedDirection);
            camera.target.subtractInPlace(transformedDirection);

            camera.targetScreenOffset.x = 0;
            camera.targetScreenOffset.y = 0;

            activeMesh.renderOutline = false;
            activeMesh = null;
            camera.radius = 10;
        }
        targetLocation.material.alpha = 0.75;
        targetLocation.position = camera.target;
    };

    /**
     * Sets the camera's target to a specific point and configures offsets to move it back into position.
     */
    var setCameraOffset = function (camera, mesh) {
        // If we have a mesh to set that hasn't already been set
        if (mesh && mesh !== activeMesh) {
            // Disable outline for previous mesh
            if (activeMesh) {
                activeMesh.renderOutline = false;
            }

            if (!animationsActive) {
                targetLocation.material.alpha = 0;
            }

            /** 
             * This is an important part.  The getPositionInCameraSpace function will give us the location of the mesh, as if we were to pan
             * the camera to it.  We then take this value and set our offsets to the relative x and y of that position and use the z as our
             * radius.  By copying the alpha and beta angles, we're effectively performing a 3D Pan and then immediately offsetting the 
             * camera back into the original position.
             * */
            let relPos = mesh.getPositionInCameraSpace(camera);
            let alpha = camera.alpha;
            let beta = camera.beta;

            mesh.renderOutline = true;
            camera.target = mesh.position.clone();
            camera.targetScreenOffset.x = relPos.x;
            camera.targetScreenOffset.y = relPos.y;
            camera.radius = relPos.z;
            camera.alpha = alpha;
            camera.beta = beta;

            activeMesh = mesh;
        }
    };


    const createScene = function () {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
        const canvas = canvasRef.current;
        // This creates and positions an ArcRotateCamera
        var camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 3, Math.PI / 3, 10, BABYLON.Vector3.Zero(), scene);;

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
        light.specular = new BABYLON.Color3(0, 0, 0);

        // Create all spheres that can be picked
        createMeshes(scene);

        // Create the target sphere to be a visual indicator of where the focus is
        targetLocation = BABYLON.MeshBuilder.CreateSphere("targetLoc", { diameter: 0.75, segments: 32 }, scene);
        targetLocation.position = camera.target;
        let targetMat = new BABYLON.StandardMaterial("targetMat", scene);
        targetMat.diffuseColor = BABYLON.Color3.Red();
        targetMat.alpha = 0.75;
        targetLocation.material = targetMat;

        // GUI
        let advancedTexture = BABYLON.GUI.advancedTextureAdvancedDynamicTexture.CreateFullscreenUI("UI");

        let targetText = new BABYLON.GUI.TextBlock();
        targetText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        targetText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        targetText.textHorizontalAlignment = BABYLON.GUI.TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
        targetText.text = "Target: none";
        targetText.color = "red";
        targetText.fontSize = 24;
        targetText.width = "200px";
        targetText.height = "30px";
        if (canvas.width < 500) {
            targetText.isVisible = false;
        }
        advancedTexture.addControl(targetText);

        let buttonPanel = new BABYLON.GUI.StackPanel();
        buttonPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(buttonPanel);

        // Animation Toggle Button
        let animButton = BABYLON.GUI.Button.CreateSimpleButton("anim", "Toggle Animations");
        animButton.width = "300px";
        animButton.height = "30px";
        animButton.color = "white";
        animButton.background = "grey";
        animButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        animButton.onPointerClickObservable.add((eventData) => {
            if (animationsActive) {
                animButton.textBlock.color = "red";
            }
            else {
                animButton.textBlock.color = "white";
            }
            animationsActive = !animationsActive
        });
        buttonPanel.addControl(animButton);

        // Reset Camera Position Button
        let resetButton = BABYLON.GUI.Button.CreateSimpleButton("reset", "Reset Camera");
        resetButton.width = "300px";
        resetButton.height = "30px";
        resetButton.color = "white";
        resetButton.background = "grey";
        resetButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        resetButton.onPointerClickObservable.add((eventData) => {
            camera.target = BABYLON.Vector3.Zero();
            camera.alpha = Math.PI / 3;
            camera.beta = Math.PI / 3;
            camera.radius = 10;

            if (animationsActive && activeMesh) { fadeInTarget(); }
            camera.targetScreenOffset.x = 0;
            camera.targetScreenOffset.y = 0;

            activeMesh.renderOutline = false;
            activeMesh = null;
            targetLocation.material.alpha = 0.75;
            targetLocation.position = camera.target;

            targetText.text = "Target: none";
        });
        buttonPanel.addControl(resetButton);

        // This section exists solely because we need to account for panning inertial.
        scene.beforeRender = () => {
            if (waitForPanning && camera.inertialPanningX === 0 && camera.inertialPanningY === 0) {
                let mesh = activeMesh;
                activeMesh = null;
                setCameraOffset(camera, mesh);
                waitForPanning = false;
            }
        };

        // Double-tap: If you double-tap on mesh, highlight and set that mesh as the target
        // Else, reset target to center of view with a radius of 10
        scene.onPointerObservable.add((eventData) => {
            let mesh = eventData.pickInfo.pickedMesh;
            if (mesh) {
                if (animationsActive) { moveToMesh(mesh, scene); }
                setCameraOffset(camera, mesh);
                targetText.text = `Target: ${mesh.name}`;
            }
            else {
                if (animationsActive && activeMesh) { fadeInTarget(); }
                resetCameraTarget(camera);
                targetText.text = "Target: none";
            }
        }, BABYLON.PointerEventTypes.POINTERDOUBLETAP);

        // To prevent loss of using mesh as target, we track the active mesh that we were using and just re-set it
        // as the targetted mesh after the pan is complete
        scene.onPointerObservable.add((eventData) => {
            if (activeMesh) {
                // If we're still moving, wait for movement to finish and then reset
                if (camera.inertialPanningX !== 0 || camera.inertialPanningY !== 0) {
                    waitForPanning = true;
                }
                // If someone release right-click on the mouse
                else if ((eventData.event.button === 2 && eventData.event.pointerType === "mouse") ||
                    // or let's go of their touches
                    (eventData.event.buttons === 0 && eventData.event.pointerType === "touch") ||
                    // or let's go of a pointer button while Ctrl is pressed
                    eventData.event.ctrlKey) {
                    // Reset the mesh offset so we don't lose the target
                    let mesh = activeMesh;
                    activeMesh = null;
                    setCameraOffset(camera, mesh);
                }
            }
        }, BABYLON.PointerEventTypes.POINTERUP);

        scene.onKeyboardObservable.add((eventData) => {
            // If we're still moving, wait for movement to finish and then reset
            if (camera.inertialPanningX !== 0 || camera.inertialPanningY !== 0) {
                waitForPanning = true;
            }
            // Since we can combine Ctrl with a drag to pan, we also need to account for Ctrl being released first
            else if (activeMesh && (eventData.event.keyCode === 17 || eventData.event.key === "Control")) {
                let mesh = activeMesh;
                activeMesh = null;
                setCameraOffset(camera, mesh);
            }
        }, BABYLON.KeyboardEventTypes.KEYUP);

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