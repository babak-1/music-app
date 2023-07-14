import { useState, useRef, useEffect } from "react";
import "./App.css";
import { Library } from "./components/Library/Library";
import { Nav } from "./components/Nav/Nav";
import { Player } from "./components/Player/Player";
import { Song } from "./components/Song/Song";
import data from "./data";

function App() {
  const musicRef = useRef(null);

  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLibOpen, setIsLibOpen] = useState(false);
  const [isPlayListRepeat, setIsPlayListRepeat] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timePercentage, setTimePercentage] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const handleSongLonger = (e) => {
    const currentTimeNow = e.target.currentTime;
    const currentDuration = e.target.duration;
    const currentPercentage = Math.round(
      (100 * currentTimeNow) / currentDuration
    );

    setCurrentTime(currentTimeNow);
    setDuration(currentDuration);
    setTimePercentage(currentPercentage);
  };

  const [buttonStatus, setButtonStatus] = useState({
    next: true,
    previous: false,
  });

  const handleChangeSong = (direct) => {
    let index = songs.findIndex((song) => song.id === currentSong.id);

    switch (direct) {
      case "next":
        if (isPlayListRepeat) {
          if (index === songs.length - 1) {
            setCurrentSong(songs[0]);
          } else {
            setCurrentSong(songs[index + 1]);
          }
          setButtonStatus({ next: true, previous: true });
        } else {
          if (index === songs.length - 1) {
            setButtonStatus({ next: false, previous: true });
          } else {
            setCurrentSong(songs[index + 1]);
            setButtonStatus({ next: true, previous: true });
          }
        }

        break;

      case "prev":
        if (isPlayListRepeat) {
          if (index === 0) {
            setCurrentSong(songs[songs.length - 1]);
          } else {
            setCurrentSong(songs[index - 1]);
          }
          setButtonStatus({ next: true, previous: true });
        } else {
          if (index === 0) {
            setButtonStatus({ next: true, previous: false });
          } else {
            setCurrentSong(songs[index - 1]);
            setButtonStatus({ next: true, previous: true });
          }
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    console.log(isPlaying);
  }, [isPlaying]);

  return (
    <div className="App">
      <Library
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isLibOpen={isLibOpen}
        setIsLibOpen={setIsLibOpen}
        setIsPlaying={setIsPlaying}
      />

      <div className="right-container">
        <Nav isLibOpen={isLibOpen} setIsLibOpen={setIsLibOpen} />
        <Song currentSong={currentSong} />
        <Player
          musicRef={musicRef}
          songs={songs}
          currentSong={currentSong}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          duration={duration}
          setDuration={setDuration}
          timePercentage={timePercentage}
          setTimePercentage={setTimePercentage}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          prevSong={() => handleChangeSong("prev")}
          nextSong={() => handleChangeSong("next")}
          isPlayListRepeat={isPlayListRepeat}
          setIsPlayListRepeat={setIsPlayListRepeat}
          buttonStatus={buttonStatus}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
        />
        <audio
          src={currentSong.audio}
          ref={musicRef}
          onTimeUpdate={handleSongLonger}
          onLoadedMetadata={handleSongLonger}
          onEnded={() => handleChangeSong("next")}
          controls
        ></audio>
      </div>
    </div>
  );
}

export default App;
