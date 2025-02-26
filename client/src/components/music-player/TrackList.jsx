import React, { useContext } from "react";
import { PlaylistContext } from "../../contexts/PlaylistProvider";
import TrackItem from "./TrackItem";

export default function TrackList() {
  const {
    playlist,
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
          <TrackItem key={index} track={track} index={index}/>
        ))}
      </ol>
    </div>
  );
}
