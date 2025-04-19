import { useThemeStore } from "../store/themeStore";
import { useState } from "react";

export default function AccessibilitySettings() {
  const {
    isDarkMode,
    fontSize,
    highContrast,
    setFontSize,
    toggleHighContrast,
  } = useThemeStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg transition-all duration-200 ${
          isDarkMode
            ? "bg-gray-800 hover:bg-gray-700 text-white"
            : "bg-white hover:bg-gray-50 text-gray-800"
        }`}
        aria-label="Open accessibility settings"
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            fill="currentColor"
            d="M12 6q-.825 0-1.412-.587T10 4t.588-1.412T12 2t1.413.588T14 4t-.587 1.413T12 6M9 22V9q-1.5-.125-3.05-.375T3 8l.5-2q1.95.525 4.15.763T12 7t4.35-.238T20.5 6l.5 2q-1.4.375-2.95.625T15 9v13h-2v-6h-2v6z"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div
          className={`fixed bottom-20 right-4 w-64 rounded-lg shadow-xl transition-all duration-200 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-settings-title"
        >
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2
                id="accessibility-settings-title"
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Accessibility Settings
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded-full ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
                aria-label="Close settings"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className={`block text-sm font-medium ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Font Size
                </label>
                <div className="flex space-x-2">
                  {["small", "medium", "large"].map((size) => (
                    <button
                      key={size}
                      onClick={() =>
                        setFontSize(size as "small" | "medium" | "large")
                      }
                      className={`p-2 rounded-md transition-colors ${
                        fontSize === size
                          ? isDarkMode
                            ? "text-white"
                            : "text-gray-300 hover:bg-gray-600"
                          : isDarkMode
                          ? " text-gray-300 hover:bg-gray-600"
                          : " text-gray-700 hover:bg-gray-200"
                      }`}
                      aria-label={`Set font size to ${size}`}
                    >
                      <span
                        className={`font-bold ${
                          size === "small"
                            ? "text-sm"
                            : size === "medium"
                            ? "text-base"
                            : "text-lg"
                        }`}
                      >
                        A
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  High Contrast
                </span>
                <button
                  onClick={toggleHighContrast}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    highContrast ? "bg-blue-600" : "bg-gray-200"
                  }`}
                  role="switch"
                  aria-checked={highContrast}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      highContrast ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
