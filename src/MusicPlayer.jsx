import React from 'react';
import "./MusicPlayer.css"

const MusicPlayer = ({ song }) => {
  return (
    <div className="music-player">
      <img 
        src={song.image} 
        alt={`${song.name} cover`} // Corrected this line
        className="song-image" 
      />
      <h3>{song.name}</h3>
      <p>{song.artist}</p>
      {/* Embed the song using an iframe */}
      <iframe
        src={song.audio} // Assuming 'audio' holds the iframe URL
        frameBorder="0"
        height="125"
        width="100%"
        title={`${song.name} player`} // Corrected this line
      ></iframe>
    </div>
  );
};

export default MusicPlayer;
