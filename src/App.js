import logo from './logo.svg';
import ReactPlayer from 'react-player';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [videoPath, setVideoPath]  = useState("")

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPath(url);
    }
  };

  return (
    <div className="App">
      <ReactPlayer url={videoPath} controls width={500} height={500}/>
    </div>
  );
}

export default App;
