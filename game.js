const { init, GameLoop, Sprite, initPointer, track } = window.crisp;

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

// プレイヤーの速度
const playerSpeed = 200;

// 迷路の設定
const mazeConfig = {
    rows: 9,
    cols: 9,
    cellSize: 64,
    playerSize: 40,
};

// キーの設定
const keys = {
    left: "LEFT",
    right: "RIGHT",
    up: "UP",
    down: "DOWN",
};

// ゲームの開始処理
function setup() {
    // プレイヤーの作成
    player = add([
        sprite("player"),
        pos(maze.width / 2, maze.height / 2),
        origin("center"),
        scale(0.8),
        "player",
    ]);

    // 迷路の作成
    maze = addMaze(mazeConfig);

    // タッチ入力の初期化
    initPointer();

    // タッチ入力の追加
    player.action(() => {
        player.move(120);
    });

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
    // プレイヤーが迷路に触れたら終了
    if (player.isColliding(maze)) {
        go("gameOver", scoreLabel.value);
    }
}

// リソースの読み込み処理
function preload() {
    loadSprite("player", "path/to/player/image.png");
    // 他のリソースの読み込み処理を追加することができます
}

// ゲーム画面の構築処理
function create() {
    // ゲームの初期化処理を呼び出す
    setup();
}

// 迷路の作成処理
function addMaze(config) {
    const maze = add([
        rect(config.cols * config.cellSize, config.rows * config.cellSize),
        pos(0, 0),
        layer("maze"),
    ]);

    // 迷路の構造を作成するロジックを追加することができます

    return maze;
}
