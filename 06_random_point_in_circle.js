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

function setup() {
    const width = 1500;
    const height = 600;
    const windowTitle = "Random number";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const circle = {
        position: { x: 750, y: 300 },
        radius: 200,
    };

    const randomPositions = generateRandomPositions(
        circle.position,
        circle.radius,
    );

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
        randomPositions,
        colorPalatte,
        circle,
    };
}

function draw(world) {
    const circle = world.circle;
    const colorPalatte = world.colorPalatte;

    r.DrawCircleLines(
        circle.position.x,
        circle.position.y,
        circle.radius,
        colorPalatte[1],
    );

    for (const position of world.randomPositions) {
        r.DrawCircleV(position, 10, world.colorPalatte[0]);
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
