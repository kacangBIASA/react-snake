// components/Controls.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Controls({ onDirection, onRestart, showRestart }) {
  return (
    <View style={styles.controlsWrap}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => onDirection("UP")}>
          <Text style={styles.btnText}>↑</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => onDirection("LEFT")}>
          <Text style={styles.btnText}>←</Text>
        </TouchableOpacity>

        <View style={{ width: 20 }} />

        <TouchableOpacity style={styles.button} onPress={() => onDirection("RIGHT")}>
          <Text style={styles.btnText}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => onDirection("DOWN")}>
          <Text style={styles.btnText}>↓</Text>
        </TouchableOpacity>
      </View>

      {showRestart && (
        <TouchableOpacity style={styles.restart} onPress={onRestart}>
          <Text style={styles.restartText}>Main Lagi</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  controlsWrap: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    marginVertical: 6
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0f0"
  },
  btnText: {
    color: "#0f0",
    fontSize: 28,
    fontWeight: "700"
  },
  restart: {
    marginTop: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "orange",
    borderRadius: 8
  },
  restartText: {
    color: "#000",
    fontWeight: "700"
  }
});
