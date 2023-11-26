const { init, GameLoop, Sprite, initPointer, track, go, text } = window.crisp;

// ゲームの設定
const config = {
    width: 640,
    height: 480,
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

// ゲームの初期化
init(config);

// プレイヤーと迷路
let player;
let maze;
let startScreen;

// プレイヤーの速度
const playerSpeed = 200;

// キーの設定
const keys = {
    left: "LEFT",
    right: "RIGHT",
    up: "UP",
    down: "DOWN",
};

// ゲームの開始処理
function setup() {
    // スタート画面の作成
    startScreen = add([
        text("Click to Start Game", 24),
        pos(width() / 2, height() / 2),
        origin("center"),
        layer("ui"),
        {
            value: "Click to Start Game",
        },
    ]);

    // タッチ入力の初期化
    initPointer();

    // キー入力の追加
    keyDown(keys.left, () => {
        player.move(-playerSpeed, 0);
    });
    keyDown(keys.right, () => {
        player.move(playerSpeed, 0);
    });
    keyDown(keys.up, () => {
        player.move(0, -playerSpeed);
    });
    keyDown(keys.down, () => {
        player.move(0, playerSpeed);
    });
}

// フレームごとの更新処理
function update() {
    if (startScreen.isClicked()) {
        // スタート画面がクリックされたらゲームを開始
        startScreen.text = "";
        startScreen.action(() => {
            startScreen.use();
        });
        startScreen.clicked = false;
    }

    // ゲームのロジックを追加する（前回のコードをそのまま使用）

    // プレイヤーが迷路に触れたら終了
    if (player.isColliding(maze)) {
        go("gameOver", scoreLabel.value);
    }
}


// リソースの読み込み処理
function preload() {
    // ...（前回のコードをそのまま使用）
}

// ゲーム画面の構築処理
function create() {
    // ゲームの初期化処理を呼び出す
    setup();

    // タッチ入力の追加
    startScreen.clicks(() => {
        startGame();
    });
}

// 迷路の作成処理
function addMaze(config) {
    const maze = add([
        rect(config.width, config.height),
        layer("maze"),
        pos(config.x, config.y),
        area(config.width, config.height),
        solid(),
    ]);

    // 外側の壁を作成
    const outerWalls = add([
        rect(config.width + config.wallThickness * 2, config.wallThickness),
        rect(config.wallThickness, config.height),
        rect(config.width + config.wallThickness * 2, config.wallThickness),
        rect(config.wallThickness, config.height),
        area(config.width + config.wallThickness * 2, config.wallThickness),
        area(config.wallThickness, config.height),
        area(config.width + config.wallThickness * 2, config.wallThickness),
        area(config.wallThickness, config.height),
        pos(config.x - config.wallThickness, config.y - config.wallThickness),
        layer("maze"),
        solid(),
    ]);

    // 内側の壁をランダムに作成
    for (let i = 0; i < config.innerWalls; i++) {
        const wall = add([
            rect(config.wallThickness, rand(config.minWallHeight, config.maxWallHeight)),
            rect(rand(config.minWallWidth, config.maxWallWidth), config.wallThickness),
            area(config.wallThickness, rand(config.minWallHeight, config.maxWallHeight)),
            area(rand(config.minWallWidth, config.maxWallWidth), config.wallThickness),
            pos(config.x, config.y),
            layer("maze"),
            solid(),
        ]);

        wall.moveTo(rand(config.x, config.x + config.width - config.wallThickness), rand(config.y, config.y + config.height - config.wallThickness));
    }

    // プレイヤーの初期位置に開始地点を追加
    const start = add([
        rect(config.wallThickness, config.wallThickness),
        pos(config.x, config.y),
        area(config.wallThickness, config.wallThickness),
        layer("maze"),
        "start",
    ]);

    // ゴールの位置に終了地点を追加
    const goal = add([
        rect(config.wallThickness, config.wallThickness),
        pos(config.x + config.width - config.wallThickness, config.y + config.height - config.wallThickness),
        area(config.wallThickness, config.wallThickness),
        layer("maze"),
        "goal",
    ]);

    return maze;
}


// ゲームを開始する関数
function startGame() {
    startScreen.text = "";
    startScreen.action(() => {
        startScreen.use();
    });
    startScreen.clicked = false;
}
