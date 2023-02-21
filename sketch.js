// Letters Variables
let message = 'BLAAAAAAARF!';
let messageX;
let xSpeed;
const ySpeed = 0.05;
const amplitude = 100;
const verticalLetterSpacing = 10;
let font;
let sound;

var simpleTimer;
var letterTimer;

//Letter Functions
function drawLetters(){
  for (let i = 0; i < message.length; i++) {
    const letterX = messageX + textWidth(message.substring(0, i));

    const letterOffset = i * verticalLetterSpacing;
    const letterY = height / 2 +
      sin((frameCount - letterOffset) * ySpeed) * amplitude;
    
    text(message[i], letterX, letterY);
  }

  messageX -= xSpeed;
  if (messageX < - textWidth(message)) {
    messageX = width + 50;
  }

  if(messageX < -400){
    simpleTimer.setTimer(randomNumber(20,30) * 1000);
    simpleTimer.start();
    messageX = windowWidth;
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function preload() {
  font = loadFont('fonts/PentagramExtended.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  xSpeed = map(windowWidth, 540, 2000, 8, 10);
  messageX = width;
  frameRate(40);

  sound = loadSound('sound/blarf.mp3');
  sound.playMode('untilDone');

  simpleTimer = new Timer(randomNumber(10,15) * 1000);
  simpleTimer.start();

}

async function draw() {
  background(32);
  fill(163, 73, 164);
  textSize(100);

  if(simpleTimer.expired()){
    sound.play();
    drawLetters();
  }
  
}
