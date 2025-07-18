// game.js
import kaboom from "kaboom";

export default function initGame(canvas) {
    const k = kaboom({
        canvas,
        background: [135, 206, 235],
        fullscreen: true,
        scale: 1,
    });

    const {
        loadSprite,
        add,
        pos,
        sprite,
        area,
        body,
        setGravity,
        onKeyDown,
        rect,
        color,
        go,
        scene,
        scale,
        camPos,
        width,
        height,
        loop,
        dt,
        choose,
        rand,
        opacity,
        z,
        outline,
        fixed
    } = k;

    setGravity(1600);

    loadSprite("rickshaw", "/assets/rickshaw1.png");
    loadSprite("cow", "/assets/cow.png");
    loadSprite("pothole", "/assets/pothole.png");

    let score = 0;
    const scoreLabel = add([
        k.text("Score: 0", { size: 24 }),
        pos(20, 20),
        color(0, 0, 0),
        fixed(),
        z(100),
    ]);

    scene("main", () => {
        let score = 0;
        let gameOver = false;
        const scoreLabel = add([
            k.text("Score: 0", { size: 24 }),
            pos(20, 20),
            color(0, 0, 0),
            fixed(),
            z(100),
        ]);

        let speed = 240;
        const speedIncrement = 2;

        add([
            rect(100000, 48),
            pos(0, height() - 48),
            color(34, 177, 76),
            area(),
            body({ isStatic: true }),
        ]);

        const player = add([
            sprite("rickshaw"),
            scale(0.25),
            area(),
            body(),
            pos(0, 0),
        ]);

        onKeyDown("up", () => {
            if (player.isGrounded()) {
                player.jump(1200);
                score += 50
            }
        });

        const obstacleTypes = ["cow", "pothole"];
        const obstacleImages = {
            cow: "cow",
            pothole: "pothole",
        };

        let lastX = player.pos.x + 500;
        for (let i = 0; i < 30; i++) {
            const type = choose(obstacleTypes);
            const gap = rand(600, 1000);
            lastX += gap;

            add([
                sprite(obstacleImages[type]),
                scale(0.1),
                area(),
                body({ isStatic: true }),
                pos(lastX, type == "cow" ? (height() - 120) : (height() - 70)),
                "obstacle",
            ]);
        }

        k.onUpdate(() => {
            if (gameOver) return;
            player.move(speed, 0);
            camPos(player.pos.x + 200, height() / 2);
            speed += speedIncrement * dt();
            score += dt() * 10;
            scoreLabel.text = `Score: ${Math.floor(score)}`;
        });

        player.onCollide("obstacle", () => {
            if (gameOver) return;
            gameOver = true;
            speed = 0;

            add([
                rect(width(), height()),
                pos(player.pos.x - width() / 2 + 200, 0),
                color(0, 0, 0),
                opacity(0.6),
                z(100),
            ]);

            add([
                rect(300, 160),
                pos(player.pos.x + 50, height() / 2 - 80),
                color(255, 0, 0),
                outline(4),
                z(110),
            ]);

            add([
                k.text("💀 GAME OVER 💀", {
                    size: 24,
                    font: "sinko",
                }),
                pos(player.pos.x + 90, height() / 2 - 60),
                color(255, 255, 255),
                z(111),
            ]);

            // 👉 Final Score with Blinking
            const finalScore = add([
                k.text(`Score: ${Math.floor(score)}`, {
                    size: 20,
                    font: "sinko",
                }),
                pos(player.pos.x + 110, height() / 2 - 20),
                color(255, 255, 0),
                z(111),
                opacity(1),
            ]);

            loop(0.5, () => {
                finalScore.hidden = !finalScore.hidden;
            });

            const retryBtn = add([
                rect(140, 40),
                pos(player.pos.x + 130, height() / 2 + 10),
                color(0, 0, 0),
                area(),
                z(112),
                "retry",
            ]);

            add([
                k.text("RETRY", { size: 18 }),
                pos(retryBtn.pos.x + 30, retryBtn.pos.y + 10),
                color(255, 255, 255),
                z(113),
            ]);

            retryBtn.onClick(() => {
                score = 0;
                go("main");
            });
        });

    });

    go("main");

    return () => {
        k.destroyAll();
    };
}
