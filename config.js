const LEVEL_CONFIG = {
  tutorial: {
    gridSize: 3,
    timer: null, // null means no timer
    popupsEnabled: false,
    popupFrequency: 0,
    nextState: "super_easy",
  },
  super_easy: {
    gridSize: 3,
    timer: 60,
    popupsEnabled: false,
    popupFrequency: 0,
    nextState: "easy",
  },
  easy: {
    gridSize: 4,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 12000, // Every 12 seconds on average
    nextState: "medium",
  },
  medium: {
    gridSize: 4,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 8000, // Every 8 seconds on average
    nextState: "hard",
  },
  hard: {
    gridSize: 5,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 5000, // Every 5 seconds on average
    nextState: "impossible",
  },
  impossible: {
    gridSize: 6,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 3000, // Every 3 seconds on average
    nextState: "win_screen",
  },
};
