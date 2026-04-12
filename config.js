const LEVEL_CONFIG = {
  tutorial: {
    gridSize: 3,
    timer: null,
    popupsEnabled: false,
    popupFrequency: 0,
    nextState: "super_easy",
  },
  super_easy: {
    gridSize: 3,
    timer: 90,
    popupsEnabled: false,
    popupFrequency: 0,
    nextState: "easy",
  },
  easy: {
    gridSize: 4,
    timer: 100,
    popupsEnabled: true,
    popupFrequency: 12000,
    nextState: "medium",
  },
  medium: {
    gridSize: 4,
    timer: 120,
    popupsEnabled: true,
    popupFrequency: 8000,
    nextState: "hard",
  },
  hard: {
    gridSize: 5,
    timer: 150,
    popupsEnabled: true,
    popupFrequency: 5000,
    nextState: "extreme",
  },
  extreme: {
    gridSize: 6,
    timer: 180,
    popupsEnabled: true,
    popupFrequency: 3000,
    nextState: "win_screen",
  },
};
