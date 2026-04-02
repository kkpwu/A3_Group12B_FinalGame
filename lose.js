function drawLoseScreen() {
  if (loseBG) {
    image(loseBG, 0, 0, width, height);
  } else {
    background(192, 57, 43); // Fallback red if image fails
  }

  // 2. Add a semi-transparent overlay for readability
  rectMode(CENTER);
  fill(0, 180);
  noStroke();
  rect(width / 2, height / 2, 450, 250, 20);

  // 3. Game Over Text
  fill(255, 50, 50); // Bright red text
  textSize(80);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 40);

  // 4. Subtext
  fill(255);
  textSize(48);
  text("The hourglass has run out...", width / 2, height / 2 + 40);

  // 5. Try Again Button
  drawTryAgainButton();
}

function drawTryAgainButton() {
  let btnX = width / 2;
  let btnY = height / 2 + 170;

  // Hover effect: Change color if the mouse is over the button
  if (
    mouseX > btnX - 150 &&
    mouseX < btnX + 150 &&
    mouseY > btnY - 45 &&
    mouseY < btnY + 45
  ) {
    fill("#75F74A"); // Bright green hover color
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
  text("TRY AGAIN", btnX, btnY);
}
