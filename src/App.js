import React, { useState, useEffect, useRef } from "react";
import LineChart from "./LineChart";
import VideoPlayer from "./VideoPlayer";
import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";
import ImageEditor from "./ImageEditor";
import "./App.css";

function App() {
  const [framesData, setFramesData] = useState({});
  const [videoURL, setVideoURL] = useState("");
  const [image, setImage] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();
  const editorRef = useRef();

  const fetchData = async () => {
    try {
      const response = await fetch("/FD_20Sec.json"); // Assuming data is in the public folder
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const changedData = jsonData.f_Values.map((item, index) => {
        let obj = {};
        obj.x = index + 1;
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
    console.log(editorRef.current);
  }, []);

  useEffect(() => {}, [videoURL]);

  const snap = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = canvas.toDataURL();
    console.log(image);
    setImage(image);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
  };

  const frameClick = (data) => {
    const totalDuration = videoRef.current.duration;
    const fps = 30;
    const frame = data.x;
    videoRef.current.currentTime = (frame / fps).toFixed(2);
  };

  return (
    <div className="App">
      <div className="content">
        <VideoPlayer
          videoRef={videoRef}
          videoURL={videoURL}
          handleFileChange={handleFileChange}
          snap={snap}
        />
        {videoURL && (
          <LineChart
            frameClick={frameClick}
            videoUrl={videoURL}
            framesData={framesData}
          />
        )}
      </div>
      <canvas ref={canvasRef} id="canvas" width="750" height="500"></canvas>
      {<ImageEditorComponent ref={editorRef} />}
    </div>
  );
}

export default App;
