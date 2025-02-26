import React, { useContext, useCallback } from "react";
import { PlaylistContext } from "../../contexts/PlaylistProvider";
import { playPauseHandler, getRandomTrack } from "../../helpers/player";
import { throttle } from "../../helpers/functions";

export default function TrackList() {
  const {
    playlist,
    currentTrack,
    setCurrentTrack,
  } = useContext(PlaylistContext);

  return (
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
              <span className="musicplayer_songlistcell text-left">
                {track.title}
              </span>
              <span className="musicplayer_songlistcell text-left">
                {track.artist}
              </span>

              <span className="musicplayer_songlistcell text-right">
                {track.album}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
