function drawTutorialScreen() {
  if (gameBG1) image(gameBG1, 0, 0, width, height);

  let cx = width / 2;
  let cy = height / 2;

  // --- UI TEXT ---
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(80); // Bigger Title
  textStyle(BOLD);
  text("TUTORIAL", cx, 100);

  textSize(28); // Bigger Instructions
  textStyle(NORMAL);
  fill(220);
  text(
    "Click two tiles to swap them.\nMatch the pattern to the target grid to move on!",
    cx,
    180,
  );

  // --- GRID & UI ELEMENTS ---
  drawActiveGrid(); // found in grid.js
  drawTargetPreview(); // found in grid.js
  drawSkipButton();
  drawHomeButton();
}

function drawSkipButton() {
  let bx = width - 150; // Moved further in from the edge
  let by = height / 2;
  let bw = 160; // Wider button
  let bh = 70; // Taller button

  push();
  rectMode(CENTER);

  if (
    mouseX > bx - bw / 2 &&
    mouseX < bx + bw / 2 &&
    mouseY > by - bh / 2 &&
    mouseY < by + bh / 2
  ) {
    fill("#75F74A"); // Bright green hover color
    cursor(HAND);
  } else {
    fill(255, 180);
  }

  stroke(0);
  strokeWeight(3);
  rect(bx, by, bw, bh, 15);

  noStroke();
  fill(0);
  textSize(32); // Bigger text
  textStyle(BOLD);
  text("SKIP", bx, by);
  pop();
}

function drawHomeButton() {
  push();
  rectMode(CENTER);

  // Positioned more comfortably in the 1440x810 corner
  let btnX = 100;
  let btnY = 60;
  let btnW = 140;
  let btnH = 60;

  if (
    mouseX > btnX - btnW / 2 &&
    mouseX < btnX + btnW / 2 &&
    mouseY > btnY - btnH / 2 &&
    mouseY < btnY + btnH / 2
  ) {
    fill("#EEF777"); // Bright hover color
    cursor(HAND);
  } else {
    fill(255);
  }

  stroke(0);
  strokeWeight(3);
  rect(btnX, btnY, btnW, btnH, 12);

  noStroke();
  fill(0);
  textSize(24);
  textStyle(BOLD);
  text("HOME", btnX, btnY);
  pop();
}

function checkTutorialWin() {
  let match = true;
  for (let i = 0; i < playerGrid.length; i++) {
    if (playerGrid[i] !== targetGrid[i]) {
      match = false;
      break;
    }
  }

  if (match) {
    startRealGame(); // This moves them to the 5x5 game
  }
}

function exitToHome() {
  gameState = "start";
  if (timerInterval) clearInterval(timerInterval);
  cursor(ARROW);
}
