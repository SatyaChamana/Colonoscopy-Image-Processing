import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({}) => {
  const [blobUrl, setBlobUrl] = useState('');

  useEffect(() => {
    
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBlobUrl(url);
    }
  }

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange}/>
      <ReactPlayer url={blobUrl} width="500px" height = "500px" controls/>
     
    </div>
  );
};

export default VideoPlayer;
