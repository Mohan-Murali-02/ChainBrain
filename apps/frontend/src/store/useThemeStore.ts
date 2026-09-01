import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

interface ThemeStore {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "dark";
};

const applyThemeToDocument = (resolved: "light" | "dark") => {
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    if (resolved === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }
};

const getInitialTheme = (): Theme => {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("chainbrain-theme") as Theme;
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
  }
  return "dark"; // Default to premium dark SaaS mode
};

const initialTheme = getInitialTheme();
const initialResolved =
  initialTheme === "system" ? getSystemTheme() : initialTheme;
applyThemeToDocument(initialResolved);

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: initialTheme,
  resolvedTheme: initialResolved,

  setTheme: (theme: Theme) => {
    const resolved = theme === "system" ? getSystemTheme() : theme;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("chainbrain-theme", theme);
    }
    applyThemeToDocument(resolved);
    set({ theme, resolvedTheme: resolved });
  },

  toggleTheme: () => {
    const current = get().resolvedTheme;
    const next = current === "dark" ? "light" : "dark";
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("chainbrain-theme", next);
    }
    applyThemeToDocument(next);
    set({ theme: next, resolvedTheme: next });
  },
}));

// Listen for system theme changes if set to system
if (typeof window !== "undefined" && window.matchMedia) {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const state = useThemeStore.getState();
      if (state.theme === "system") {
        const resolved = e.matches ? "dark" : "light";
        applyThemeToDocument(resolved);
        useThemeStore.setState({ resolvedTheme: resolved });
      }
    });
}
