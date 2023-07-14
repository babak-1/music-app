import React from "react";
import "./Song.css";

export const Song = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt="" className="current-song-img" />
      <p className="current-song-name">{currentSong.name}</p>
      <p className="current-song-artist">{currentSong.artist}</p>
    </div>
  );
};
