
kaboom({
  width: 640,
  height: 360,
  scale: 2,
  background: [0, 0, 0],
});

loadSprite("auto", "assets/auto.png");
loadSprite("cow", "assets/cow.png");
loadSprite("pothole", "assets/pothole.png");
loadSprite("chai", "assets/chai.png");
loadSprite("bg", "assets/bg.png");

scene("game", () => {
  let speed = 120;
  let score = 0;

  add([
    sprite("bg", { width: width(), height: height() }),
    pos(0, 0),
    fixed()
  ]);

  const player = add([
    sprite("auto"),
    pos(80, height() - 64),
    area(),
    body(),
  ]);

  const scoreLabel = add([
    text("Score: 0"),
    pos(10, 10),
    fixed(),
    { value: 0 }
  ]);

  function spawnObstacle() {
    const type = choose(["cow", "pothole"]);
    add([
      sprite(type),
      area(),
      pos(width(), height() - 64),
      move(LEFT, speed),
      offscreen({ destroy: true }),
      "obstacle"
    ]);
  }

  function spawnChai() {
    add([
      sprite("chai"),
      area(),
      pos(width(), rand(height() - 100, height() - 64)),
      move(LEFT, speed),
      offscreen({ destroy: true }),
      "chai"
    ]);
  }

  loop(1.5, spawnObstacle);
  loop(3, spawnChai);

  onKeyDown("left", () => {
    player.move(-160, 0);
  });

  onKeyDown("right", () => {
    player.move(160, 0);
  });

  onKeyDown("up", () => {
    player.move(0, -160);
  });

  onKeyDown("down", () => {
    player.move(0, 160);
  });

  onCollide("obstacle", player, () => {
    go("lose", score);
  });

  onCollide("chai", player, (c) => {
    destroy(c);
    score += 10;
    scoreLabel.text = "Score: " + score;
  });
});

scene("lose", (score) => {
  add([
    text("Game Over\nScore: " + score + "\nPress Space to Restart", { size: 24 }),
    pos(width() / 2, height() / 2),
    origin("center"),
  ]);

  onKeyPress("space", () => {
    go("game");
  });
});

go("game");
