import React from "react";
import "./Player.css";
export const Player = ({
  musicRef,
  songs,
  currentSong,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  timePercentage,
  setTimePercentage,
  isPlaying,
  setIsPlaying,
  prevSong,
  nextSong,
  isPlayListRepeat,
  setIsPlayListRepeat,
  buttonStatus,
  isMuted,
  setIsMuted,
}) => {
  const handlePlayPause = () => {
    if (isPlaying) {
      musicRef.current.pause();
    } else {
      musicRef.current.play();
    }
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const getNormalTime = (time) => {
    if (time) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    } else {
      return "0:00";
    }
  };

  const handleSeekBarDrag = (e) => {
    musicRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const handlemute = () => {
    setIsMuted(!isMuted);
    musicRef.current.muted = !isMuted;
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getNormalTime(currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`,
          }}
        >
          <input
            type="range"
            onChange={handleSeekBarDrag}
            value={currentTime}
            min={0}
            max={duration}
            className="seekbar"
          />
          <div
            className="animate-track"
            style={{ transform: `translateX(${timePercentage}%)` }}
          ></div>
        </div>
        <p>{getNormalTime(duration)}</p>
      </div>
      <div className="play-control">
        <button
          className="skip-back player-btn"
          onClick={prevSong}
          disabled={!buttonStatus.previous}
        >
          &lt;
        </button>
        <button className="play player-btn" onClick={handlePlayPause}>
          {isPlaying ? "stop" : "play"}
        </button>
        <button
          className="skip-next player-btn"
          onClick={nextSong}
          disabled={!buttonStatus.next}
        >
          &gt;
        </button>

        <button onClick={handlemute}>{isMuted ? "unmute" : "mute"}</button>
      </div>
    </div>
  );
};
