
import React from 'react';
import { createRoot } from 'react-dom/client';
import MusicPlayerWrapper from '../../components/music-player/MusicPlayerWrapper';
import { PlaylistProvider } from '../../contexts/PlaylistProvider';

document.addEventListener('DOMContentLoaded', () => {

  const musicPlayerList = document.querySelectorAll('.js-react-music-player');

  musicPlayerList.forEach((el) => {


    const root = createRoot(el);
    root.render(
      <PlaylistProvider>
        <MusicPlayerWrapper />
      </PlaylistProvider>
    );
  });

});
