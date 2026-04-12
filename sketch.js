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

    let bgToDraw = gameBG1;
    if (currentLevelKey === "super_easy") bgToDraw = gameBG1;
    else if (currentLevelKey === "easy") bgToDraw = gameBG2;
    else if (currentLevelKey === "medium") bgToDraw = gameBG3;
    else if (currentLevelKey === "hard") bgToDraw = gameBG4;
    else if (currentLevelKey === "extreme") bgToDraw = gameBG5;

    if (bgToDraw) image(bgToDraw, 0, 0, width, height);

    drawGameScreen();
    handlePopups();
    drawPopups();
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
