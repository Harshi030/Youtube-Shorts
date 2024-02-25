import React, { useState, useEffect, useRef } from 'react';
import style from "./VideoPlayer.module.css"
const VideoPlayer = ({ src, title }) => {
  const [isPlaying, setIsPlaying] = useState(true); // Initialize to true
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting);
        if (entry.isIntersecting && video.paused) {
          video.play();
        } else if (!entry.isIntersecting && !video.paused) {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (video) {
      observer.observe(video);
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (video) {
        observer.unobserve(video);
        video.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = src;
    }
  }, [src]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(Math.floor(video.currentTime));
      setDuration(Math.floor(video.duration));
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused || video.ended) {
        video.play();
        setIsPlaying(true); // Update state to reflect playing
      } else {
        video.pause();
        setIsPlaying(false); // Update state to reflect pausing
      }
    }
  };

  const handleLike = () => {
    setIsLiked(prevState => !prevState);
  };

  return (
    <center>
    <div id={style.conatiner}>
      <video
        ref={videoRef}
        autoPlay={isPlaying}
        controls={false}
      ></video>
      <section>
      <h2>{title}</h2>
      <button id={style.play} onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <div>
        Progress: {currentTime}/{duration}
      </div>
      <button id={style.like} onClick={handleLike}>{isLiked ? 'Unlike' : 'Like'}</button></section>
    </div>
    </center>
  );
};

export default VideoPlayer;
