let gameState = "start";
let currentLevelKey = "tutorial";

// Background Music & SFX
let musicLevel1, musicLevel2, musicLevel3, musicLevel4, musicFinal;
let sfxError1, sfxError2;
let currentMusic = null;

// Background Images
let startBG,
  tutorialBG,
  gameBG1,
  gameBG2,
  gameBG3,
  gameBG4,
  gameBG5,
  instructionsBG,
  winBG,
  loseBG,
  pauseBG;

let hourglassSheet;
let hourglasses = [];

let timer = 60;
let timerInterval;

// Game Logic
let palette = ["#df0707", "#39ff03", "#011fff", "#f1d51f", "#8e51ff"];
let targetGrid = [];
let playerGrid = [];
let firstSelected = -1;

function preload() {
  // Load Background Images
  startBG = loadImage("assets/backgrounds/Title.png");
  instructionsBG = loadImage("assets/backgrounds/Instructions.png");
  tutorialBG = loadImage("assets/backgrounds/Tutorial.png");

  gameBG1 = loadImage("assets/backgrounds/Game.1.png");
  gameBG2 = loadImage("assets/backgrounds/Game.2.png");
  gameBG3 = loadImage("assets/backgrounds/Game.3.png");
  hourglassSheet = loadImage("assets/spritesheet hourglass.png");
  gameBG4 = loadImage("assets/backgrounds/Game.4.png");
  gameBG5 = loadImage("assets/backgrounds/Game.5.png");

  winBG = loadImage("assets/backgrounds/Win.png");
  loseBG = loadImage("assets/backgrounds/Lose.png");
  pauseBG = loadImage("assets/backgrounds/Pause.Page.png");

  // Load Music Tracks
  musicLevel1 = loadSound("assets/sounds/Level Music.1.mp3");
  musicLevel2 = loadSound("assets/sounds/Level Music.2.mp3");
  musicLevel3 = loadSound("assets/sounds/Level Music.3.mp3");
  musicLevel4 = loadSound("assets/sounds/Level Music.4.mp3");
  musicFinal = loadSound("assets/sounds/Final Level.mp3");

  // Load SFX
  sfxError1 = loadSound("assets/sounds/Error.1.mp3");
  sfxError2 = loadSound("assets/sounds/Error.2.mp3");
}

function setup() {
  createCanvas(1440, 810);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(50);

  // --- STATE MACHINE LOGIC ---
  if (gameState === "start") {
    if (startBG) image(startBG, 0, 0, width, height);
    drawStartScreen();
  } else if (gameState === "tutorial") {
    if (tutorialBG) image(tutorialBG, 0, 0, width, height);
    drawTutorialScreen();
  } else if (gameState === "game") {
    background(0);
    noTint();

    // 1. Pick the correct static background
    let bgToDraw = gameBG1;
    if (currentLevelKey === "super_easy") bgToDraw = gameBG1;
    else if (currentLevelKey === "easy") bgToDraw = gameBG2;
    else if (currentLevelKey === "medium") bgToDraw = gameBG3;
    else if (currentLevelKey === "hard") bgToDraw = gameBG4;
    else if (currentLevelKey === "extreme") bgToDraw = gameBG5;

    if (bgToDraw) image(bgToDraw, 0, 0, width, height);

    // 2. Draw Game Elements
    drawGameScreen();
    handlePopups();
    drawPopups();

    // 3. --- NEW: DRAW HOURGLASS SPRITES ---
    // This only triggers on "medium" (Level 4)
    if (currentLevelKey === "medium") {
      // Create them if they don't exist yet for this level
      if (hourglasses.length === 0) {
        for (let i = 0; i < 12; i++) {
          hourglasses.push(new Hourglass());
        }
      }

      // Update and Draw each hourglass
      let isPanic = timer < 15;
      for (let h of hourglasses) {
        h.update(isPanic);
        h.display();
      }
    } else {
      // Clear the array when not on Level 4 to save performance
      if (hourglasses.length > 0) hourglasses = [];
    }
  } else if (gameState === "instructions") {
    if (instructionsBG) image(instructionsBG, 0, 0, width, height);
    drawInstructionsScreen();
  } else if (gameState === "win") {
    if (winBG) image(winBG, 0, 0, width, height);
    drawWinScreen();
  } else if (gameState === "lose") {
    if (loseBG) image(loseBG, 0, 0, width, height);
    drawLoseScreen();
  } else if (gameState === "pause") {
    if (pauseBG) image(pauseBG, 0, 0, width, height);
    drawPauseScreen();
  }
}

// --- SPRITE CLASS ---
class Hourglass {
  constructor() {
    let side = random([0, 1]);
    this.x = side === 0 ? random(0, 300) : random(width - 300, width);
    this.y = random(height);
    this.side = side;
    this.speedX = random(-1, 1);
    this.speedY = random(-1.5, 1.5);
    this.currentFrame = floor(random(180));
    this.totalFrames = 180;
    this.cols = 10;
    this.rows = 18;
    this.size = random(150, 300);
  }

  update(isPanic) {
    let mult = isPanic ? 4 : 1;
    this.x += this.speedX * mult;
    this.y += this.speedY * mult;
    this.currentFrame =
      (this.currentFrame + (isPanic ? 0.8 : 0.2)) % this.totalFrames;

    if (this.side === 0) {
      if (this.x < 0 || this.x > 350) this.speedX *= -1;
    } else {
      if (this.x < width - 350 || this.x > width) this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  display() {
    let frameIdx = floor(this.currentFrame);
    let w = hourglassSheet.width / this.cols;
    let h = hourglassSheet.height / this.rows;
    let sx = (frameIdx % this.cols) * w;
    let sy = floor(frameIdx / this.cols) * h;

    push();
    imageMode(CENTER);
    blendMode(SCREEN);
    image(hourglassSheet, this.x, this.y, this.size, this.size, sx, sy, w, h);
    blendMode(BLEND);
    pop();
  }
}

function mousePressed() {
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
  handleMouseClicks();
}

function keyPressed() {
  // DEV CHEATS
  if (key === "1") startLevel("tutorial");
  if (key === "2") startLevel("super_easy");
  if (key === "3") startLevel("easy");
  if (key === "4") startLevel("medium");
  if (key === "5") startLevel("hard");
  if (key === "6") startLevel("extreme");

  // Skip Level (N)
  if (key === "n" || key === "N") {
    if (gameState === "game" || gameState === "tutorial") {
      let nextLevel = LEVEL_CONFIG[currentLevelKey].nextState;
      if (nextLevel === "win" || nextLevel === "win_screen") gameState = "win";
      else startLevel(nextLevel);
    }
  }

  // Instant Win (W)
  if (key === "w" || key === "W") {
    if (gameState === "game" || gameState === "tutorial") {
      playerGrid = [...targetGrid];
      checkLevelWin();
      console.log("Instant win triggered!");
    }
  }

  // Add Time (T)
  if (key === "t" || key === "T") {
    if (timer !== null) timer += 30;
  }

  // Clear Popups (C)
  if (key === "c" || key === "C") activePopups = [];

  // --- Restart (R) ---
  if (key === "r" || key === "R") {
    if (gameState === "game" || gameState === "tutorial") {
      console.log("Restarting level: " + currentLevelKey);
      startLevel(currentLevelKey); // This resets the grid, timer, and popups
    }
  }

  // Pause (Space)
  if (keyCode === 32) {
    if (gameState === "game") {
      gameState = "pause";
      if (currentMusic) currentMusic.pause();
    } else if (gameState === "pause") {
      gameState = "game";
      if (currentMusic) currentMusic.play();
    }
    return false;
  }
}

function timeIt() {
  if (gameState === "game") {
    if (timer > 0) {
      timer--;
    } else {
      gameState = "lose";
      clearInterval(timerInterval);
    }
  }
}

function playMusicForLevel(levelKey) {
  if (currentMusic && currentMusic.isPlaying()) currentMusic.stop();

  if (levelKey === "tutorial" || levelKey === "super_easy")
    currentMusic = musicLevel1;
  else if (levelKey === "easy") currentMusic = musicLevel2;
  else if (levelKey === "medium") currentMusic = musicLevel3;
  else if (levelKey === "hard") currentMusic = musicLevel4;
  else if (levelKey === "extreme") currentMusic = musicFinal;

  if (currentMusic) {
    currentMusic.loop();
    currentMusic.setVolume(0.4);
  }
}

function initGrid(size) {
  let totalTiles = size * size;
  targetGrid = [];
  for (let i = 0; i < totalTiles; i++) {
    targetGrid.push(floor(random(palette.length)));
  }
  playerGrid = [...targetGrid];
  for (let i = playerGrid.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    let temp = playerGrid[i];
    playerGrid[i] = playerGrid[j];
    playerGrid[j] = temp;
  }
}
