import React, { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

function Settings({ onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSettings = () => setIsOpen((prev) => !prev);

  return (
    <div className="settings-container">
      <button className="settings-toggle-button" onClick={toggleSettings}>
        ⚙️ Settings
      </button>
      {isOpen && (
        <div className="settings-panel">
          <h2>Settings</h2>
          <div className="settings-section">
            <h3>Theme Switcher</h3>
            <ThemeSwitcher onThemeChange={onThemeChange} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
