import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import MusicPlayer from "./MusicPlayer";
import Header from "./components/Header";
import Settings from "./components/Settings";
import Favorites from "./components/Favorites";
import ThemeSwitcher from "./components/ThemeSwitcher";
import PlaybackControls from "./components/PlaybackControls";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [theme, setTheme] = useState({ color: "#FF007F", background: "#202020" });
  const [favoriteSongIds, setFavoriteSongIds] = useState([]); // Array for multiple favorites
  const audioRef = useRef(null);

  // Fetch songs from db.json
  useEffect(() => {
    fetch("http://localhost:3000/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  // Playback controls
  const playbackControls = {
    play: (trackUri) => {
      const track = songs.find((song) => song.audioUrl === trackUri);
      if (track) {
        setCurrentTrack(track);
        if (audioRef.current) {
          audioRef.current.src = trackUri;
          audioRef.current.play();
        }
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    },
    stop: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setCurrentTrack(null);
    },
  };

  // Toggle favorite song logic
  const toggleFavorite = (songId) => {
    setFavoriteSongIds((prevIds) =>
      prevIds.includes(songId)
        ? prevIds.filter((id) => id !== songId) // Remove if already a favorite
        : [...prevIds, songId] // Add if not a favorite
    );
  };

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.style.setProperty("--theme-color", newTheme.color);
    document.documentElement.style.setProperty("--theme-background", newTheme.background);
  };

  return (
    <div className="App" style={{ backgroundColor: theme.background, color: theme.color }}>
      <Header />
      <Settings onThemeChange={handleThemeChange} />
      <PlaybackControls playbackControls={playbackControls} currentTrack={currentTrack} />

      {/* Display current track */}
      {currentTrack && (
        <div className="now-playing">
          <h2>Now Playing:</h2>
          <p>
            <strong>{currentTrack.title}</strong> by {currentTrack.artist}
          </p>
        </div>
      )}

      {/* Song list */}
      <div className="song-list">
        <h1>Music Player</h1>
        {songs.map((song) => (
          <div key={song.id} className="song-item">
            <MusicPlayer song={song} />
            <div>
              <strong>{song.title}</strong> by {song.artist}
            </div>
            <button
              onClick={() => playbackControls.play(song.audioUrl)}
              style={{ marginRight: "10px" }}
            >
              Play
            </button>
            <button
              onClick={() => toggleFavorite(song.id)}
              style={{
                background: favoriteSongIds.includes(song.id) ? "yellow" : "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
              }}
              aria-label={
                favoriteSongIds.includes(song.id)
                  ? "Unfavorite this song"
                  : "Mark as favorite"
              }
            >
              {favoriteSongIds.includes(song.id) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>

      {/* Audio element */}
      <audio ref={audioRef}></audio>

      {/* Favorites section */}
      <Favorites
        favoriteSongs={songs.filter((song) => favoriteSongIds.includes(song.id))}
        toggleFavorite={toggleFavorite}
      />
      <ThemeSwitcher onThemeChange={handleThemeChange} />
    </div>
  );
};

export default App;
