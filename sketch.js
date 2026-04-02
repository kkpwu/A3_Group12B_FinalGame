let gameState = "start";
let currentLevelKey = "tutorial";

// Background Music
let musicLevel1, musicLevel2, musicLevel3, musicLevel4, musicFinal;

// Sound Effects (SFX)
let sfxError1, sfxError2;

// Track the currently playing music so we can stop it when levels change
let currentMusic = null;

let startBG,
  tutorialBG,
  gameBG1,
  gameBG2,
  gameBG3,
  gameBG4,
  gameBG5,
  instructionsBG,
  winBG,
  loseBG;
let timer = 60;
let timerInterval;

let palette = ["#df0707", "#39ff03", "#011fff", "#f1d51f", "#8e51ff"];
let targetGrid = [];
let playerGrid = [];
let firstSelected = -1;

function preload() {
  // Load Background Images
  startBG = loadImage("assets/Title.png");
  instructionsBG = loadImage("assets/Instructions.png");
  tutorialBG = loadImage("assets/Game.1.png");

  gameBG1 = loadImage("assets/Game.1.png");
  gameBG2 = loadImage("assets/Game.2.png");
  gameBG3 = loadImage("assets/Game.3.png");
  gameBG4 = loadImage("assets/Game.4.png");
  gameBG5 = loadImage("assets/Game.5.png");

  winBG = loadImage("assets/Win.png");
  loseBG = loadImage("assets/Lose.png");
  pauseBG = loadImage("assets/Pause.Page.png");

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
  background(50); // Standard background color

  // --- STATE MACHINE LOGIC ---

  if (gameState === "start") {
    if (startBG) image(startBG, 0, 0, width, height);
    drawStartScreen(); // (from start.js)
  } else if (gameState === "tutorial") {
    if (tutorialBG) image(tutorialBG, 0, 0, width, height);
    drawTutorialScreen(); // (from tutorial.js)
  } else if (gameState === "game") {
    // --- DYNAMIC BACKGROUND PICKER ---
    let currentBG = gameBG1;

    if (currentLevelKey === "easy") currentBG = gameBG2;
    else if (currentLevelKey === "medium") currentBG = gameBG3;
    else if (currentLevelKey === "hard") currentBG = gameBG4;
    else if (currentLevelKey === "extreme") currentBG = gameBG5;

    image(currentBG, 0, 0, width, height);

    drawGameScreen(); // Handles the grid and HUD
    handlePopups();
    drawPopups();
  } else if (gameState === "instructions") {
    if (instructionsBG) image(instructionsBG, 0, 0, width, height);
    drawInstructionsScreen(); // (from instructions.js)
  } else if (gameState === "win") {
    if (winBG) image(winBG, 0, 0, width, height);
    drawWinScreen(); // (from win.js)
  } else if (gameState === "lose") {
    if (loseBG) image(loseBG, 0, 0, width, height);
    drawLoseScreen(); // (from lose.js)
  } else if (gameState === "pause") {
    drawPauseScreen(); // (from pause.js)
  }
}

function mousePressed() {
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }

  handleMouseClicks(); // found in start.js for state management and universal click handling
}

function keyPressed() {
  if (keyCode === 32) {
    if (gameState === "game") {
      gameState = "pause";
      if (currentMusic && currentMusic.isPlaying()) {
        currentMusic.pause();
      }
    } else if (gameState === "pause") {
      gameState = "game";
      if (currentMusic) {
        currentMusic.play();
      }
    }
    return false;
  }

  if (key === "r" || key === "R") {
    if (gameState === "game") {
      startRealGame();
    } else if (gameState === "tutorial") {
      startGame();
    }
  }

  if (key === "c" || key === "C") {
    activePopups = []; // Clear all popups manually by pressing 'C'
    console.log("Popups cleared via cheat key");
  }
}

function randomizeTarget() {
  targetGrid = [];
  for (let i = 0; i < 25; i++) {
    targetGrid.push(floor(random(palette.length)));
  }
}

function randomizePlayerGrid() {
  playerGrid = [...targetGrid];

  for (let i = playerGrid.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    let temp = playerGrid[i];
    playerGrid[i] = playerGrid[j];
    playerGrid[j] = temp;
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
  // Stop whatever is playing now
  if (currentMusic && currentMusic.isPlaying()) {
    currentMusic.stop();
  }

  // Pick the new track based on the level
  if (levelKey === "tutorial" || levelKey === "super_easy") {
    currentMusic = musicLevel1;
  } else if (levelKey === "easy") {
    currentMusic = musicLevel2;
  } else if (levelKey === "medium") {
    currentMusic = musicLevel3;
  } else if (levelKey === "hard") {
    currentMusic = musicLevel4;
  } else if (levelKey === "impossible") {
    currentMusic = musicFinal;
  }

  // Play the new track on a loop
  if (currentMusic) {
    currentMusic.loop();
    currentMusic.setVolume(0.5); // 50% volume so it's not too loud
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
