function drawStartScreen() {
  push();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  cursor(ARROW);

  // --- GAME TITLE ---
  noStroke();
  fill(30, 30, 30);
  rect(720, 240, 1500, 120, 10);
  fill(255);
  textSize(125);
  textStyle(BOLD);
  text("PIXEL ALIGNMENT", 720, 250);

  textSize(85);
  fill(200);
  text("A Stability Crisis", 720, 350);

  // --- PLAY BUTTON ---
  let playX = 720,
    playY = 450,
    playW = 500,
    playH = 80;
  if (
    mouseX > playX - playW / 2 &&
    mouseX < playX + playW / 2 &&
    mouseY > playY - playH / 2 &&
    mouseY < playY + playH / 2
  ) {
    fill("#75F74A");
    cursor(HAND);
  } else {
    fill(255, 150);
  }
  noStroke();
  rect(playX, playY, playW, playH, 10);
  fill(0);
  textSize(50);
  text("PLAY", playX, playY);

  // --- HOW TO PLAY BUTTON ---
  let howX = 720,
    howY = 550,
    howW = 500,
    howH = 60;
  if (
    mouseX > howX - howW / 2 &&
    mouseX < howX + howW / 2 &&
    mouseY > howY - howH / 2 &&
    mouseY < howY + howH / 2
  ) {
    fill("#EEF777");
    cursor(HAND);
  } else {
    fill(255, 150);
  }
  noStroke();
  rect(howX, howY, howW, howH, 10);
  fill(0);
  textSize(24);
  text("HOW TO PLAY", howX, howY);
  pop();
}

function startLevel(levelKey) {
  currentLevelKey = levelKey;
  let config = LEVEL_CONFIG[levelKey];
  activePopups = []; // Clear popups when starting any level

  initGrid(config.gridSize);
  gameState = levelKey === "tutorial" ? "tutorial" : "game";

  if (config.popupsEnabled) {
    nextPopupTime = millis() + config.popupFrequency;
  }

  if (timerInterval) clearInterval(timerInterval);
  if (config.timer) {
    timer = config.timer;
    timerInterval = setInterval(timeIt, 1000);
  } else {
    timer = null;
  }

  playMusicForLevel(levelKey);
}

function handleMouseClicks() {
  // 0. POPUP OVERRIDE
  if (activePopups && activePopups.length > 0) {
    let closedPopup = checkPopupClicks();
    return; // This blocks EVERYTHING if any popup exists
  }

  // 1. START STATE
  if (gameState === "start") {
    let playX = width / 2,
      playY = 450,
      playW = 500,
      playH = 80;
    if (
      mouseX > playX - playW / 2 &&
      mouseX < playX + playW / 2 &&
      mouseY > playY - playH / 2 &&
      mouseY < playY + playH / 2
    ) {
      startLevel("tutorial");
    }

    let howY = 550,
      howH = 60;
    if (
      mouseX > playX - playW / 2 &&
      mouseX < playX + playW / 2 &&
      mouseY > howY - howH / 2 &&
      mouseY < howY + howH / 2
    ) {
      if (currentMusic) currentMusic.stop();
      gameState = "instructions";
    }
  }

  // 2. INSTRUCTIONS
  else if (gameState === "instructions") {
    let btnY = height / 2 + 220;
    let backX = width / 2 - 150;
    let startX = width / 2 + 150;

    if (
      mouseX > backX - 100 &&
      mouseX < backX + 100 &&
      mouseY > btnY - 40 &&
      mouseY < btnY + 40
    ) {
      gameState = "start";
    }
    if (
      mouseX > startX - 100 &&
      mouseX < startX + 100 &&
      mouseY > btnY - 40 &&
      mouseY < btnY + 40
    ) {
      startLevel("tutorial");
    }
  }

  // 3. TUTORIAL
  else if (gameState === "tutorial") {
    if (mouseX > 20 && mouseX < 120 && mouseY > 20 && mouseY < 70) {
      exitToHome();
    } else if (
      mouseX > width - 160 &&
      mouseX < width - 40 &&
      mouseY > height / 2 - 25 &&
      mouseY < height / 2 + 25
    ) {
      let nextLevel = LEVEL_CONFIG[currentLevelKey].nextState;
      startLevel(nextLevel);
    } else {
      handleUniversalSwap();
    }
  }

  // 4. GAME
  else if (gameState === "game") {
    if (mouseX > 20 && mouseX < 120 && mouseY > 20 && mouseY < 70) {
      exitToHome();
    } else {
      handleUniversalSwap();
    }
  }

  // 5. WIN / LOSE
  else if (gameState === "win" || gameState === "lose") {
    let btnX = width / 2,
      btnY = height / 2 + 170;
    if (
      mouseX > btnX - 150 &&
      mouseX < btnX + 150 &&
      mouseY > btnY - 45 &&
      mouseY < btnY + 45
    ) {
      exitToHome();
    }
  }
}

function handleUniversalSwap() {
  if (!currentLevelKey || !LEVEL_CONFIG[currentLevelKey]) return;

  let config = LEVEL_CONFIG[currentLevelKey];
  let dim = config.gridSize;

  // --- THESE MUST MATCH drawActiveGrid EXACTLY ---
  let totalGridArea = 400;
  let cellSize = totalGridArea / dim;
  let centerX = width / 2;
  let centerY = height / 2 + 50;

  let startX = centerX - totalGridArea / 2;
  let startY = centerY - totalGridArea / 2;

  // 1. Check if mouse is inside the 400x400 area
  if (
    mouseX >= startX &&
    mouseX <= startX + totalGridArea &&
    mouseY >= startY &&
    mouseY <= startY + totalGridArea
  ) {
    // 2. Calculate which Column (i) and Row (j) were clicked
    let i = floor((mouseX - startX) / cellSize);
    let j = floor((mouseY - startY) / cellSize);

    // Constrain to prevent array-out-of-bounds errors on the very edge
    i = constrain(i, 0, dim - 1);
    j = constrain(j, 0, dim - 1);

    // 3. MATCHING INDEX MATH: i + j * dim
    // This matches your drawing loop: let index = i + j * dim;
    let clickedIndex = i + j * dim;

    if (firstSelected === -1) {
      firstSelected = clickedIndex;
    } else {
      if (firstSelected !== clickedIndex) {
        // Perform the swap
        let temp = playerGrid[firstSelected];
        playerGrid[firstSelected] = playerGrid[clickedIndex];
        playerGrid[clickedIndex] = temp;

        // Feedback sound
        if (sfxError1) {
          sfxError1.setVolume(0.2);
          sfxError1.play();
        }

        checkLevelWin();
      }
      firstSelected = -1; // Deselect after swap
    }
  }
}

function checkLevelWin() {
  let match = true;
  for (let i = 0; i < playerGrid.length; i++) {
    if (playerGrid[i] !== targetGrid[i]) {
      match = false;
      break;
    }
  }
  if (match) {
    let nextLevel = LEVEL_CONFIG[currentLevelKey].nextState;
    if (nextLevel === "win_screen" || nextLevel === "win") {
      if (currentMusic) currentMusic.stop();
      gameState = "win";
    } else {
      startLevel(nextLevel);
    }
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

function exitToHome() {
  if (currentMusic && currentMusic.isPlaying()) {
    currentMusic.stop();
  }
  gameState = "start";
  if (timerInterval) clearInterval(timerInterval);
  cursor(ARROW);
  currentLevelKey = "tutorial";
}
