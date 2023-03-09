import React, { useEffect } from "react"
import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './videoPlayer.css';



export default ({
    index,
    videoName,
    url,
    disableForward,
    onEnded,
    onProcess,
    onRender,
}) => {
    const [count, setCount] = useState(0);
    const playRef = useRef(null);
    const playerContainerRef = useRef(null);
    const playerControl = useRef(null);
    const playerSeekBar = useRef(null);

    const [videoController, setVideoController] = useState({
        playing: false,
        duration: 0.00,
        muted: false,
        volume: 0.1,
    })
    const [playing, setPlaying] = useState(false);
    const [pused, setPused] = useState(true);
    const [played, setPlayed] = useState([0,0]);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [volume, setVolume] = useState([0, 1]);
    const [maxPlayed, setMaxPlayed] = useState(0);
    const [maxPlayedSeconds, setMaxPlayedSeconds] = useState(0);
    const [ened, setEned] = useState(false);
    const [thumbsDisabled, setThumbsDisabled] = useState(false);
    const [exceedLimit, setExceedLimit] = useState(0);


    const handlePlayVideo = () => {
        if(playing) {
            setPlaying(false);
            setPused(true);
            setVideoController({duration: playRef.current.getCurrentTime()});
            setVideoController({duration: videoController.duration});
            // console.log("not play")
        }
        else {
            // console.log("play")
            if(ened === true) setEned(false);
            setPlaying(true)
            setPused(false);
        }
    }

    const handleForwardVideo = () => {
        playRef.current.seekTo(playRef.current.getCurrentTime() + 10)
        console.log(playRef.current.getCurrentTime())
    }

    const handleRewind = () => {
        playRef.current.seekTo(playRef.current.getCurrentTime() - 10)
    }

    const handleToggleScreen = () => {
        screenfull.toggle(playerContainerRef.current)
    }

    const handleVideoVolume = (value) => {
        // console.log(value);
        setVolume([0, value[1] / 100]);
        // console.log(volume)
    }

    const handleProcess = (e) => {
        // console.log(e)
        if(pused) {
            return;
        }
        if(!seeking) {
            setPlayed([0, e.played]);
            // setPlayedSeconds(playRef.current.getCurrentTime())
            if(maxPlayedSeconds < playRef.current.getCurrentTime()) {
                setMaxPlayedSeconds(playRef.current.getCurrentTime())
                setMaxPlayed(e.played);
            }
        }

        if(count > 3) {
            playerControl.current.style.opacity = 0
            playerControl.current.style.cursor = "none";
            // playerControl.current.style.visibility = "hidden";
            setCount(0);
        }

        if(playerControl.current.style.opacity === "1") {
            playerControl.current.style.cursor = "auto";
            setCount(count+1);
        }

        // console.log(index, " on process")

        onProcess({
            isEnded: false,
            duration: videoController.duration,
            played: e.played,
        }, index)
    }

    const handleSeek = (value) => {
        // console.log("SEEK")
        playerSeekBar.current.thumb[1].current.focus()
        playerControl.current.style.opacity = 1;
        playerControl.current.style.cursor = "auto";
        // if(playing) {
        //    setPlaying(false); 
        // }
        setSeeking(true)
        // console.log("value",value[1])

        if(disableForward) {
            if(value[1] == 100) {
                return
            }
            else if(value[1] >= 100) {
                setExceedLimit(exceedLimit+1);
                setThumbsDisabled(true);
                setPlayed([0, 1])
                setSeeking(false)
                return
            }
        
            if(played[1] <= maxPlayed && value[1]/100 <= maxPlayed) {
                console.log("->",maxPlayed , value[1]/100, played)
                setPlayed([0, parseFloat(value[1] / 100) ])
                playRef.current.seekTo(parseFloat(value[1] / 100))
                setSeeking(false)
            }
            else {
                // console.log("exceed")
                setExceedLimit(exceedLimit+1);
                setThumbsDisabled(true);
                // setPlayed([0, played[1]])
                // playRef.current.seekTo(played[1])
                setPlayed(played)
                setSeeking(false)
                
            }
        }
        else {
            setPlayed([0, parseFloat(value[1] / 100) ])
            playRef.current.seekTo(parseFloat(value[1] / 100))
            setSeeking(false)
        }
    }

    const handleSeekMouseDown = () => {
        // setSeeking(true)
    }

    const handleSeekMouseUp = () => {
        
        // console.log("UP")
        if(!pused) {
            setPlaying(true); 
        }
        setSeeking(false)
        
        
    }

    const handleEnd = () => {
        // setMaxPlayed(0);
        // console.log("==> ",maxPlayed)
        setSeeking(false);
        setPlaying(false);
        setEned(true);
        setPlayed([0,1])
        playerSeekBar.current.thumb[1].current.focus()
        playerControl.current.style.opacity = 1;
        playerControl.current.style.cursor = "auto";
        onEnded({
            isEnded: true,
            duration: videoController.duration,
            played: 1,
        }, index)
    }


    const format = (sec) => {
        if(isNaN(sec)) {
            return "00:00";
        }

        const date = new Date(sec * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = date.getUTCSeconds().toString().padStart(2, "0");
        if(hh) {
            return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`
        }

        return `${mm}:${ss}`;
    }
    const currentTime = playRef.current ? playRef.current.getCurrentTime() : "00:00";
    const duration = playRef.current ? playRef.current.getDuration() : "00:00";
    const elapsedTime = format(currentTime);
    const totalDuration = format(duration);

    // console.log(currentTime)
    

    const handleMouseMove = () => {
        playerControl.current.style.opacity = 1;
        playerControl.current.style.cursor = "auto";
        // playerControl.current.style.visibility = "visible"
        setCount(0);
    }

    const handleFocus = (e) => {
        playerSeekBar.current.thumb[1].current.focus()
        playerControl.current.style.opacity = 1;
        playerControl.current.style.cursor = "auto";
        setCount(0);
    }

    const handleMouseOver = () => {
        playerSeekBar.current.thumb[1].current.focus()
    }

    const handleKeyDown = (e) => {
        e.preventDefault()
        if(e.code == "Space") {
            playerSeekBar.current.thumb[1].current.focus()
            playerControl.current.style.opacity = 1;
            playerControl.current.style.cursor = "auto";
            setCount(0);
            if(playing) {
                setPlaying(false);
                setPused(true);
                setVideoController({duration: playRef.current.getCurrentTime()});
                
            }
            else {
                if(ened === true) setEned(false);
                setPlaying(true)
                setPused(false);
            }
        }
    }

    if(exceedLimit > 0) {
        setExceedLimit(0);
        setThumbsDisabled(false);
    }

    useEffect(() => {
        onRender(index+1)
    })

    return (
        <div ref={playerContainerRef} id="playerWrapper" onMouseMove={handleMouseMove} tabIndex="1" onClick={(e) => handleFocus(e)} onKeyDown={(e) => handleKeyDown(e)} >
            <div className="d-flex justify-content-center" >
                <ReactPlayer
                    ref={playRef}
                    width={"100%"}
                    height={"100%"}
                    url={url}
                    muted={videoController.muted}
                    playing={playing}
                    onProgress={(e) => handleProcess(e)}
                    volume={volume[1]}
                    onEnded={(e) => handleEnd(e)}
                    // onReady={handleReady}
                />
            </div>
            
            <div ref={playerControl} id="controlWarpper" className='container-fluid' >
                <div className="row d-flex justify-content-between pt-2">
                    <div >
                        <h2 style={{color: "white"}}>{videoName}</h2>
                    </div>
                </div>

                <div id="controlIcons" className="col d-flex justify-content-center align-self-center align-self-stretch" onClick={handlePlayVideo}>
                    {/* <button onClick={handleRewind}>back</button> */}
                    <div onClick={handlePlayVideo} className="d-flex-grow align-self-center">
                        {
                            !ened ? (
                                pused ? (
                                    <i className="bi bi-pause-fill" style={{fontSize: "5rem", color: "white"}}/>
                                )
                                :
                                (
                                    <i className="bi bi-play" style={{fontSize: "5rem", color: "white"}}/>
                                )
                            )
                            :
                            (
                                <i className="bi bi-arrow-counterclockwise" style={{fontSize: "5rem", color: "white"}}/>
                            )
                        }
                    </div>
                    {/* <a onClick={handleRewind} className="d-flex align-self-center">
                        <i className="bi bi-fast-forward" style={{fontSize: "2rem", color: "white"}}/>
                    </a> */}

                </div>

                {/* <div className="container d-flex justify-content-between"/> */}

                <div className="row">
                    
                    <RangeSlider
                        ref={playerSeekBar}
                        className="single-thumb"
                        thumbsDisabled={[true, thumbsDisabled]}
                        rangeSlideDisabled={true}
                        min={0} 
                        max={100}
                        step={1}
                        defaultValue={[0, 0]}
                        value={[played[0], played[1] * 100]}
                        onInput={(e) => handleSeek(e)}
                        onThumbDragStart={handleSeekMouseDown}
                        onThumbDragEnd={handleSeekMouseUp}
                    />
                    
                    {/* <input 
                        type="range" 
                        class="form-range" 
                        min="0" 
                        max="100" 
                        value={played * 100}
                        onChange={(e) => handleSeek(e)}
                        onMouseDown={handleSeekMouseDown}
                        onMouseUp={(e) => handleSeekMouseUp(e)}
                    /> */}
                </div>

                <div id="buttomIcons" className="row ms-2 dflex justify-content-between ">
                    
                    <div className="col-auto d-flex align-self-center">
                        {
                            !ened ? (
                                pused ? (
                                    <a
                                        className="bi bi-pause-fill h1 fs-1" 
                                        style={{fontSize: "2rem", color: "white"}}
                                        onClick={handlePlayVideo}
                                    />
                                )
                                :
                                (
                                    <a
                                        className="bi bi-play h1 fs-1" 
                                        style={{fontSize: "2rem", color: "white"}}
                                        onClick={handlePlayVideo}
                                    />
                                )
                            )
                            :
                            (
                                <a
                                    className="bi bi-arrow-counterclockwise h1 fs-1" 
                                    style={{fontSize: "2rem", color: "white"}}
                                    onClick={handlePlayVideo}
                                />
                            )
                        }
                        
                    </div>
                    <div className="col-1 d-flex justify-content-start align-self-center pb-1">
                        {/* <RangeSlider min={0} max={100} step={1} /> */}
                        <RangeSlider
                            className="single-thumb"
                            thumbsDisabled={[true, false]}
                            rangeSlideDisabled={true}
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={[0, volume[1] * 100]}
                            value={[volume[0], volume[1] * 100]}
                            onInput={(e) => handleVideoVolume(e)}
                        />
                        {/* <input 
                            id="custom-range"
                            type="range"
                            class="form-range" 
                            min="0" 
                            max="100" 
                            step="1" 
                            value={volume * 100} 
                            onChange={(e) => handleVideoVolume(e)}
                        /> */}
                    </div>
                    <div className="col-8 d-flex justify-content-start align-self-center">
                        <h5>{elapsedTime} / {totalDuration}</h5>
                    </div>
                    <div 
                        className="col d-flex justify-content-end "
                        onClick={handleToggleScreen}
                    >
                        <a >
                            <i  class="bi bi-fullscreen" style={{fontSize: "2rem", color: "white"}} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}