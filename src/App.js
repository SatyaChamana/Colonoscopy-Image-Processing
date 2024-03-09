import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function App() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {videoUrl && <ReactPlayer url={videoUrl} controls />}
    </div>
  );
}

export default App;
