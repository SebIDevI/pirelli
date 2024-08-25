import React from "react";

export default function Video() {
  return (
    <video
      loop
      muted
      autoPlay
      playsInline
      controls={false}
      controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
      disablePictureInPicture
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    >
      <source src={"/Pirelli Design.mp4"} />
      Your browser does not support the video tag...
    </video>
  );
}
