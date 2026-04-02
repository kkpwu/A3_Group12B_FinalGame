function drawPauseScreen() {
  push();
  // 1. Background image (Scaling to the new 1440x810 size)
  if (pauseBG) {
    image(pauseBG, 0, 0, width, height);
  }

  // Define our center point for easier math
  let centerX = width / 2;
  let centerY = height / 2;

  // 2. The Text Box - Centered horizontally and vertically
  rectMode(CENTER);
  fill(255, 180); // Semi-transparent white
  noStroke();
  // Centering the box at (centerX, centerY)
  rect(centerX, centerY - 15, 700, 250, 20);

  // 3. Text - Positioned relative to the center
  textAlign(CENTER, CENTER);
  noStroke();

  // "PAUSED"
  fill(50);
  textSize(80);
  text("PAUSED", centerX, centerY - 65);

  // Subtitle
  textSize(48);
  text("Take a deep breath...", centerX, centerY);

  // Instructions
  fill(120);
  textSize(32);
  text("Press SPACE to Resume", centerX, centerY + 50);

  fill(150, 50, 50);
  text("Press 'R' to Restart Challenge", centerX, centerY + 80);
  pop();
}
