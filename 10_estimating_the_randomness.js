const r = require("raylib");

function randomValueBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function generateRandomValues(square) {
    const randomValues = [];

    for (let i = 0; i < 200; i++) {
        const x = randomValueBetween(square.x, square.x + square.width);
        const y = randomValueBetween(square.y, square.y + square.height);

        randomValues.push({ x, y });
    }

    return randomValues;
}

function areaOfCircle(radius) {
    return Math.PI * radius * radius;
}

function calculateDistance(pointA, pointB) {
    const x1 = pointA.x;
    const x2 = pointB.x;
    const y1 = pointA.y;
    const y2 = pointB.y;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function calculateAreaFromRandomCircle(circle, randomCircles) {
    let estimatedArea = 0;

    for (const randomCirclePosition of randomCircles.positions) {
        const distance = calculateDistance(circle.center, randomCirclePosition);

        if (distance <= circle.radius)
            estimatedArea += areaOfCircle(randomCircles.radius);
    }

    return estimatedArea;
}

function setup() {
    const width = 500;
    const height = 500;
    const windowTitle = "Random number";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const window = { width, height };

    const square = {
        x: 50,
        y: 50,
        width: 200,
        height: 200,
    };

    const circle = {
        center: { x: 150, y: 150 },
        radius: 100,
    };

    const randomCircleRadius = 2;
    const randomValues = generateRandomValues(square);

    const randomCircle = {
        radius: randomCircleRadius,
        positions: randomValues,
    };

    circle.actualArea = areaOfCircle(circle.radius);
    circle.estimatedArea = calculateAreaFromRandomCircle(circle, randomCircle);

    return {
        window,
        square,
        circle,
        randomValues,
        randomCircleRadius,
    };
}

function drawRandomCircle(randomValues, radius) {
    for (const value of randomValues) {
        r.DrawCircleV(value, radius, r.WHITE);
    }
}

function draw(world) {
    const window = world.window;
    const randomValues = world.randomValues;
    const square = world.square;
    const circle = world.circle;

    const message1 = `Acutal Area : ${circle.actualArea}`;
    const message2 = `Estimated Area : ${circle.estimatedArea}`;

    r.DrawRectangleRec(square, r.YELLOW);
    r.DrawCircleV(circle.center, circle.radius, r.RED);
    drawRandomCircle(randomValues, world.randomCircleRadius);

    r.DrawText(`${message1}`, 50, 300, 12, r.WHITE);
    r.DrawText(`${message2}`, 50, 350, 12, r.WHITE);
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
