// components/GameBoard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CELL_SIZE, GRID_SIZE, BOARD_SIZE } from "../utils/constants";

export default function GameBoard({ snake, food, score, highScore, gameOver }) {
  // render snake segments and food as positioned Views
  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {/* draw grid background */}
        <View style={styles.grid}>
          {snake.map((seg, idx) => (
            <View
              key={`s-${idx}`}
              style={[
                styles.cell,
                {
                  left: seg.x * CELL_SIZE,
                  top: seg.y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: "green",
                  borderRadius: 3
                }
              ]}
            />
          ))}

          {/* food */}
          <View
            style={[
              styles.cell,
              {
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: "orange",
                borderRadius: CELL_SIZE / 4
              }
            ]}
          />
        </View>
      </View>

      {/* score / HUD */}
      <View style={styles.hud}>
        <Text style={styles.score}>Score: {score}</Text>
        <Text style={styles.score}>High: {highScore}</Text>
      </View>

      {gameOver && (
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverText}>Game Over</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 12
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: "#000", // black background
    borderWidth: 2,
    borderColor: "#0f0", // bright border
    overflow: "hidden"
  },
  grid: {
    position: "relative",
    width: "100%",
    height: "100%"
  },
  cell: {
    position: "absolute"
  },
  hud: {
    marginTop: 10,
    width: BOARD_SIZE,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  score: {
    color: "#0f0",
    fontWeight: "600"
  },
  gameOverOverlay: {
    position: "absolute",
    top: 80,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
    borderRadius: 10
  },
  gameOverText: {
    color: "orange",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center"
  }
});
