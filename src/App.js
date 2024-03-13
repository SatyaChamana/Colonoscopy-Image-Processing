import React, { useState, useEffect, useRef } from "react";
import LineChart from "./LineChart";
import VideoPlayer from "./VideoPlayer";
import "./App.css";

function App() {
  const [framesData, setFramesData] = useState({});
  const [videoURL, setVideoURL] = useState("");
  const videoRef = useRef();
  const canvasRef = useRef();
  

  const fetchData = async () => {
    try {
      const response = await fetch("/FD_20Sec.json"); // Assuming data is in the public folder
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const changedData = jsonData.f_Values.map((item, index) => {
        let obj = {};
        obj.x = index+1;
        obj.y = item;
        return obj;
      });
      setFramesData(changedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  }, [videoURL]);

  const snap = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
    
  }



  const frameClick = (data) => {
    const totalDuration = videoRef.current.getDuration()
    const fps = 30
    const frame = data.x

    const timeSecs = (frame/fps).toFixed(2)

    videoRef.current.seekTo(timeSecs,'seconds')
  };

  

  return (
    <div className="App">
      <div className="content">
        <VideoPlayer videoRef={videoRef} videoURL={videoURL} handleFileChange={handleFileChange} snap={snap}  />
        {videoURL && <LineChart frameClick={frameClick} videoUrl={videoURL} framesData={framesData} />}
      </div>
      <canvas ref={canvasRef} id="canvas" width="750" height="500"></canvas>
      
    </div>
  );
}

export default App;
