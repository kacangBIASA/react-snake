import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 2, y: 2 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

export default function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(randomFood());
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [menu, setMenu] = useState("main"); // "main", "playing", "paused", "gameover"

  const intervalRef = useRef(null);

  // Load high score
  useEffect(() => {
    loadHighScore();
  }, []);

  useEffect(() => {
    if (menu === "playing" && !isGameOver) {
      intervalRef.current = setInterval(moveSnake, GAME_SPEED);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [menu, direction, snake, isGameOver]);

  async function loadHighScore() {
    const value = await AsyncStorage.getItem("HIGH_SCORE");
    if (value) setHighScore(Number(value));
  }

  async function saveHighScore(newScore) {
    if (newScore > highScore) {
      setHighScore(newScore);
      await AsyncStorage.setItem("HIGH_SCORE", newScore.toString());
    }
  }

  function randomFood() {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }

  function moveSnake() {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // Nabrak dinding
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return handleGameOver();
    }

    // Nabrak diri sendiri
    for (let i = 0; i < newSnake.length; i++) {
      if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
        return handleGameOver();
      }
    }

    newSnake.unshift(head);

    // Makan makanan
    if (head.x === food.x && head.y === food.y) {
      setScore((prev) => prev + 1);
      setFood(randomFood());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function handleGameOver() {
    setIsGameOver(true);
    setMenu("gameover");
    saveHighScore(score);
  }

  function changeDirection(newDir) {
    if (newDir.x + direction.x === 0 && newDir.y + direction.y === 0) return;
    setDirection(newDir);
  }

  function restartGame() {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setFood(randomFood());
    setIsGameOver(false);
    setMenu("playing");
  }

  return (
    <View style={styles.container}>
      {/* Menu Utama */}
      {menu === "main" && (
        <View style={styles.menuContainer}>
          <Text style={styles.title}>🐍 React Snake</Text>
          <TouchableOpacity style={styles.button} onPress={() => setMenu("playing")}>
            <Text style={styles.buttonText}>Mulai Game</Text>
          </TouchableOpacity>
          <Text style={styles.scoreText}>High Score: {highScore}</Text>
        </View>
      )}

      {/* Game */}
      {menu === "playing" && (
        <>
          <View style={styles.header}>
            <Text style={styles.score}>Score: {score}</Text>
            <TouchableOpacity style={styles.pauseBtn} onPress={() => setMenu("paused")}>
              <Text style={styles.pauseText}>⏸</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              backgroundColor: "#111",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const isSnake = snake.some((s) => s.x === x && s.y === y);
              const isFood = food.x === x && food.y === y;
              return (
                <View
                  key={index}
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: isSnake
                      ? "limegreen"
                      : isFood
                      ? "orange"
                      : "#222",
                    borderWidth: 0.2,
                    borderColor: "#333",
                  }}
                />
              );
            })}
          </View>

          <View style={styles.controls}>
            <View style={styles.row}>
              <TouchableOpacity style={styles.bigButton} onPress={() => changeDirection({ x: 0, y: -1 })}>
                <Text style={styles.arrow}>⬆️</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.bigButton} onPress={() => changeDirection({ x: -1, y: 0 })}>
                <Text style={styles.arrow}>⬅️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bigButton} onPress={() => changeDirection({ x: 1, y: 0 })}>
                <Text style={styles.arrow}>➡️</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.bigButton} onPress={() => changeDirection({ x: 0, y: 1 })}>
                <Text style={styles.arrow}>⬇️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {/* Menu Pause */}
      {menu === "paused" && (
        <View style={styles.menuContainer}>
          <Text style={styles.title}>⏸ Game Dijeda</Text>
          <TouchableOpacity style={styles.button} onPress={() => setMenu("playing")}>
            <Text style={styles.buttonText}>Lanjut</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={restartGame}>
            <Text style={styles.buttonText}>Mulai Ulang</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setMenu("main")}>
            <Text style={styles.buttonText}>Keluar ke Menu</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Menu Game Over */}
      {menu === "gameover" && (
        <View style={styles.menuContainer}>
          <Text style={styles.title}>💀 Game Over</Text>
          <Text style={styles.scoreText}>Skor: {score}</Text>
          <Text style={styles.scoreText}>High Score: {highScore}</Text>
          <TouchableOpacity style={styles.button} onPress={restartGame}>
            <Text style={styles.buttonText}>Main Lagi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setMenu("main")}>
            <Text style={styles.buttonText}>Kembali ke Menu</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 36, color: "lime", marginBottom: 20, fontWeight: "bold" },
  button: {
    backgroundColor: "orange",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 15,
  },
  buttonText: { color: "#000", fontSize: 20, fontWeight: "bold" },
  scoreText: { color: "white", fontSize: 18, marginTop: 10 },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  score: { color: "white", fontSize: 20 },
  pauseBtn: { backgroundColor: "orange", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 6 },
  pauseText: { color: "black", fontWeight: "bold", fontSize: 20 },
  controls: { marginTop: 40 },
  row: { flexDirection: "row", justifyContent: "center" },
  arrow: { fontSize: 40, color: "#000" },
  bigButton: {
    backgroundColor: "royalblue",
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 4,
  },
  menuContainer: { alignItems: "center" },
});
