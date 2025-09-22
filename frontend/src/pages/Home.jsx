import React, { useEffect, useState } from 'react'


const Home = ({ videos = [], loop = false }) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const touchStartY = useRef(null);
  const touchEndY = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;


    v.pause();
    v.load();


    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          v.muted = true;
          v.play().catch(() => setIsPlaying(false));
        });
    }
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") nextVideo();
      if (e.key === "ArrowDown") prevVideo();
      if (e.key === " ") togglePlay();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);


  const nextVideo = () => {
    if (index >= videos.length - 1) {
      if (loop) setIndex(0);
      return;
    }
    setIndex((i) => i + 1);
  };

  const prevVideo = () => {
    if (index <= 0) return;
    setIndex((i) => i - 1);
  };


  const onEnded = () => {
    nextVideo();
  };


  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };
  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };
  const onTouchEnd = () => {
    if (touchStartY.current == null || touchEndY.current == null) return;
    const diff = touchStartY.current - touchEndY.current;
    const threshold = 40;
    if (diff > threshold) {
      nextVideo();
    } else if (diff < -threshold) {
      prevVideo();
    }
    touchStartY.current = null;
    touchEndY.current = null;
  };


  if (!videos || videos.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-600">No videos provided. Pass a <code>videos</code> array.</div>
      </div>
    );
  }



  return (
    <>
      <div
        className="h-screen w-screen bg-black relative overflow-hidden touch-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
          muted={false}
          controls={false}
          onClick={togglePlay}
          onEnded={onEnded}
        >
          <source src={videos[index]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>


        <div className="absolute top-4 left-4 text-sm bg-black/40 px-3 py-1 rounded-2xl text-white backdrop-blur">
          {index + 1} / {videos.length}
        </div>


        <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 px-4">
          <button
            onClick={prevVideo}
            className="bg-black/40 text-white px-4 py-2 rounded-2xl backdrop-blur"
          >
            Prev
          </button>
          <button
            onClick={togglePlay}
            className="bg-black/40 text-white px-4 py-2 rounded-2xl backdrop-blur"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={nextVideo}
            className="bg-black/40 text-white px-4 py-2 rounded-2xl backdrop-blur"
          >
            Next
          </button>
        </div>


        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
          <button className="flex flex-col items-center text-white text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.002V14" />
            </svg>
            <span>Like</span>
          </button>
          <button className="flex flex-col items-center text-white text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
            </svg>
            <span>Comment</span>
          </button>
          <button className="flex flex-col items-center text-white text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0122 9.618V18a2 2 0 01-2 2h-6" />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Home