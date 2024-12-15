import React from "react";

function PlaybackControls({ playbackControls, currentTrack }) {
  return (
    <div className="playback-controls">
      <h3>Now Playing: {currentTrack ? currentTrack.title : "None"}</h3>
      <button
        onClick={() =>
          playbackControls.play(currentTrack ? currentTrack.audioUrl : undefined)
        }
      >
        Play
      </button>
    </div>
  );
}

export default PlaybackControls;
