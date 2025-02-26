export const playPauseHandler = (audioRef, isPlaying, setIsPlaying) => {
  return () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .then(() => console.log("Playback started successfully"))
        .catch((err) => console.warn("Playback blocked", err));
    }
    setIsPlaying(!isPlaying);
  }
};

export const getRandomTrack = (currentTrack, playlistTracksLength) => {
  let randomTrack;
  do {
    randomTrack = Math.floor(Math.random() * playlistTracksLength);
  } while (randomTrack === currentTrack);
  return randomTrack;
};