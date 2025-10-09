import React from "react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import api from "../services/Api";
import { Link } from "react-router-dom";
import {
  FaRegHeart,
  FaHeart,
  FaRegBookmark,
  FaBookmark,
  FaRegComment,
} from "react-icons/fa";

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
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
   const res =  api.get("/food").then((response) => {
      setVideos(response.data.foodItems);

      const userLiked = res.data.foodItems
        .filter(video => video.likes.includes(currentUserId))
        .map(video => video._id);

      setLikedVideos(userLiked);
    });
  }, []);

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

  const toggleLike = async (videoId) => {
    try {
      const isLiked = likedVideos.includes(videoId)

      await api.post("/food/like", { foodItemId: videoId });
      setLikedVideos(isLiked ? likedVideos.filter((id) => id !== videoId) : [...likedVideos, videoId]);
      setVideos(videos.map(video => {
        if (video._id === videoId) {
          return {
            ...video,
            likeCount: isLiked ? video.likeCount - 1 : video.likeCount + 1
          };
        }
        return video;
      }));
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };


  const toggleSave = async (videoId) => {
    try {
      const isSaved = savedVideos.includes(videoId);
      await api.post("/food/save", { foodItemId: videoId });

      setSavedVideos(
        isSaved
          ? savedVideos.filter((id) => id !== videoId)
          : [...savedVideos, videoId]
      );
      setVideos(
        videos.map((video) => {
          if (video._id === videoId) {
            return {
              ...video,
              saveCount: isSaved ? video.saveCount - 1 : video.saveCount + 1,
            };
          }
          return video;
        })
      );
    } catch (error) {
      console.error("Error saving video:", error);
    }
  };


  const handleComment = async (videoId) => {
    const text = prompt("Enter your comment:");
    if (!text) return;

    try {
      const res = await api.post("/food/comment", {
        foodItemId: videoId,
        text,
      })
      console.log("Comment added:", res.data.comment);

      // Update local state so UI updates instantly
      setVideos(
        videos.map((v) =>
          v._id === videoId ? { ...v, commentCount: v.commentCount + 1 } : v
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
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
          />

          {/* Action Buttons (Like + Save + Comment) */}
          <div className="absolute right-6 bottom-24 flex flex-col items-center space-y-6 z-20">
            {/* Like */}
            <div className="flex flex-col items-center">
              <button onClick={() => toggleLike(video._id)} className="focus:outline-none">
                {likedVideos.includes(video._id) ? (
                  <FaHeart className="text-red-500 text-3xl hover:scale-110 transition" />
                ) : (
                  <FaRegHeart className="text-white text-3xl hover:scale-110 transition" />
                )}
              </button>
              <span className="text-white">{video.likeCount}</span>
            </div>

            {/* Save */}
            <div className="flex flex-col items-center">
              <button onClick={() => toggleSave(video._id)} className="focus:outline-none">
                {savedVideos.includes(video._id) ? (
                  <FaBookmark className="text-yellow-400 text-3xl hover:scale-110 transition" />
                ) : (
                  <FaRegBookmark className="text-white text-3xl hover:scale-110 transition" />
                )}
              </button>
            </div>

            {/* Comment */}
            <div className="flex flex-col items-center">
              <button onClick={() => handleComment(video._id)} className="focus:outline-none">
                <FaRegComment className="text-white text-3xl hover:scale-110 transition" />
              </button>
              <span className="text-white">{video.commentCount}</span>
            </div>
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
