import { createContext, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props)=>{

    const audioRef = useRef();
    const seekbg = useRef();
    const seekBar = useRef();

    const [track,setTrack]= useState(songsData[0])
    const [playing, setPlaying] = useState(false);
    const [time,setTime]= useState({
        currentTime:{
            second: 0,
            minute: 0
        },
        totalTime:{
            second: 0,
            minute: 0
        }
    })


    const play= ()=>{
        audioRef.current.play();
        setPlaying(true);
    }
    const pause= ()=>{
        audioRef.current.pause();
        setPlaying(false);
    }
 
    const contextValue = {
        audioRef,
        seekBar,
        seekbg,
        track,setTrack,
        playing,setPlaying,
        time,setTime,
        play,pause
    }

    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}
    
export default PlayerContextProvider;