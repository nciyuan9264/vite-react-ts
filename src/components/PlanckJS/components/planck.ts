import * as planck from 'planck';
import { BodyDef } from '../../../planck';
let Vec2 = planck.Vec2;

// Define the gravity vector.
let gravity = Vec2(0.0, -10.0);

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
let bodyDef: BodyDef = {
    type: 'dynamic',
    position: Vec2(0.0, 4.0),
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
    friction: 0.3,
};

// Add the shape to the body.
body.createFixture(fixtureDef);

// Prepare for simulation. Typically we use a time step of 1/60 of a
// second (60Hz) and 10 iterations. This provides a high quality simulation
// in most game scenarios.
let timeStep = 1.0 / 60.0;
let velocityIterations = 6;
let positionIterations = 2;


// This is our little game loop.
for (let i = 0; i < 60; ++i) {
    // Instruct the world to perform a single step of simulation.
    // It is generally best to keep the time step and iterations fixed.
    world.step(timeStep, velocityIterations, positionIterations);

    // Now print the position and angle of the body.
    let position = body.getPosition();
    let angle = body.getAngle();

    console.log(position.x.toFixed(2), position.y.toFixed(2), angle.toFixed(2));
}

export default function () {
    for (let i = 0; i < 60; ++i) {
        // Instruct the world to perform a single step of simulation.
        // It is generally best to keep the time step and iterations fixed.
        world.step(timeStep, velocityIterations, positionIterations);

        // Now print the position and angle of the body.
        let position = body.getPosition();
        let angle = body.getAngle();

        console.log(position.x.toFixed(2), position.y.toFixed(2), angle.toFixed(2));
    }
}

// console.log(Math.abs(position.x) < 0.01);
// console.log(Math.abs(position.y - 1.01) < 0.01);
// console.log(Math.abs(angle) < 0.01);