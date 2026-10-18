const r = require("raylib");

function generateRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomPositions(center, width, height, angle) {
    const randomPositions = [];

    for (let i = 0; i < 1000; i++) {
        const rW = generateRandomValue(0, width);
        const rH = generateRandomValue(0, height);

        const y = center.y + rH;

        const p = y - center.y;
        const translateX = p / Math.tan(angle);
        const x = center.x + rW + translateX;

        randomPositions.push({ x, y });
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
        center: { x: 300, y: 300 },
        vector1: { radius: 900, angle: radian(0) },
        vector2: { radius: 300, angle: radian(120) },
    };

    const parallelogram = calcParallelogramCoordinates(parallelogramConfig);

    const randomPositions = generateRandomPositions(
        parallelogramConfig.center,
        parallelogram.b.x - parallelogram.a.x,
        parallelogram.c.y - parallelogram.a.y,
        radian(120),
    );

    return {
        screen: { width, height },
        parallelogram,
        randomPositions,
    };
}

function drawParallelogram(parallelogram) {
    r.DrawLineV(parallelogram.a, parallelogram.b, r.WHITE);
    r.DrawLineV(parallelogram.b, parallelogram.c, r.WHITE);
    r.DrawLineV(parallelogram.c, parallelogram.d, r.WHITE);
    r.DrawLineV(parallelogram.d, parallelogram.a, r.WHITE);
}

function draw(world) {
    const parallelogram = world.parallelogram;

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
