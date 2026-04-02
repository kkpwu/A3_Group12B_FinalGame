function drawGameScreen() {
  // 1. DYNAMIC BACKGROUND
  let currentBG = gameBG1;
  if (currentLevelKey === "easy") currentBG = gameBG2;
  else if (currentLevelKey === "medium") currentBG = gameBG3;
  else if (currentLevelKey === "hard") currentBG = gameBG4;
  else if (currentLevelKey === "extreme") currentBG = gameBG5;

  image(currentBG, 0, 0, width, height);

  // 2. Draw UI
  drawLevelHUD();
  drawTimerUI();
  drawActiveGrid();
  drawTargetPreview();
  drawHomeButton();

  // 3. Logic
  if (timer <= 0) {
    if (currentMusic && currentMusic.isPlaying()) {
      currentMusic.stop();
    }
    gameState = "lose";
  }
}
function drawTimerUI() {
  push();
  // Clear any previous shadow settings to prevent "ghosting"
  drawingContext.shadowBlur = 0;

  noStroke();
  fill(255);
  textSize(80);
  textAlign(CENTER, CENTER);

  let m = floor(timer / 60);
  let s = timer % 60;
  let displayTime = m + ":" + (s < 10 ? "0" + s : s);

  // If the time is low, change color, otherwise stay white
  if (timer <= 10) {
    fill(255, 50, 50);
  } else {
    fill(255);
  }

  // ONLY ONE text call here to avoid the double-text issue
  text(displayTime, width / 2, 150);
  pop();
}

function checkGameWin() {
  let match = true;
  for (let i = 0; i < playerGrid.length; i++) {
    if (playerGrid[i] !== targetGrid[i]) {
      match = false;
      break;
    }
  }

  if (match) {
    // If they beat Super Easy, move to "Easy" (where popups start!)
    let nextLevel = LEVEL_CONFIG[currentLevelKey].nextState;
    if (nextLevel === "win_screen" || nextLevel === "win") {
      if (currentMusic && currentMusic.isPlaying()) {
        currentMusic.stop();
      }
      gameState = "win";
    } else {
      startLevel(nextLevel);
    }
  }
}
