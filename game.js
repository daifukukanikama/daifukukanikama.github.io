const { init, GameLoop, Sprite, initPointer, track } = window.crisp;

const mazeSize = 10; // 迷路のサイズ
const tileSize = 40; // タイルのサイズ
const playerSpeed = 2;

let player;
let maze = [];

function setup() {
    init();
    initPointer();

    // プレイヤーの初期化
    player = new Sprite({
        x: tileSize / 2,
        y: tileSize / 2,
        width: 20,
        height: 20,
        color: '#00F',
        shape: 'circle',
    });

    // 迷路の初期化
    generateMaze();

    // ゲームループの設定
    GameLoop(gameLoop).start();
}

function generateMaze() {
    // 初期化
    maze = [];

    for (let i = 0; i < mazeSize; i++) {
        maze[i] = [];
        for (let j = 0; j < mazeSize; j++) {
            maze[i][j] = Math.random() > 0.7 ? 1 : 0; // 70%の確率で通路（0）、30%で壁（1）
        }
    }

    // スタートとゴールの設定
    maze[0][0] = 0; // スタート地点
    maze[mazeSize - 1][mazeSize - 1] = 0; // ゴール地点

    // 迷路生成
    dfs(0, 0);
}

function dfs(x, y) {
    // Depth First Searchアルゴリズムに基づく迷路生成
    const directions = [
        { dx: 0, dy: -2 },
        { dx: 2, dy: 0 },
        { dx: 0, dy: 2 },
        { dx: -2, dy: 0 },
    ];

    directions.sort(() => Math.random() - 0.5);

    for (const dir of directions) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;

        if (nx >= 0 && ny >= 0 && nx < mazeSize && ny < mazeSize && maze[nx][ny] === 1) {
            maze[nx][ny] = 0;
            maze[x + dir.dx / 2][y + dir.dy / 2] = 0;
            dfs(nx, ny);
        }
    }
}

function gameLoop() {
    update();
    draw();
}

function update() {
    player.update();

    // プレイヤーの移動
    if (track(player)) {
        const dx = player.x - player.prevX;
        const dy = player.y - player.prevY;

        if (dx !== 0 || dy !== 0) {
            const nextX = Math.round(player.x / tileSize);
            const nextY = Math.round(player.y / tileSize);

            if (nextX >= 0 && nextX < mazeSize && nextY >= 0 && nextY < mazeSize && maze[nextX][nextY] === 0) {
                player.x = nextX * tileSize + tileSize / 2;
                player.y = nextY * tileSize + tileSize / 2;
            }
        }
    }
}

function draw() {
    drawMaze();
    player.draw();
}

function drawMaze() {
    for (let i = 0; i < mazeSize; i++) {
        for (let j = 0; j < mazeSize; j++) {
            if (maze[i][j] === 1) {
                // 壁
                drawWall(i * tileSize, j * tileSize);
            }
        }
    }
}

function drawWall(x, y) {
    // 壁を描画
    window.crisp.drawRect(x, y, tileSize, tileSize, '#000');
}

// ゲーム開始
setup();
