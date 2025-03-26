import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 }
    });

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlaying(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlaying(false);
        }
    };

    
    useEffect(() => {
        if (playing && audioRef.current) {
            audioRef.current.play();
        }
    }, [track]);

    const playWithId = (id) => {
        setTrack(songsData[id]);
        setPlaying(true);
    };

    const previous = () => {
        if (track.id > 0) {
            setTrack(songsData[track.id - 1]);
            setPlaying(true);
        }
    };

    const next = () => {
        if (track.id < songsData.length - 1) {
            setTrack(songsData[track.id + 1]);
            setPlaying(true);
        }
    };

    const seekSong = (e) => {
        audioRef.current.currentTime=((e.nativeEvent.offsetX/ seekBg.current.offsetWidth)*audioRef.current.duration)
    };


    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                if (audioRef.current.duration) {
                    seekBar.current.style.width =
                        Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100) + "%";
                    setTime({
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60)
                        }
                    });
                }
            };
        }
    }, [audioRef]); 

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playing,
        setPlaying,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong
    };

    return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};

export default PlayerContextProvider;
