import React, { useState } from "react";

function ThemeSwitcher({ onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { name: "Default", color: "#1DB954", background: "#191414", img: "/images/default-theme.png" },
    { name: "Dark Orange", color: "#f39c12", background: "#34495e", img: "/images/dark-orange-theme.png" },
    { name: "Ocean Blue", color: "#3498db", background: "#2c3e50", img: "/images/ocean-blue-theme.png" },
    { name: "Rose Pink", color: "#e74c3c", background: "#f5b7b1", img: "/images/rose-pink-theme.png" },
    { name: "Forest Green", color: "#27ae60", background: "#145a32", img: "/images/forest-green-theme.png" },
    { name: "Lavender Dream", color: "#8e44ad", background: "#f4ecf7", img: "/images/lavender-dream-theme.png" },
    { name: "Golden Glow", color: "#f1c40f", background: "#fef9e7", img: "/images/golden-glow-theme.png" },
    { name: "Midnight Sky", color: "#2c3e50", background: "#17202a", img: "/images/midnight-sky-theme.png" },
    { name: "Sunny Yellow", color: "#f7dc6f", background: "#fdf2e9", img: "/images/sunny-yellow-theme.png" },
    { name: "Ice Blue", color: "#5dade2", background: "#d6eaf8", img: "/images/ice-blue-theme.png" },
  ];

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="theme-switcher-container">
      <button className="theme-switcher-button" onClick={toggleMenu}>
        🎨 Themes
      </button>
      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((theme) => (
            <div
              key={theme.name}
              className="theme-option"
              onClick={() => {
                onThemeChange({ color: theme.color, background: theme.background });
                setIsOpen(false);
              }}
            >
              <img src={theme.img} alt={`${theme.name} Theme`} title={theme.name} className="theme-image" />
              <span>{theme.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ThemeSwitcher;
