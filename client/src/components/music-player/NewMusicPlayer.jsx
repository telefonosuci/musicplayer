import React, { useState, useRef, useEffect, useContext } from "react";
import "./musicPlayer.css";
import { PlaylistContext } from "../../contexts/PlaylistProvider";
import TrackBar from "./TrackBar";
import { playPauseHandler } from "../../helpers/player";
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

  const getRandomTrack = () => {
    // return Math.floor(Math.random() * tracks.length);
    const validIndexes = playlist.tracks
      .map((_, index) => index)
      .filter((i) => i !== currentTrack);
    return validIndexes[Math.floor(Math.random() * validIndexes.length)];
  };

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
      //console.log("Timeupdate ", audio.currentTime);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateTime);
    //audio.addEventListener("progress", updateTime);

    const trackEnded = () => {
      console.log("Track has finished playing.");

      let nextTrack;

      if (!isShuffle) {
        nextTrack = currentTrack + 1;
        console.log("Get next track, isshuffle is ", isShuffle);
      } else {
        nextTrack = getRandomTrack();
        console.log("Get random track, isshuffle is ", isShuffle);
        console.log("Get random track ", nextTrack);
      }
      setCurrentTrack(nextTrack);
    };

    audio.addEventListener("ended", trackEnded);

    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlayThrough);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", updateTime);
    };
  }, [currentTrack]);

  return (
    <>
      <div
        style={{ margin: "0 auto" }}
        className="musicplayer flex flex-col items-center justify-center p-4 bg-gray-900 text-white shadow-lg bg-gradient-to-b from-gray-500 to-black"
      >
        <TrackBar audioRef={audioRef} />

        <div className="musicplayer_playlist flex w-full">
          <div className="musicplayer_playlist_image">
            <img
              src={playlist.image}
              alt="Description"
              className="w-48 h-48 object-cover"
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
            <li className="musicplayer_songlistitem cursor-pointer m-3">
              <div className="p-1 flex justify-between">
                <span>TITLE</span>
                <span>ARTIST</span>
                <span>ALBUM</span>
              </div>
            </li>

            {playlist.tracks.map((track, index) => (
              <li
                key={index}
                className={`musicplayer_songlistitem cursor-pointer m-3 ${
                  index === currentTrack ? "underline" : "text-white"
                }`}
                onClick={() => setCurrentTrack(index)}
              >
                <div className="p-1 flex justify-between">
                  <span>{track.title}</span>
                  <span>{track.artist}</span>

                  <span>{track.album}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}
