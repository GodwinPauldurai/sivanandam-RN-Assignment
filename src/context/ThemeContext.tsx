import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Appearance, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Theme {
  background: string;
  text: string;
  borderBottomColor : string;
}

interface ThemeContextProps {
  theme: Theme;
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const themes: { light: Theme; dark: Theme } = {
  light: {
    background: "#FFFFFF",
    text: "#000000",
    borderBottomColor:'#ddd'
  },
  dark: {
    background: "#000000",
    text: "#FFFFFF",
    borderBottomColor: 'white',
  },
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [mode, setMode] = useState<"light" | "dark">(systemTheme ?? "light");
  const theme = themes[mode];


  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setMode(savedTheme);
      } else {
        setMode(systemTheme ?? "light");
      }
    };
    loadTheme();
  }, [systemTheme]);

  const toggleTheme = async () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    await AsyncStorage.setItem("theme", newMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
