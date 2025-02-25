
import React from 'react';
import { createRoot } from 'react-dom/client';
import NewMusicPlayer from '../../components/music-player/NewMusicPlayer';
import { PlaylistProvider } from '../../contexts/PlaylistProvider';

document.addEventListener('DOMContentLoaded', () => {

  const musicPlayerList = document.querySelectorAll('.js-react-music-player');

  musicPlayerList.forEach((el) => {


    const root = createRoot(el);
    root.render(
      <PlaylistProvider>
        <NewMusicPlayer />
      </PlaylistProvider>
    );
  });

});
