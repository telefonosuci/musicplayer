import React, { useContext } from "react";
import NewMusicPlayer from "./NewMusicPlayer";
import { PlaylistContext } from "../../contexts/PlaylistProvider";

const MusicPlayerWrapper = () => {
  const { isPlaylistLoading } = useContext(PlaylistContext);

  return (
    <div
      style={{ margin: "0 auto" }}
      className="musicplayer flex flex-col items-center justify-center p-4 bg-gray-900 text-white shadow-lg bg-gradient-to-b from-gray-500 to-black"
    >
      <div className="container text-center">
        {isPlaylistLoading ? "Loading" : <NewMusicPlayer />}
      </div>
    </div>
  );
};

export default MusicPlayerWrapper;
