"use client";

import ReactPlayer from "react-player/youtube";
import React from "react";

const VideoPlayer = () => {
  return (
    <ReactPlayer
      url="https://www.youtube.com/watch?v=Dj85hJVpfyw"
      width={"100%"}
      height={"100%"}
      controls
    />
  );
};

export default VideoPlayer;
