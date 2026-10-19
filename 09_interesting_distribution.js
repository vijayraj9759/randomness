const r = require("raylib");

function radian(degree) {
    return (Math.PI / 180) * degree;
}

function generateRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function mapX(value, st, end) {
    return ((end - st) / 180) * value;
}

function mapY(value, st, end) {
    return ((end - st) / 10) * 50 * value;
}

function generateRandomPositions(xAxis, yAxis, width, height) {
    const randomPositions = [];

    for (let i = 0; i < 1000; i++) {
        const angle = generateRandomValue(-20, 190);
        const sinValue = Math.sin(radian(angle));

        const randomValue = generateRandomValue(0, sinValue);

        randomPositions.push({
            x: width - mapX(angle, xAxis.min, xAxis.max),
            y: height - mapY(randomValue, yAxis.min, yAxis.max),
        });
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

    const xAxis = { min: 0, max: width };
    const yAxis = { min: 0, max: 100 };
    const randomPositions = generateRandomPositions(
        xAxis,
        yAxis,
        width,
        height,
    );

    console.log(randomPositions);

    return {
        screen: { width, height },
        randomPositions,
        color,
    };
}

function draw(world) {
    // r.DrawCircle();
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
