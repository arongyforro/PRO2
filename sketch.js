let handpose;
let video;
let hands = [];

let xcordinate;
let man;
let woman;
let bg;
let birds;
let plane;
let shine1;
let shine2;
let songs = [];
let currentSong = 0;
let covers = [];
let currentImage = 0;

function preload(){
  man = loadImage('man.png');
  woman = loadImage('woman.png');
  bg = loadImage('background.png');
  birds = loadImage('bird.gif');
  plane = loadImage('plane.gif');
  shine1 = loadImage('shine1.gif');
  shine2 = loadImage('shine2.gif');
  
  songs[0] = loadSound('songs/Miami.mp3');
  songs[1] = loadSound('songs/Limit.mp3');
  songs[2] = loadSound('songs/Mack.mp3');
  songs[3] = loadSound('songs/Venus.mp3');
  
  covers[0] = loadImage('covers/1.jpg');
  covers[1] = loadImage('covers/2.jpg');
  covers[2] = loadImage('covers/3.jpg');
  covers[3] = loadImage('covers/4.png');
  
}

function playNextSong() {
  songs[currentSong].stop();
  
  currentSong = (currentSong + 1) % songs.length;
  songs[currentSong].play();
  songs[currentSong].onended(playNextSong);
}

function setup() {
  createCanvas(640, 480);
  x = (200,height);
  
  video = createCapture(VIDEO);
  video.size(width, height);
  
  handpose = ml5.handpose(video, modelReady);
  handpose.on("hand", results => {
  hands = results;
  });

  video.hide();
  
  
  songs[currentSong].play();
  songs[currentSong].onended(playNextSong);
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  
  image(bg, 0, 0, width, height);
  image(man, 0, 250, 220, 230);
  image(woman, 500, 280, 80, 200);

  
  let h = hour();
  let m = minute();
  fill(255);
  textFont('Courier New')
  textSize(50);
  text(h, 30,100);
  text(':', 90,98);
  text(m, 120,100);
  
 if (songs[currentSong].isPlaying()) {
    image(covers[currentSong], 280, 400, 50, 50); 
  }

  
  drawKeypoints();

  
function drawKeypoints() {
  for (let i = 0; i < hands.length; i += 1) {
    const hand = hands[i];
    for (let j = 0; j < hand.landmarks.length; j += 1) {
      const keypoint = hand.landmarks[j];

      if (!songs[currentSong].isPlaying()) {
        fill(0, 255, 0);
        ellipse(keypoint[0], keypoint[1], 10, 10);
      }
      
      if(hand.annotations.thumb[0] > hand.annotations.thumb[3]) {
      image(birds, 134,292,20,20);
      image(birds, 169,300,18,18);
      }
      
      if(hand.annotations.thumb[0] < hand.annotations.thumb[3]) {
      image(plane, 450, -45, 200, 200);
      image(shine1, 517, 311, 30, 30);
      image(shine2, 425,320,160,160);
      }
            
    }
  }
}

  
}