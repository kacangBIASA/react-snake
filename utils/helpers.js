// utils/helpers.js
import { GRID_SIZE } from "./constants";

export function randomFoodPosition(snake) {
  // ensure food not placed on the snake
  const snakeSet = new Set(snake.map(s => `${s.x},${s.y}`));
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  } while (snakeSet.has(`${pos.x},${pos.y}`));
  return pos;
}

export function isCollision(position, snake) {
  // check wall
  if (position.x < 0 || position.x >= GRID_SIZE || position.y < 0 || position.y >= GRID_SIZE) {
    return true;
  }
  // check self-collision (ignore tail if it will move?)
  return snake.some(seg => seg.x === position.x && seg.y === position.y);
}
