//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//marsh
let marshWidth = 34; //width/height ratio 408/228 = 17/12
let marshHeight = 24;
let marshX = boardWidth / 8;
let marshY = boardHeight / 2;

let marsh = {
    x: marshX,
    y: marshY,
    width: marshWidth,
    height: marshHeight
}

//mugs(pipes)
let pipes = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;


let topPipeImg;
let bottomPipeImg;

//game physics
let veloX = -2; //pipes moving left speed
let veloY = 0; //marsh jump speed
let gravity = 0.4;

//game attributes
let gameOver = false;
let started = false;
let score = 0;
let highScore = 0;



window.onload = function() {
    board = document.getElementById("board")
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on board

    //draw marshmallow
    //context.fillStyle = "green";
    //context.fillRect(marsh.x, marsh.y, marsh.width, marsh.height);

    //load images
    marshImg = new Image();
    marshImg.src = "./cocoa-flap-sprites/marshmallow.png";
    marshImg.onload = function() {
        context.drawImage(marshImg, marsh.x, marsh.y, marsh.width, marsh.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./cocoa-flap-sprites/pipe_top.png";
    bottomPipeImg = new Image();
    bottomPipeImg.src = "./cocoa-flap-sprites/pipe_bottom.png";
    requestAnimationFrame(loop);
    setInterval(placePipes, 1500); //every 1.5 secs
    document.addEventListener("keydown", moveMarsh);
    board.addEventListener("touchstart", moveMarsh, { passive: false});
}


function loop() {
    requestAnimationFrame(loop);

    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    //marsh
    veloY += gravity;
    //marsh.y += veloY; //no limit
    marsh.y = Math.max(marsh.y + veloY, 0); //0 is top of canvas, applies gravity to marsh or limit to top of canvas
    context.drawImage(marshImg, marsh.x, marsh.y, marsh.width, marsh.height);

    if (marsh.y > board.height) {
        gameOver = true;
    }

    //pipes
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        pipe.x += veloX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && marsh.x > pipe.x + pipe.width) {
            score += 0.5;
            pipe.passed = true;
        }

        if (detectCollision(marsh, pipe)) {
            gameOver = true;
        }
    }

    // clear pipes
    while (pipes.length > 0 && pipes[0].x < -pipeWidth) {
        pipes.shift(); // removes first element from array
    }

    // score board
    context.fillStyle = "white";
    context.font = "35px sans-serif";
    context.fillText(score, 5, 45);
    context.fillText(`High Score: ${highScore}`, 100, 45);

    if (gameOver) {
        context.fillText("Game Over", 5, 90);
    }

    if(!started) {
        context.font = "35px sans-serif";
        context.fillText("Tap to Play", 5, 120);
    }
}

function placePipes() {
    if (gameOver) {
        return;
    }

   let randPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
   let openSpace = board.height / 4;

   let topPipe = { 
        img: topPipeImg,
        x: pipeX,
        y: randPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
   }

   pipes.push(topPipe);


   let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randPipeY + pipeHeight + openSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
   }

   pipes.push(bottomPipe)
}

// takes in key event
function moveMarsh(e) {
    if (e.type == "touchstart") {
        e.preventDefault();
    }

    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX" ||e.type == "touchstart" ) {
        started = true;
        //jump
        veloY = -6;

        // reset game
        if (gameOver) {
            if (score > highScore) {
                highScore = score;
            }
            marsh.y = marshY;
            pipes = [];
            score = 0;
            gameOver = false;
            started = false;
        }
        
    }
}

function detectCollision(a, b) {
    return  a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}