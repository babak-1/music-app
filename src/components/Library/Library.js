import React from "react";
import { LibrarySong } from "../LibrarySong/LibrarySong";
import "./library.css";

export const Library = ({
  songs,
  currentSong,
  setCurrentSong,
  isLibOpen,
  setIsLibOpen,
  setIsPlaying,
}) => {
  const renderSongItems = () => {
    return songs.map((song) => (
      <LibrarySong
        key={song.id}
        song={song}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setIsPlaying={setIsPlaying}
      />
    ));
  };

  const handleClosed = () => {
    setIsLibOpen(false);
  };

  return (
    <div className={`library ${isLibOpen ? "opened-library" : ""}`}>
      <div className="library-heading-container">
        <h2>Library</h2>
        <button onClick={handleClosed} className="library-close-btn">
          x
        </button>
      </div>
      <div className="library-songs">{renderSongItems()}</div>
    </div>
  );
};
