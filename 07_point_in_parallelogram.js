const r = require("raylib");

function generateRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomPositions(pos, radius) {
    const randomPositions = [];

    for (let i = 0; i < 500; i++) {
        const r = generateRandomValue(0, radius);
        const angle = generateRandomValue(0, 360);

        const x = pos.x + r * Math.cos(angle);
        const y = pos.y + r * Math.sin(angle);

        randomPositions.push({ x, y });
    }

    return randomPositions;
}

function radian(degree) {
    return (Math.PI / 180) * degree;
}

function setup() {
    const width = 1500;
    const height = 600;
    const windowTitle = "Random number";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const parallelogramConfig = {
        center: { x: 300, y: 300 },
        vector1: { radius: 900, angle: radian(0) },
        vector2: { radius: 200, angle: radian(60) },
    };

    const parallelogram = calcParallelogramCoordinates(parallelogramConfig);

    const colorPalatte = [
        {
            r: 255,
            g: 255,
            b: 255,
            a: 100,
        },
        r.WHITE,
    ];

    return {
        screen: { width, height },
        colorPalatte,
        parallelogram,
    };
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

function drawParallelogram(parallelogram) {
    r.DrawLineV(parallelogram.a, parallelogram.b, r.WHITE);
    r.DrawLineV(parallelogram.b, parallelogram.c, r.WHITE);
    r.DrawLineV(parallelogram.c, parallelogram.d, r.WHITE);
    r.DrawLineV(parallelogram.d, parallelogram.a, r.WHITE);
}

function draw(world) {
    const colorPalatte = world.colorPalatte;
    const parallelogram = world.parallelogram;

    drawParallelogram(parallelogram);
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
