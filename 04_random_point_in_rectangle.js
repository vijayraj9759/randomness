const r = require("raylib");

function generateRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomPositions(startPos, endPos) {
    const randomPositions = [];

    for (let i = 0; i < 1000; i++) {
        const x = generateRandomValue(startPos.x, endPos.x);
        const y = generateRandomValue(startPos.y, endPos.y);

        randomPositions.push({ x, y });
    }

    return randomPositions;
}

function setup() {
    const width = 1500;
    const height = 600;
    const windowTitle = "Random number";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const startPos = { x: 0, y: 0 };
    const endPos = { x: width, y: height };
    const randomPositions = generateRandomPositions(startPos, endPos);

    const color = {
        r: 255,
        g: 255,
        b: 255,
        a: 100,
    };

    return {
        screen: { width, height },
        randomPositions,
        color,
    };
}

function draw(world) {
    for (const position of world.randomPositions) {
        r.DrawCircleV(position, 20, world.color);
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
