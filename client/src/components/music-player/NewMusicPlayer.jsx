import React, { useState, useRef, useEffect, useContext } from "react";
import "./musicPlayer.css";
import { PlaylistContext } from "../../contexts/PlaylistProvider";
import TrackBar from "./TrackBar";
import { playPauseHandler, getRandomTrack } from "../../helpers/player";
export default function NewMusicPlayer() {
  const {
    playlist,
    currentTrack,
    setCurrentTrack,
    isLoading,
    setIsLoading,
    isPlaying,
    setIsPlaying,
    isShuffle,
    setIsShuffle,
    isRepeat,
    setIsRepeat,
    currentTime,
    setCurrentTime,
    isMuted,
    setIsMuted,
    volume,
    setVolume,
    duration,
    setDuration,
  } = useContext(PlaylistContext);

  const audioRef = useRef(new Audio(playlist.tracks[currentTrack].src));

  /*
  useEffect(() => {
    // Preload all tracks
    playlist.tracks.forEach(track => {
      const audio = new Audio(track.src);
      audio.preload = "auto";
    });
  }, []);
  */

  useEffect(() => {
    const audio = audioRef.current;
    setIsLoading(true);
    audio.src = playlist.tracks[currentTrack].src;
    audio.load();

    const handleCanPlayThrough = () => {
      setIsLoading(false);
      if (isPlaying) {
        audio
          .play()
          .then(() => console.log("Playback started successfully"))
          .catch((err) => console.warn("Playback retry needed", err));
      }
    };

    const handleError = () => {
      console.warn("Error loading track. Retrying in 2 seconds...");
      setTimeout(() => {
        audio.load();
        if (isPlaying) audio.play().catch(() => {});
      }, 2000);
    };

    audio.addEventListener("canplaythrough", handleCanPlayThrough);
    audio.addEventListener("error", handleError);

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    const trackEnded = () => {

      let nextTrack;


      if (isRepeat) {
        nextTrack = currentTrack;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.warn("Playback failed:", err));
      } else if (isShuffle) {
        nextTrack = getRandomTrack(currentTrack, playlist.tracks.length);

      } else {
        nextTrack = currentTrack + 1;
      }
      setCurrentTrack(nextTrack);
    };

    audio.addEventListener("ended", trackEnded);

    return () => {
      audio.removeEventListener("ended", trackEnded);
    };
  }, [isShuffle, isRepeat, currentTrack]);

  return (
    <>
      <div
        style={{ margin: "0 auto" }}
        className="musicplayer flex flex-col items-center justify-center p-4 bg-gray-900 text-white shadow-lg bg-gradient-to-b from-gray-500 to-black"
      >
        <div className="container">
        <TrackBar audioRef={audioRef} />

        <div className="musicplayer_playlist flex w-full">
          <div className="musicplayer_playlist_image">
            <img
              src={playlist.image}
              alt="Description"
              className="w-full object-cover"
            />
          </div>

          <div className="musicplayer_playlist_data flex-grow">
            <h2 className="uppercase">Made for {playlist.owner}</h2>
            <h1>{playlist.title}</h1>
            <h3>{playlist.description}</h3>
            <div>
              {playlist.artists.map((artist, index) => (
                <span key={index} className="">
                  {artist}
                </span>
              ))}
            </div>
            <button
              onClick={playPauseHandler(audioRef, isPlaying, setIsPlaying)}
              className="bg-green-500 text-white my-2 px-6 py-1 rounded-full hover:bg-green-600 transition"
            >
              {isPlaying ? "PAUSE" : "PLAY"}
            </button>
          </div>
        </div>

        <div className="mt-4 w-full">
          <ol className="musicplayer_songlist list-decimal list-inside mt-2">
            <li className="musicplayer_songlistitem cursor-pointer my-3">
              <div className="p-1 flex justify-between">
                <span className="musicplayer_songlistcell text-left">TITLE</span>
                <span className="musicplayer_songlistcell text-left">ARTIST</span>
                <span className="musicplayer_songlistcell text-left">ALBUM</span>
              </div>
            </li>

            {playlist.tracks.map((track, index) => (
              <li
                key={index}
                className={`musicplayer_songlistitem cursor-pointer my-3 ${
                  index === currentTrack ? "underline" : "text-white"
                }`}
                onClick={() => setCurrentTrack(index)}
              >
                <div className="p-1 flex justify-between">
                  <span className="musicplayer_songlistcell text-left">{track.title}</span>
                  <span className="musicplayer_songlistcell text-left">{track.artist}</span>

                  <span className="musicplayer_songlistcell text-right">{track.album}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
        </div>
      </div>
    </>
  );
}
