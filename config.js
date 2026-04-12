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
    popupFrequency: 10000, // Every 10 seconds on average
    nextState: "medium",
  },
  medium: {
    gridSize: 4,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 6000, // Every 6 seconds on average
    nextState: "hard",
  },
  hard: {
    gridSize: 5,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 4000, // Every 4 seconds on average
    nextState: "impossible",
  },
  impossible: {
    gridSize: 6,
    timer: 60,
    popupsEnabled: true,
    popupFrequency: 1500, // Every 1.5 seconds on average
    nextState: "win_screen",
  },
};
