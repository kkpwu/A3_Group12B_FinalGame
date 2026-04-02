function drawWinScreen() {
  // 1. Draw your custom win background loaded in sketch.js
  if (winBG) {
    image(winBG, 0, 0, width, height);
  } else {
    background(46, 204, 113); // Fallback green if image fails
  }

  // 2. Add an overlay for readability
  rectMode(CENTER);
  fill(0, 180);
  rect(width / 2, height / 2, 450, 450, 20);

  // 3. Victory Text
  fill(255);
  textStyle(BOLD);
  textSize(80);
  textAlign(CENTER, CENTER);
  text("VICTORY!", width / 2, height / 2 - 40);

  // 4. Play Again Button
  drawRestartButton();
}

function drawRestartButton() {
  let btnX = width / 2;
  let btnY = height / 2 + 170;

  // Hover effect: Change color if the mouse is over the button
  if (
    mouseX > btnX - 150 &&
    mouseX < btnX + 150 &&
    mouseY > btnY - 45 &&
    mouseY < btnY + 45
  ) {
    fill("#75F74A"); // Lighter red on hover
    cursor(HAND);
  } else {
    fill(255);
    cursor(ARROW);
  }

  rectMode(CENTER); // Ensure the button draws from the center
  rect(btnX, btnY, 300, 90, 10);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER); // Ensure text is perfectly centered in the rect
  textSize(48);
  text("RESTART", btnX, btnY);
}
