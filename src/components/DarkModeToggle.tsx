import { useThemeStore } from "../store/themeStore";
import clsx from "clsx";
import DarkModeIcon from "./icons/DarkModeIcon";
import LightModeIcon from "./icons/LightModeIcon";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      tabIndex={-1}
      onClick={toggleDarkMode}
      className={clsx(
        "fixed top-4 right-4 p-2 rounded-full shadow-lg transition-all duration-200",
        isDarkMode
          ? "bg-gray-800 hover:bg-gray-700 text-white"
          : "bg-white hover:bg-gray-50 text-gray-800"
      )}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  );
}
