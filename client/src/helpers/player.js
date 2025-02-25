export const playPauseHandler = (audioRef, isPlaying, setIsPlaying) => {
  return () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.warn("Playback blocked", err));
    }
    setIsPlaying(!isPlaying);
  }
};