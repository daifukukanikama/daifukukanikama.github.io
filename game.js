const { init, GameLoop, Sprite, initPointer, track, go } = window.crisp;

// ゲームの設定
const config = {
    // ...（前回のコードをそのまま使用）
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
}

// 迷路の作成処理
function addMaze(config) {
    // ...（前回のコードをそのまま使用）
}

// ゲームを開始する関数
function startGame() {
    startScreen.text = "";
}
