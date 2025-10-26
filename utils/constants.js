// utils/constants.js
import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Grid settings
export const GRID_SIZE = 20; // number of cells per row/column
export const CELL_SIZE = Math.floor(Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) / GRID_SIZE);
export const BOARD_SIZE = CELL_SIZE * GRID_SIZE;

export const INITIAL_SNAKE = [
  { x: 9, y: 10 },
  { x: 8, y: 10 },
  { x: 7, y: 10 }
];

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

export const TICK_INTERVAL = 120; // ms, controls speed (lower = faster)
