import * as planck from 'planck';
let Vec2 = planck.Vec2;
const heigh = 3400.0;
let box: HTMLDivElement;
let lastTime: any;
let lastY: any;
// Define the gravity vector.
let gravity = Vec2(0.0, -100.0);

// Construct a world object, which will hold and simulate the rigid bodies.
let world = planck.World(gravity);

// Define the ground body.
let groundBodyDef = {
    position: Vec2(0.0, -10.0)
};

// Call the body factory which allocates memory for the ground body
// from a pool and creates the ground box shape (also from a pool).
// The body is also added to the world.
let groundBody = world.createBody(groundBodyDef);

// Define the ground box shape.
// The extents are the half-widths of the box.
let groundBox = planck.Box(50.0, 10.0);

// Add the ground fixture to the ground body.
groundBody.createFixture(groundBox, 0.0);

// Define the dynamic body. We set its position and call the body factory.
let bodyDef: planck.BodyDef = {
    type: 'dynamic',
    position: Vec2(0.0, heigh),
}
let body = world.createBody(bodyDef);

// Define another box shape for our dynamic body.
let dynamicBox = planck.Box(1.0, 1.0);

// Define the dynamic body fixture.
let fixtureDef = {
    shape: dynamicBox,
    // Set the box density to be non-zero, so it will be dynamic.
    density: 1.0,
    // Override the default friction.
    // friction: 0,
};

// Add the shape to the body.
body.createFixture(fixtureDef);

// Prepare for simulation. Typically we use a time step of 1/60 of a
// second (60Hz) and 10 iterations. This provides a high quality simulation
// in most game scenarios.
let timeStep = 1.0 / 60.0;
let velocityIterations = 6;
let positionIterations = 2;

function loop() {
    let t = Date.now();
    if ((t - lastTime) / 1000 > 0.016) {
        // In each frame call world.step with fixed timeStep
        world.step(timeStep);
        // Request a new frame

        let position = body.getPosition();
        // let angle = body.getAngle();
        box.style.top = (heigh - position.y) + 'px';
        console.log(position.x, lastY - position.y);
        lastY = position.y;
        lastTime = Date.now();
    }
    window.requestAnimationFrame(loop);

}


export default function () {
    box = document.querySelector('.box') as HTMLDivElement;
    lastTime = Date.now();
    loop();
}

// console.log(Math.abs(position.x) < 0.01);
// console.log(Math.abs(position.y - 1.01) < 0.01);
// console.log(Math.abs(angle) < 0.01);