import React from "react";

export default function Video() {
  return (
    <video autoPlay muted playsInline controls loop className="w-full h-full">
      <source src={"/Pirelli Design.mp4"} />
      Your browser does not support the video tag...
    </video>
  );
}
