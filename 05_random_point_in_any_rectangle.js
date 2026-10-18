const r = require("raylib");

function generateRandomValue(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomPositions(startPos, endPos) {
    const randomPositions = [];

    for (let i = 0; i < 100; i++) {
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

    const rectangle = {
        x: 700,
        y: 100,
        width: 800,
        height: 300,
    };

    const startPos = { x: rectangle.x, y: rectangle.y };
    const endPos = {
        x: rectangle.x + rectangle.width,
        y: rectangle.y + rectangle.height,
    };
    const randomPositions = generateRandomPositions(startPos, endPos);

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
        rectangle,
        randomPositions,
        colorPalatte,
    };
}

function draw(world) {
    const rectangle = world.rectangle;
    r.DrawRectangleLines(
        rectangle.x,
        rectangle.y,
        rectangle.width,
        rectangle.height,
        world.colorPalatte[1],
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
