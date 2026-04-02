let rules =
  "• Click the colored squares to match the target grid.\n" +
  "• You have 60 seconds per level.\n" +
  "• Pop-ups will appear - click them to dismiss!\n" +
  "• [SPACE] to Pause.\n" +
  "• [R] to Restart level.\n" +
  "• [C] to Clear all pop-ups (Cheat Key).\n" +
  "• Match the grid to win.\n" +
  "Good luck, and have fun!";

function drawInstructionsScreen() {
  image(instructionsBG, 0, 0, width, height); // Semi-transparent overlay to make text readable

  fill(0, 180);
  rectMode(CENTER);
  rect(width / 2, height / 2, 900, 500, 20); // Title text

  fill(255);
  textSize(80);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("How To Play:", width / 2, height / 2 - 250); // Rules text

  textStyle(NORMAL);
  textSize(28);
  fill(240);
  textAlign(CENTER, CENTER);

  text(rules, width / 2, height / 2 - 40, 900, 300); // Back Button

  textAlign(CENTER, CENTER);
  drawButton(width / 2 - 150, height / 2 + 220, "BACK");
  drawButton(width / 2 + 150, height / 2 + 220, "START");
}

function checkInstructionClicks() {
  if (gameState === "instructions") {
    let btnY = height / 2 + 220; // This must match the draw call exactly!
    let backX = width / 2 - 150;
    let startX = width / 2 + 150; // CHECK BACK BUTTON

    if (
      mouseX > backX - 100 &&
      mouseX < backX + 100 &&
      mouseY > btnY - 40 &&
      mouseY < btnY + 40
    ) {
      gameState = "start";
      cursor(ARROW);
    } // CHECK START BUTTON

    if (
      mouseX > startX - 100 &&
      mouseX < startX + 100 &&
      mouseY > btnY - 40 &&
      mouseY < btnY + 40
    ) {
      startLevel("tutorial"); // Jump straight into the game
      cursor(ARROW);
    }
  }
}

function drawButton(x, y, label) {
  push();
  rectMode(CENTER); // Hit detection for hover effect

  if (
    mouseX > x - 100 &&
    mouseX < x + 100 &&
    mouseY > y - 40 &&
    mouseY < y + 40
  ) {
    fill(255, 200);
    cursor(HAND);
  } else {
    fill(255, 100);
  }

  noStroke();
  rect(x, y, 200, 80, 15);

  fill(0);
  textSize(32);
  textStyle(BOLD);
  text(label, x, y);
  pop();
}
