import React, { useContext } from "react";
import { PlaylistContext } from "../../contexts/PlaylistProvider";

const TrackItem = ({track, index}) => {
  const {
      currentTrack,
      setCurrentTrack
    } = useContext(PlaylistContext);

  return (
    <li
      className={`musicplayer_songlistitem cursor-pointer my-3 ${ index === currentTrack ? "underline" : "text-white"}`}
      onClick={() => setCurrentTrack(index)}
    >
      <div className="p-1 flex justify-between">
        <span className="musicplayer_songlistcell text-left">
          {track.title}
        </span>
        <span className="musicplayer_songlistcell text-left">
          {track.artist}
        </span>

        <span className="musicplayer_songlistcell text-left">
          {track.album}
        </span>
      </div>
    </li>
  );
};

export default TrackItem;
