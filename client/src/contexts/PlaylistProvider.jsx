import React, { createContext, useState, useContext, useEffect } from "react";

// Creiamo il contesto
export const PlaylistContext = createContext();

/* Creiamo un provider che gestisce lo stato */
export const PlaylistProvider = ({ children }) => {
  /*
  const [playlist, setPlaylist] = useState({
    title: "Your daily mix",
    description: "Your favourite music, plus some new discoveries you'll love.",
    owner: "Enrico",
    image: "assets/playlist_image.png",
    artists: ["Arctic Monkeys", "Dirty Pretty Things", "The Fratellis"],
    tracks: [
      { title: "Song 1", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", album: "Helix", artist: "Sound Helix" },
      { title: "Song 2", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", album: "Helix", artist: "Sound Helix"  },
      { title: "Song 3", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", album: "Helix", artist: "Sound Helix"  },
      { title: "Song 4", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", album: "Helix", artist: "Sound Helix"  },
      { title: "Song 5", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", album: "Helix", artist: "Sound Helix"  },
      { title: "Song 6", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", album: "Helix", artist: "Sound Helix"  },
      { title: "Song 7", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", album: "Helix", artist: "Sound Helix"  },
      { title: "Song 8", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", album: "Helix", artist: "Sound Helix"  },
      { title: "Song 9", image: "assets/song_image.png", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", album: "Helix", artist: "Sound Helix"  },
      { title: "Day o", image: "assets/song_image.png", src: "https://ia800701.us.archive.org/26/items/DayOBananaBoatSong/Day-O-Banana-Boat-Song.mp3", album: "Calypso", artist: "Harry Belafonte"  }
    ]
  });
*/
  const API_URL = "https://dummyjson.com/c/b586-68bf-4962-a335";

  const [playlist, setPlaylist] = useState({
    title: "",
    description: "",
    owner: "",
    image: "",
    artists: [],
    tracks: [],
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaylistLoading, setPlaylistLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch playlist");
        const data = await response.json();
        setPlaylist(data);
        setPlaylistLoading(false);
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setPlaylistLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        setPlaylist,
        currentTrack,
        setCurrentTrack,
        isLoading,
        setIsLoading,
        isPlaylistLoading,
        setPlaylistLoading,
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
        error,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
