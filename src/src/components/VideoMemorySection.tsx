import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Heart,
} from 'lucide-react';
import { motion } from 'motion/react';
import { SPECIAL_VIDEO } from '../data/scrapbookData';

interface VideoMemorySectionProps {
  onVideoPlaybackChange: (isPlaying: boolean) => void;
}

export const VideoMemorySection: React.FC<VideoMemorySectionProps> = ({
  onVideoPlaybackChange,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoError, setVideoError] = useState<boolean>(false);

  const formatTime = (sec: number) => {
    if (!Number.isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    const vid = videoRef.current;
    if (!vid || videoError) return;
    if (vid.paused || vid.ended) {
      vid.play().catch(() => {
        setVideoError(true);
      });
    } else {
      vid.pause();
    }
  };

  const handleRestart = () => {
    const vid = videoRef.current;
    if (!vid || videoError) return;
    vid.currentTime = 0;
    vid.play().catch(() => {});
  };

  const handleToggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const handleFullscreen = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.requestFullscreen) {
      vid.requestFullscreen().catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = videoRef.current;
    const nextPct = Number(e.target.value);
    setProgress(nextPct);
    if (vid && duration > 0) {
      vid.currentTime = (nextPct / 100) * duration;
    }
  };

  return (
    <section
      id="video-memory"
      className="py-12 sm:py-16 border-t border-[#F3E1E8] relative"
    >
      {/* Doodle-Animated Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 26, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ type: 'spring', stiffness: 180, damping: 16 }}
        className="max-w-2xl mx-auto text-center mb-8 sm:mb-10 relative"
      >
        <div className="inline-flex items-center gap-2 text-xs text-[#BE185D] font-medium mb-2">
          {/* Hand-drawn Crown / Sparkle Doodle */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 28 28"
            fill="none"
            className="animate-doodle-wiggle text-[#BE185D]"
            aria-hidden="true"
          >
            <path
              d="M4 20L6 9L11.5 14.5L14 7L16.5 14.5L22 9L24 20H4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#FCE7F3"
            />
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="animate-doodle-spin text-[#F472B6]"
            aria-hidden="true"
          >
            <path
              d="M12 2.5L14.2 8.8L20.5 9.4L15.6 13.5L17.2 19.8L12 16.3L6.8 19.8L8.4 13.5L3.5 9.4L9.8 8.8L12 2.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#FEF9C3"
            />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-4xl font-semibold text-[#2D2224] relative inline-block">
          {SPECIAL_VIDEO.title}
          {/* Hand-drawn squiggly underline SVG */}
          <svg
            viewBox="0 0 240 14"
            fill="none"
            className="w-48 sm:w-64 h-3.5 mx-auto mt-1 text-[#F472B6]"
            aria-hidden="true"
          >
            <motion.path
              d="M4 9C38 3 72 13 108 7C144 1 178 12 214 6C224 4.5 231 7 236 8"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
            />
          </svg>
        </h2>

        <p className="text-sm sm:text-base text-[#5C474C] mt-2 max-w-lg mx-auto leading-relaxed">
          {SPECIAL_VIDEO.subtitle}
        </p>
      </motion.div>

      {/* Hand-Sketched Doodle Video Frame Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, rotate: -1.5, y: 28 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          type: 'spring',
          stiffness: 160,
          damping: 15,
          delay: 0.1,
        }}
        className="max-w-3xl mx-auto relative px-2 sm:px-4"
      >
        {/* Floating Hand-Drawn Doodle Stickers Around the Video Frame */}
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="w-9 h-9 sm:w-12 sm:h-12 absolute -top-4 -left-1 sm:-left-3 z-20 animate-doodle-wiggle pointer-events-none"
          aria-hidden="true"
        >
          <path
            d="M24 41C24 41 7 29.5 7 17.5C7 11.5 11.8 7 17.5 7C20.9 7 23.9 8.7 25.5 11.3C27.1 8.7 30.1 7 33.5 7C39.2 7 44 11.5 44 17.5C44 29.5 24 41 24 41Z"
            fill="#FCE7F3"
            stroke="#BE185D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="w-9 h-9 sm:w-11 sm:h-11 absolute -top-4 -right-1 sm:-right-3 z-20 animate-doodle-spin pointer-events-none"
          aria-hidden="true"
        >
          <path
            d="M24 6L28.5 18.5L41 21L30.5 29L33.5 41.5L24 34L14.5 41.5L17.5 29L7 21L19.5 18.5L24 6Z"
            fill="#FEF08A"
            stroke="#B45309"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <svg
          viewBox="0 0 60 60"
          fill="none"
          className="w-10 h-10 sm:w-12 sm:h-12 absolute -bottom-5 -left-1 sm:-left-3 z-20 animate-doodle-spin pointer-events-none"
          style={{ animationDelay: '-1.8s' }}
          aria-hidden="true"
        >
          <path
            d="M12 44C18 32 30 28 45 30M45 30L37 23M45 30L38 38"
            stroke="#9D174D"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Outer Sketchbook Card with Hand-Drawn Dashed Double Border */}
        <div className="rounded-[28px] bg-[#FFFDFB] border-2 border-dashed border-[#F472B6] p-3 sm:p-5 shadow-sm relative">
          {/* Inner Solid Frame */}
          <div className="rounded-2xl bg-[#FFF5F7] border-2 border-[#2D2224]/85 overflow-hidden">
            {/* Video Canvas / Placeholder */}
            <div className="relative aspect-16/9 w-full bg-[#2D2224] flex items-center justify-center overflow-hidden">
              {!videoError ? (
                <>
                  <video
                    ref={videoRef}
                    src={SPECIAL_VIDEO.src}
                    poster={SPECIAL_VIDEO.poster}
                    playsInline
                    preload="metadata"
                    onPlay={() => {
                      setIsPlaying(true);
                      onVideoPlaybackChange(true);
                    }}
                    onPause={() => {
                      setIsPlaying(false);
                      onVideoPlaybackChange(false);
                    }}
                    onEnded={() => {
                      setIsPlaying(false);
                      onVideoPlaybackChange(false);
                    }}
                    onTimeUpdate={() => {
                      const vid = videoRef.current;
                      if (!vid) return;
                      setCurrentTime(vid.currentTime);
                      if (vid.duration > 0) {
                        setProgress((vid.currentTime / vid.duration) * 100);
                      }
                    }}
                    onLoadedMetadata={() => {
                      const vid = videoRef.current;
                      if (vid && Number.isFinite(vid.duration)) {
                        setDuration(vid.duration);
                      }
                    }}
                    onError={() => {
                      setVideoError(true);
                      setIsPlaying(false);
                      onVideoPlaybackChange(false);
                    }}
                    onClick={handleTogglePlay}
                    className="w-full h-full object-contain cursor-pointer"
                  />

                  {/* Big Cutesy Doodle Play Overlay Button when Paused */}
                  {!isPlaying && (
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      aria-label="Play video memory"
                      className="absolute inset-0 bg-[#2D2224]/30 hover:bg-[#2D2224]/40 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer group"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFDFB] border-2 border-[#2D2224] shadow-md flex items-center justify-center text-[#BE185D] transition-transform duration-200 group-hover:scale-105">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-[#FFFDFB]/95 border border-[#FBCFE8] font-serif-display italic text-xs sm:text-sm text-[#9D174D] shadow-xs">
                        Tap to play the video
                      </span>
                    </button>
                  )}
                </>
              ) : (
                /* Friendly Doodle Placeholder When Local Video File Is Not Uploaded Yet */
                <div className="w-full h-full bg-gradient-to-br from-[#FFF5F7] via-[#FCE7F3] to-[#FEF9C3] p-6 text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFFDFB] border-2 border-dashed border-[#BE185D] flex items-center justify-center text-[#BE185D] mb-3 animate-doodle-wiggle">
                    <Film className="w-7 h-7" />
                  </div>
                  <p className="font-serif-display italic text-lg sm:text-xl font-semibold text-[#2D2224]">
                    Local Video Placeholder Ready!
                  </p>
                  <p className="text-xs sm:text-sm text-[#5C474C] max-w-md mt-1.5 leading-relaxed">
                    Upload your video file to{' '}
                    <code className="px-1.5 py-0.5 rounded bg-white border border-[#FBCFE8] text-[#BE185D] font-mono text-xs">
                      /src/assets/images/video.mp4
                    </code>{' '}
                    (or change <code className="font-mono text-xs">SPECIAL_VIDEO.src</code> in{' '}
                    <code className="font-mono text-xs">scrapbookData.ts</code>).
                  </p>
                </div>
              )}
            </div>

            {/* Custom Doodle-Styled Playback Control Bar */}
            <div className="bg-[#FFFDFB] border-t-2 border-[#2D2224]/80 px-3.5 py-3 sm:px-5 sm:py-3.5 flex flex-col gap-2.5">
              {/* Interactive Scrubber Timeline */}
              <div className="flex items-center gap-2.5">
                <span className="font-mono-timer text-[11px] sm:text-xs text-[#7A6368] w-9 text-right shrink-0">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={handleSeek}
                  disabled={videoError}
                  aria-label="Seek video timeline"
                  className="w-full h-2 rounded-lg appearance-none bg-[#FCE7F3] accent-[#BE185D] cursor-pointer disabled:opacity-50"
                />
                <span className="font-mono-timer text-[11px] sm:text-xs text-[#7A6368] w-9 shrink-0">
                  {formatTime(duration)}
                </span>
              </div>

              {/* Playback Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Play / Pause Button */}
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    disabled={videoError}
                    className="min-h-[40px] px-3.5 sm:px-4 py-1.5 rounded-xl bg-[#BE185D] hover:bg-[#9D174D] disabled:opacity-50 text-white text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current shrink-0" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current shrink-0" />
                        <span>Play Video</span>
                      </>
                    )}
                  </button>

                  {/* Replay / Restart Button */}
                  <button
                    type="button"
                    onClick={handleRestart}
                    disabled={videoError}
                    aria-label="Restart video"
                    title="Restart video"
                    className="min-h-[40px] min-w-[40px] shrink-0 rounded-xl bg-[#FFF5F7] hover:bg-[#FCE7F3] border border-[#FBCFE8] text-[#9D174D] flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  {/* Mute / Unmute Button */}
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    disabled={videoError}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    title={isMuted ? 'Unmute video' : 'Mute video'}
                    className="min-h-[40px] min-w-[40px] shrink-0 rounded-xl bg-[#FFF5F7] hover:bg-[#FCE7F3] border border-[#FBCFE8] text-[#9D174D] flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Right Side Status + Fullscreen */}
                <div className="flex items-center gap-2.5">
                  <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-serif-display italic text-[#7A6368]">
                    <Heart className="w-3.5 h-3.5 text-[#F472B6] fill-current shrink-0" />
                    <span>{SPECIAL_VIDEO.note}</span>
                  </span>

                  <button
                    type="button"
                    onClick={handleFullscreen}
                    disabled={videoError}
                    aria-label="Fullscreen video"
                    title="Fullscreen"
                    className="min-h-[40px] min-w-[40px] shrink-0 rounded-xl bg-[#FFF5F7] hover:bg-[#FCE7F3] border border-[#FBCFE8] text-[#9D174D] flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile-Visible Romantic Video Note */}
              <div className="flex md:hidden items-center justify-center gap-1.5 pt-1 border-t border-[#F5EBF0] text-center">
                <Heart className="w-3 h-3 text-[#F472B6] fill-current shrink-0" />
                <span className="text-xs font-serif-display italic text-[#7A6368] leading-snug">
                  {SPECIAL_VIDEO.note}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
