import React from "react";

function Favorites({ favoriteSongs, toggleFavorite }) {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      {favoriteSongs.length > 0 ? (
        <ul>
          {favoriteSongs.map((song) => (
            <li key={song.id} className="track-item">
              <span className="track-info">
                <strong>{song.title || "Unknown Title"}</strong> -{" "}
                {song.artist || "Unknown Artist"}
              </span>
              <button
                onClick={() => toggleFavorite(song.id)}
                aria-label={`Remove ${song.title || "this track"} from favorites`}
                className="remove-favorite"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-favorites">
          You have no favorite tracks yet. Add some to your list!
        </p>
      )}
    </div>
  );
}

export default Favorites;
