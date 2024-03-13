import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import "./CSS/VideoPlayer.css"

const VideoPlayer = ({videoURL, handleFileChange, videoRef, snap}) => {

  useEffect(() => {
    
  }, []);

  return (
    <div className='videoplayerContainer flex1'>
      <input type="file" accept="video/*" onChange={handleFileChange}/>
      {videoURL && <><video
        ref={videoRef}
        id="myvideo"
        className="video-js vjs-fluid vjs-tech"
        controls
        width="750"
        height="500"
        data-setup="{}"
        poster="http://www.allotoi.com/wp-content/uploads/2014/07/rickyPepe.jpg"
        src={videoURL}
      >
        <source src={videoURL} type="video/mp4" />
      </video>
      {/* <ReactPlayer ref={videoRef} url={videoURL} width={750} height = {500} controls/> */}
      <button onClick={snap} id="snap">Snap Photo</button></>}
    </div>
  );
};

export default VideoPlayer;
