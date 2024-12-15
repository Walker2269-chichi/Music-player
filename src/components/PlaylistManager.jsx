import React, { useState } from "react";

function PlaylistManager({ playlists, managePlaylists }) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [trackUri, setTrackUri] = useState("");
  const [trackName, setTrackName] = useState("");

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      managePlaylists("create", { name: newPlaylistName });
      setNewPlaylistName("");
    } else {
      alert("Playlist name cannot be empty!");
    }
  };

  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  const handleAddTrackToPlaylist = () => {
    if (!selectedPlaylistId) {
      alert("Please select a playlist to add the track.");
      return;
    }

    if (trackUri.trim() && trackName.trim()) {
      const selectedPlaylist = playlists.find((pl) => pl.id === selectedPlaylistId);
      managePlaylists("addTrack", selectedPlaylist, { uri: trackUri, name: trackName });
      setTrackUri("");
      setTrackName("");
    } else {
      alert("Both Track URI and Name are required!");
    }
  };

  const handleRemoveTrackFromPlaylist = (track) => {
    if (selectedPlaylistId) {
      const selectedPlaylist = playlists.find((pl) => pl.id === selectedPlaylistId);
      managePlaylists("removeTrack", selectedPlaylist, track);
    }
  };

  const selectedPlaylist = playlists.find((pl) => pl.id === selectedPlaylistId);

  return (
    <div className="playlist-manager">
      <h2>Playlist Manager</h2>

      {/* Create New Playlist */}
      <div className="create-playlist">
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="New playlist name"
        />
        <button onClick={handleCreatePlaylist}>Create</button>
      </div>

      {/* Display Existing Playlists */}
      {playlists.length > 0 && (
        <div className="playlists">
          <h3>Existing Playlists</h3>
          {playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-item">
              <span>{playlist.name}</span>
              <button onClick={() => handleSelectPlaylist(playlist.id)}>Edit</button>
              <button onClick={() => managePlaylists("delete", playlist)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      {/* Edit Selected Playlist */}
      {selectedPlaylist && (
        <div className="edit-playlist">
          <h4>Editing: {selectedPlaylist.name}</h4>

          {/* Add Track to Playlist */}
          <h4>Add Track</h4>
          <input
            type="text"
            value={trackUri}
            onChange={(e) => setTrackUri(e.target.value)}
            placeholder="Track URI"
          />
          <input
            type="text"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
            placeholder="Track Name"
          />
          <button onClick={handleAddTrackToPlaylist}>Add Track</button>

          {/* Remove Track from Playlist */}
          {selectedPlaylist.tracks.length > 0 ? (
            <>
              <h4>Remove Track</h4>
              {selectedPlaylist.tracks.map((track) => (
                <div key={track.uri} className="track-item">
                  <span>{track.name}</span>
                  <button onClick={() => handleRemoveTrackFromPlaylist(track)}>Remove</button>
                </div>
              ))}
            </>
          ) : (
            <p>No tracks in this playlist.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default PlaylistManager; // Ensure correct export here
