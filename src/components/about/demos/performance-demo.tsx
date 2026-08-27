"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function enforceVideoMute(video: HTMLVideoElement) {
  video.muted = true;
  video.volume = 0;
}

export function PerformanceDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    video.loop = true;
    enforceVideoMute(video);
    void video.load();
    void video.play().catch(() => {});
  }, [shouldLoad]);

  const handleVideoRef = useCallback((video: HTMLVideoElement | null) => {
    videoRef.current = video;
    if (!video) return;
    video.loop = true;
    enforceVideoMute(video);
  }, []);

  const handleVideoEnded = useCallback((video: HTMLVideoElement) => {
    video.currentTime = 0;
    void video.play().catch(() => {});
  }, []);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden rounded-xl bg-black [transform:translateZ(0)]"
    >
      <video
        ref={handleVideoRef}
        autoPlay={shouldLoad}
        muted
        loop
        playsInline
        preload={shouldLoad ? "auto" : "none"}
        disablePictureInPicture
        poster="/about/lightning-performance-poster.jpg"
        onVolumeChange={(e) => enforceVideoMute(e.currentTarget)}
        onPlay={(e) => enforceVideoMute(e.currentTarget)}
        onLoadedMetadata={(e) => enforceVideoMute(e.currentTarget)}
        onEnded={(e) => handleVideoEnded(e.currentTarget)}
        className="aspect-[16/10] w-full object-cover [transform:translateZ(0)]"
      >
        {shouldLoad ? (
          <>
            <source src="/about/lightning-performance.webm" type="video/webm" />
            <source src="/about/lightning-performance.mp4" type="video/mp4" />
          </>
        ) : null}
      </video>
    </div>
  );
}
