const r = require("raylib");

function generateRandomValues(max) {
    const randomValues = [];

    for (let i = 0; i < 100; i++) {
        randomValues.push(Math.random() * max);
    }

    return randomValues;
}

function setup() {
    const width = 500;
    const height = 500;
    const windowTitle = "Random number";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const randomValues = generateRandomValues(width);

    return {
        screen: { width, height },
        randomValues,
    };
}

function draw(world) {
    console.log(world);
    for (const value of world.randomValues) {
        r.DrawLine(value, 0, value, world.screen.height, r.WHITE);
    }
}

function teardown() {
    r.CloseWindow();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        r.BeginDrawing();
        r.ClearBackground(r.BLUE);
        draw(world);

        r.EndDrawing();
    }
}

function main() {
    const world = setup();
    loop(world);
    teardown();
}

main();
