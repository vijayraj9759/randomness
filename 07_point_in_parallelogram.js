const r = require("raylib");

function scaleVector(vector, scaleFactor) {
    return r.Vector2Scale(vector, scaleFactor);
}

function addVector(v1, v2) {
    return r.Vector2Add(v1, v2);
}

function generateRandomPositions(parallelogramConfig) {
    const randomPositions = [];
    const { vector1, vector2 } = parallelogramConfig;

    for (let i = 0; i < 500; i++) {
        const randomX = Math.random();
        const randomY = Math.random();

        const tH = scaleVector(vector1, randomX);
        const tV = scaleVector(vector2, randomY);

        const randomPosition = addVector(tH, tV);

        randomPositions.push(randomPosition);
    }

    return randomPositions;
}

function calcParallelogramCoordinates(parallelogramConfig) {
    const cf = parallelogramConfig;

    const a = cf.st;
    const b = addVector(a, cf.vector1);
    const d = addVector(a, cf.vector2);
    const c = addVector(b, d);

    return { a, b, c, d };
}

function setup() {
    const width = 1500;
    const height = 600;
    const windowTitle = "Random number";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const parallelogramConfig = {
        st: { x: 0, y: 0 },
        vector1: { x: 500, y: 0 },
        vector2: { x: 100, y: 100 },
    };

    const randomPositions = generateRandomPositions(parallelogramConfig);
    const parallelogram = calcParallelogramCoordinates(parallelogramConfig);

    return {
        screen: { width, height },
        randomPositions,
        parallelogram,
    };
}

function drawParallelogram(parallelogram) {
    r.DrawLineV(parallelogram.a, parallelogram.b, r.BLACK);
    r.DrawLineV(parallelogram.b, parallelogram.c, r.BLACK);
    r.DrawLineV(parallelogram.c, parallelogram.d, r.BLACK);
    r.DrawLineV(parallelogram.d, parallelogram.a, r.BLACK);
}

function draw(world) {
    const parallelogram = world.parallelogram;

    const color = {
        r: 255,
        g: 255,
        b: 255,
        a: 100,
    };

    drawParallelogram(parallelogram);

    for (const value of world.randomPositions) {
        r.DrawCircleV(value, 10, color);
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
