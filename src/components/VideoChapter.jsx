import MuxPlayer from "@mux/mux-player-react";
import React from "react";

const VideoChapter = ({ chapter }) => {
  function onTimeUpdate(time) {
    console.log("time", time);
  }

  return (
    <div className="flex w-full flex-col items-center rounded-md border bg-secondary-color4/50 p-4">
      <div className="flex w-full items-center justify-center">
        <MuxPlayer
          // playbackId="EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs"
          metadataVideoId="1234"
          metadataVideoTitle="My Video Title"
          metadataViewerUserId="1234"
          onTimeUpdate={onTimeUpdate}
          src={`https://stream.mux.com/EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs.m3u8`}
          className="w-full max-w-[800px] object-fill"
        />
      </div>
      <div className="mt-4 line-clamp-2 flex w-full max-w-[800px] flex-col justify-center">
        <h1 className="text-3xl font-medium">Chapter {chapter}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          doloremque, quas, nemo, quia quos voluptas quod quibusdam iure
          voluptatum natus autem. Quisquam doloremque, quas, nemo, quia quos
          voluptas quod quibusdam iure voluptatum natus autem.
        </p>
      </div>
    </div>
  );
};

export default VideoChapter;
