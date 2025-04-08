import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

const SettingsScreen: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeProvider");
  }

  const { theme, mode, toggleTheme } = themeContext;
  const isDarkMode = mode === "dark";

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.toggleRow, { backgroundColor: theme.background }]}>
        <Text style={[styles.label, { color: theme.text }]}>
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? "#ffffff" : "#ffffff"}
          trackColor={{
            false: "#d3d3d3",
            true: "#34C759",
          }}
          ios_backgroundColor="#d3d3d3"
          style={styles.switch}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignContent: 'center',
    paddingHorizontal: 10,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    // borderRadius: 12,
    // backgroundColor: "#f2f2f7",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  switch: {
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
  },
});
