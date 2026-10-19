const r = require("raylib");

function generateRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomPositions(startPos, endPos) {
    const randomPositions = [];

    for (let i = 0; i < 100; i++) {
        const x1 = generateRandomValue(startPos.x, endPos.x);
        const x2 = generateRandomValue(startPos.x, endPos.x);
        const x3 = generateRandomValue(startPos.x, endPos.x);

        const y1 = generateRandomValue(startPos.y, endPos.y);
        const y2 = generateRandomValue(startPos.y, endPos.y);
        const y3 = generateRandomValue(startPos.y, endPos.y);

        randomPositions.push({ x: (x1 + x2 + x3) / 3, y: (y1 + y2 + y3) / 3 });
    }

    return randomPositions;
}

function setup() {
    const width = 1500;
    const height = 600;
    const windowTitle = "Random number";
    const fps = 10;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const color = {
        r: 255,
        g: 255,
        b: 255,
        a: 100,
    };

    return {
        screen: { width, height },
        color,
    };
}

function draw(world) {
    const startPos = { x: 0, y: 0 };
    const endPos = { x: 1500, y: 600 };
    const randomPositions = generateRandomPositions(startPos, endPos);

    for (const position of randomPositions) {
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
