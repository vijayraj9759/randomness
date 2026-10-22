const r = require("raylib");

function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function radian(degree) {
    return (Math.PI / 180) * degree;
}

function generateRandomValues(min, max) {
    const randomValues = [];

    for (let i = 0; i < 1000; i++) {
        // const r1 = Math.sin(radian(randomValueBetween(0, 360))) * 500;
        // const r2 = Math.cos(radian(randomValueBetween(0, 360))) * 500;

        const r1 = randomValueBetween(min, max);
        const r2 = randomValueBetween(min, max);
        const r3 = randomValueBetween(min, max);
        const r4 = randomValueBetween(min, max);

        randomValues.push((r1 + r2 + r3 + r4) / 4);
        // randomValues.push((r1 + r2) / 3);
    }

    return randomValues;
}

function isBetween(x, y, z) {
    return x <= y && y <= z;
}

function calculateFrequencey(elements, range) {
    const min = range.st;
    const max = range.end;

    let frequency = 0;
    for (const element of elements) {
        if (isBetween(min, element, max)) frequency++;
    }

    return frequency;
}

function calculateGraphCoordinates(randomValues, rangeWidth, window) {
    const wHeight = window.height;

    const coordinates = [];
    for (let i = 0; i < 10; i++) {
        const range = {
            st: i * rangeWidth,
            end: (i + 1) * rangeWidth,
        };

        const noOfElements = calculateFrequencey(randomValues, range);

        console.log(noOfElements);

        const x = range.st + (range.end - range.st) / 2;
        const y = wHeight - noOfElements;

        coordinates.push({ x, y });
    }

    console.log(coordinates);

    return coordinates;
}

function setup() {
    const width = 500;
    const height = 500;
    const windowTitle = "Random number";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const min = 0;
    const max = width;
    const randomValues = generateRandomValues(min, max);
    const rangeWidth = width / 10;

    const window = { width, height };

    const lineGraphCoordinates = calculateGraphCoordinates(
        randomValues,
        rangeWidth,
        window,
    );

    return {
        window,
        randomValues,
        lineGraphCoordinates,
    };
}

function drawRandomValues(randomValues, window) {
    for (const value of randomValues) {
        r.DrawLine(value, 0, value, window.height, r.WHITE);
    }
}

function drawGraph(coordinates) {
    for (let i = 0; i < coordinates.length - 1; i++) {
        r.DrawCircleV(coordinates[i], 10, r.RED);
        r.DrawLineEx(coordinates[i], coordinates[i + 1], 2, r.RED);
    }
}

function draw(world) {
    const window = world.window;
    const graphCoordinates = world.lineGraphCoordinates;
    const randomValues = world.randomValues;

    drawRandomValues(randomValues, window);
    drawGraph(graphCoordinates);
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
