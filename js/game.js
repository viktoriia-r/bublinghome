
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d"); //вид игры

var bird = new Image(); 
//var fish = new Image();
var bg = new Image();   //Objekr erstellen - background 
var fg = new Image();   //front ground
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/turtle.png"; // Указание нужного изображения
bg.src = "img/bg2.png";
fg.src = "img/fg1.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Audio
//var fly = new Audio();          // Создание аудио объекта
var score_audio = new Audio();
var swim = new Audio();

//fly.src = "audio/fly.mp3";      // Указание нужной записи
score_audio.src = "audio/score.mp3";
swim.src = "audio/bulk.mp3"; 

var gap = 130; //was 90 

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp); // EventListener отслеживает
//птичка летит вверх
function moveUp() {
 yPos -= 25; //
 swim.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {      //изначальная позиция трубы
 x : cvs.width,  //где заканчивается канвас 
 y : 0
}

var score = 500;//starten von 500 km
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5; //gravity = обьект по игрику на 1.5 ниже


function draw() {
 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x--; //труба будет двигаться справа на лево

 if(pipe[i].x == 90) { //если труба находиться по иксу на 125px -> то будет создаваться новая труба
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Отслеживание столкновений  
 if(xPos + bird.width >= pipe[i].x
 && xPos <= pipe[i].x + pipeUp.width
 && (yPos <= pipe[i].y + pipeUp.height
 || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {

 location.reload(); // конец игры - Перезагрузка страницы

}

 if(pipe[i].x == 5) {
 score--; //++
 score_audio.play();
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

 yPos += grav; //обьект постоянно падает = позиция по игреку прибавляется вниз

 ctx.fillStyle = "#E2F5FF"; //000 - schwarz
 ctx.font = "20px Verdana";
 ctx.fillText("Kilometers left: -" + score, 10, cvs.height - 10);

 requestAnimationFrame(draw); // Вызов функции постоянно
}

pipeBottom.onload = draw;