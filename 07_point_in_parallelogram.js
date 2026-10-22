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

function radian(degree) {
    return (Math.PI / 180) * degree;
}

function polarCoordinateX(r, angle) {
    return r * Math.cos(angle);
}

function polarCoordinateY(r, angle) {
    return r * Math.sin(angle);
}

function calcParallelogramCoordinates(parallelogram) {
    const x = parallelogram.center.x;
    const y = parallelogram.center.y;

    const a1 = parallelogram.vector1.angle;
    const a2 = parallelogram.vector2.angle;

    const r1 = parallelogram.vector1.radius;
    const r2 = parallelogram.vector2.radius;

    const a = parallelogram.center;
    const b = {
        x: x + polarCoordinateX(r1, a1),
        y: y + polarCoordinateY(r1, a1),
    };
    const c = {
        x: b.x + polarCoordinateX(r2, a2),
        y: b.y + polarCoordinateY(r2, a2),
    };
    const d = {
        x: x + polarCoordinateX(r2, a2),
        y: y + polarCoordinateY(r2, a2),
    };

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
        vector1: { x: 500, y: 0 },
        vector2: { x: 100, y: 100 },
    };

    const randomPositions = generateRandomPositions(parallelogramConfig);

    return {
        screen: { width, height },
        randomPositions,
        parallelogramConfig,
    };
}

function drawParallelogram(parallelogram) {
    r.DrawLineV(parallelogram.a, parallelogram.b, r.WHITE);
    r.DrawLineV(parallelogram.b, parallelogram.c, r.WHITE);
    r.DrawLineV(parallelogram.c, parallelogram.d, r.WHITE);
    r.DrawLineV(parallelogram.d, parallelogram.a, r.WHITE);
}

function draw(world) {
    // const parallelogram = world.parallelogram;

    // drawParallelogram(parallelogram);
    const cf = world.parallelogramConfig;
    const center = { x: 0, y: 0 };

    const a = center;
    const b = c.vector1;
    const c = c.vector2;
    const d = addVector(b, c);

    const parallelogram = { a, b, c, d };
    drawParallelogram(parallelogram);

    for (const value of world.randomPositions) {
        r.DrawCircleV(value, 10, r.WHITE);
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
