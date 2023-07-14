import React from "react";

export const LibrarySong = ({ song, currentSong, setCurrentSong }) => {
  const handleChooseSong = () => {
    setCurrentSong(song);
  };

  return (
    <div
      className={`library-song ${
        song.id === currentSong.id ? "active-music" : ""
      }`}
      onClick={handleChooseSong}
    >
      <img src={song.cover} alt="" className="library-cover-image" />
      <div className="song-detail">
        <h2>{song.name}</h2>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
