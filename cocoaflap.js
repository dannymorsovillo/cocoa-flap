//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//marsh
let marshWidth = 34; //width/height ratio 408/228 = 17/12
let marshHeight = 24;
let marshX = boardWidth/8;
let marshY = boardHeight/2;

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
let veloX = -2;//pipes moving left speed






window.onload = function() {
    board = document.getElementById("board")
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used for drawing on board


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
    setInterval(placePipes, 1500);
}


function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0, 0, board.width, board.height);

    //marsh
    context.drawImage(marshImg, marsh.x, marsh.y, marsh.width, marsh.height);

    //pipes
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        pipe.x += veloX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}

function placePipes() {

   let randPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);


   let topPipe = { 
        img: topPipeImg,
        x: pipeX,
        y: randPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
   }

   pipes.push(topPipe);
}