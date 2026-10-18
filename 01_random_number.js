const r = require("raylib");

function setup() {
    const width = 500;
    const height = 500;
    const windowTitle = "Random number";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    return {
        screen: { width, height },
    };
}

function draw(world) {
    const x = Math.random() * 1000;
    const y = Math.random() * 1000;

    r.DrawCircle(x, y, 10, r.RED);
}

function teardown() {
    r.CloseWindow();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        r.BeginDrawing();
        r.ClearBackground(r.BLACK);
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
