import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import api from "../services/Api";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from "react-icons/fa";

// const videos = [
//   {
//     id: 1,
//     src: "https://ik.imagekit.io/Hellokitty/9ffa7f5f-4e49-4c8c-9dfe-3d1a876f3019_sboUI2j61a",
//     description: "This is the first product video with a short description.",
//     storeUrl: "/store/1",
//   },
//   {
//     id: 2,
//     src: "https://www.w3schools.com/html/movie.mp4",
//     description: "Second video showcasing amazing food from our partner.",
//     storeUrl: "/store/2",
//   },
//   {
//     id: 3,
//     src: "https://www.w3schools.com/html/mov_bbb.mp4",
//     description: "Another cool product video, check it out now!",
//     storeUrl: "/store/3",
//   },
// ];

const Home = () => {
  const [videos, setVideos] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);
  useEffect(() => {
    api.get("/food").then(response => {
      setVideos(response.data.foodItems)

    })

  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    });
  }, [activeIndex, videos]);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const screenHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / screenHeight);
    if (newIndex !== activeIndex) setActiveIndex(newIndex);
  };

  const toggleLike = (id) => {
    setLikedVideos((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const toggleSave = (id) => {
    setSavedVideos((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };


  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      onScroll={handleScroll}
    >

      {videos.map((video, index) => (
        <motion.div
          key={video._id}
          className="relative h-screen w-full flex items-center justify-center snap-start"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Video */}
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.video}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
          // preload = "metadata"
          />

          {/* Action Buttons (Like + Save) */}
          <div className="absolute right-6 bottom-24 flex flex-col space-y-6 items-center z-20">
            <button
              onClick={() => toggleLike(video._id)}
              className="focus:outline-none"
            >
              {likedVideos.includes(video._id) ? (
                <FaHeart className="text-red-500 text-3xl hover:scale-110 transition" />
              ) : (
                <FaRegHeart className="text-white text-3xl hover:scale-110 transition" />
              )}
            </button>

            <button
              onClick={() => toggleSave(video._id)}
              className="focus:outline-none"
            >
              {savedVideos.includes(video._id) ? (
                <FaBookmark className="text-yellow-400 text-3xl hover:scale-110 transition" />
              ) : (
                <FaRegBookmark className="text-white text-3xl hover:scale-110 transition" />
              )}
            </button>
          </div>

          {/* Overlay for description + button */}
          <div className="absolute bottom-10 w-full px-6 flex flex-col items-center space-y-3">
            <p className="text-white text-lg font-medium text-center line-clamp-2">
              {video.description}
            </p>
            <Link
              to={"/food-partner/" + video.foodpartner}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              Visit Store
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Home;
