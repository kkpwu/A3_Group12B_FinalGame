function drawActiveGrid() {
  if (!currentLevelKey || !LEVEL_CONFIG[currentLevelKey]) return;

  let config = LEVEL_CONFIG[currentLevelKey];
  let dim = config.gridSize;

  push();
  let totalGridArea = 400;
  let cellSize = totalGridArea / dim;
  let centerX = width / 2;
  let centerY = height / 2 + 50;

  // 1. Draw the Background Container
  rectMode(CENTER);
  fill(255);
  noStroke();
  rect(centerX, centerY, totalGridArea + 20, totalGridArea + 20, 15);

  // 2. Calculate Top-Left Start Point
  let startX = centerX - totalGridArea / 2;
  let startY = centerY - totalGridArea / 2;

  // 3. Draw the Colored Tiles
  rectMode(CORNER);
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      let index = i + j * dim;
      let xpos = startX + i * cellSize;
      let ypos = startY + j * cellSize;

      strokeWeight(5);
      stroke(0);

      if (playerGrid[index] !== undefined) {
        fill(palette[playerGrid[index]]);
        rect(xpos, ypos, cellSize, cellSize);
      }
    }
  }

  // 4. Draw the Highlight (Drawn AFTER the loops so it's on top)
  if (firstSelected !== -1) {
    let col = firstSelected % dim;
    let row = floor(firstSelected / dim);
    let hX = startX + col * cellSize;
    let hY = startY + row * cellSize;

    noFill();
    stroke(255, 255, 0); // Bright Yellow
    strokeWeight(6);
    // Draw the highlight rectangle
    rect(hX, hY, cellSize, cellSize);

    // Optional: Add a second inner stroke for better visibility on white/yellow tiles
    stroke(0);
    strokeWeight(1);
    rect(hX + 3, hY + 3, cellSize - 6, cellSize - 6);
  }

  pop();
}

function drawTargetPreview() {
  if (!currentLevelKey || !LEVEL_CONFIG[currentLevelKey]) return;

  let config = LEVEL_CONFIG[currentLevelKey];
  let dim = config.gridSize;

  push();
  rectMode(CORNER);

  // --- CHANGE 1: SCALE THE SIZE ---
  let totalSize = 120; // This is how wide/tall the whole target grid will be
  let targetTileSize = totalSize / dim; // Automatically calculates tile size

  // --- CHANGE 2 & 3: CENTER THE POSITION ---
  let margin = 80;
  let startX = width - totalSize - 150; // Positions it on the right
  let startY = 100; // Lowered from 80 to fit the 1440x810 layout better

  // 1. Draw Background Box
  fill(0, 150);
  noStroke();
  rect(startX - 10, startY - 10, totalSize + 20, totalSize + 20, 15);

  // 2. Draw Tiles
  stroke(255);
  strokeWeight(3);

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      let index = i + j * dim;

      if (targetGrid[index] !== undefined) {
        fill(palette[targetGrid[index]]);
        rect(
          startX + i * targetTileSize,
          startY + j * targetTileSize,
          targetTileSize,
          targetTileSize,
          4, // Slight rounding on tiles
        );
      }
    }
  }

  // --- UPDATED LABEL ---
  noStroke();
  fill(255);
  textSize(32); // Bigger text for the bigger grid
  textStyle(BOLD);
  textAlign(CENTER);
  text("TARGET", startX + totalSize / 2, startY - 25);
  pop();
}

function drawLevelHUD() {
  if (!currentLevelKey || !LEVEL_CONFIG[currentLevelKey]) return;

  let config = LEVEL_CONFIG[currentLevelKey];
  // Replaces underscores with spaces for the screen (e.g. "super_easy" -> "SUPER EASY")
  let displayName = currentLevelKey.replace("_", " ").toUpperCase();

  push();
  textAlign(CENTER, TOP);

  // Draw Level Title
  fill(255);
  textSize(100);
  textStyle(BOLD);
  text(displayName, width / 2, 20);

  pop();
}
