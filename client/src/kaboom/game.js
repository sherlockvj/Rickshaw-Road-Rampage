import kaboom from "kaboom";

export default function initGame(canvas) {
    const k = kaboom({
        canvas,
        background: [10, 10, 10],
        width: 960,
        height: 540,
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
        scale
    } = k;


    setGravity(1600);


    loadSprite("rickshaw", "/assets/rickshaw1.png");

    scene("main", () => {
        add([
            rect(960, 48),
            pos(0, 492),
            color(34, 177, 76),
            area(),
            body({ isStatic: true }),
        ]);

        const player = add([
            sprite("rickshaw"),
            pos(100, 0),
            area(),
            body(),
            scale(0.25),
        ]);

        onKeyDown("left", () => player.move(-240, 0));
        onKeyDown("right", () => player.move(240, 0));
        onKeyDown("up", () => {
            if (player.isGrounded()) player.jump(800);
        });
    });

    go("main");

    // Return cleanup function
    return () => {
        k.destroyAll();
    };
}
