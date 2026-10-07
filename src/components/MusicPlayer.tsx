import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, Heart } from 'lucide-react';
import { YOUTUBE_SONG_ID, TIMED_LYRICS, TimedLyricLine } from '../data/scrapbookData';

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
          };
        }
      ) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  unMute: () => void;
  getCurrentTime: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}

interface MusicPlayerProps {
  externalPaused?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  externalPaused = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [activeLine, setActiveLine] = useState<TimedLyricLine | null>(
    TIMED_LYRICS[0] || null
  );

  const playerRef = useRef<YTPlayerInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const externalPausedRef = useRef<boolean>(externalPaused);
  const shouldResumeAfterVideoRef = useRef<boolean>(true);

  useEffect(() => {
    externalPausedRef.current = externalPaused;
  }, [externalPaused]);

  const tryPlay = useCallback(() => {
    const player = playerRef.current;
    if (!player || externalPausedRef.current) return;
    try {
      player.unMute();
      player.setVolume(85);
      player.playVideo();
    } catch {
      // ignore autoplay block until user gesture
    }
  }, []);

  // Automatically pause background music when the video starts playing,
  // and resume background music when the video pauses or finishes!
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !isReady) return;

    if (externalPaused) {
      let currentlyPlaying = isPlaying;
      try {
        if (typeof player.getPlayerState === 'function') {
          currentlyPlaying = player.getPlayerState() === 1 || isPlaying;
        }
      } catch {
        // fallback to state
      }
      // Remember to resume if music was playing (or if user hadn't explicitly paused it)
      shouldResumeAfterVideoRef.current = currentlyPlaying || shouldResumeAfterVideoRef.current;
      try {
        player.pauseVideo();
        setIsPlaying(false);
      } catch {
        // ignore
      }
    } else {
      if (shouldResumeAfterVideoRef.current) {
        try {
          player.unMute();
          player.setVolume(85);
          player.playVideo();
        } catch {
          // ignore
        }
      }
    }
  }, [externalPaused, isReady]);

  // Initialize YouTube IFrame Player for https://www.youtube.com/watch?v=IpFX2vq8HKw
  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (!isMounted || !window.YT || !window.YT.Player || !containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: YOUTUBE_SONG_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: YOUTUBE_SONG_ID,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            if (!isMounted) return;
            setIsReady(true);
            if (!externalPausedRef.current) {
              try {
                event.target.unMute();
                event.target.setVolume(85);
                event.target.playVideo();
              } catch {
                // ignore initial autoplay restriction
              }
            }
          },
          onStateChange: (event) => {
            if (!isMounted) return;
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (event.data === 1) {
              if (externalPausedRef.current) {
                event.target.pauseVideo();
                setIsPlaying(false);
              } else {
                setIsPlaying(true);
              }
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              if (!externalPausedRef.current) {
                event.target.playVideo();
              }
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const existingScript = document.getElementById('youtube-iframe-js-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-js-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    return () => {
      isMounted = false;
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // Start playback automatically on first interaction if browser policy blocked initial autoplay
  useEffect(() => {
    if (!isReady || isPlaying || externalPaused) return;

    const handleUserGesture = () => {
      if (!externalPausedRef.current) {
        tryPlay();
      }
    };

    window.addEventListener('pointerdown', handleUserGesture, { once: true });
    window.addEventListener('touchstart', handleUserGesture, { once: true });
    window.addEventListener('keydown', handleUserGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
    };
  }, [isReady, isPlaying, externalPaused, tryPlay]);

  // Low-overhead check (200ms) that ONLY triggers a state update when the lyric line changes
  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      const player = playerRef.current;
      if (player && typeof player.getCurrentTime === 'function') {
        const t = player.getCurrentTime();
        if (typeof t === 'number' && !Number.isNaN(t)) {
          const matched =
            TIMED_LYRICS.find((line) => t >= line.startTime && t <= line.endTime) || null;
          setActiveLine((prev) =>
            prev?.startTime === matched?.startTime ? prev : matched
          );
        }
      }
    }, 200);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const togglePlayPause = () => {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      shouldResumeAfterVideoRef.current = false;
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      shouldResumeAfterVideoRef.current = true;
      tryPlay();
    }
  };

  // Render floating dock via Portal directly into document.body
  const floatingDock = (
    <>
      {/* Hidden YouTube Player Container */}
      <div className="sr-only pointer-events-none w-0 h-0 overflow-hidden" aria-hidden="true">
        <div ref={containerRef} />
      </div>

      {/* Unified Responsive Floating Bottom Bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 pointer-events-none px-3 sm:px-6 pb-[calc(env(safe-area-inset-bottom,0px)+14px)] pt-2 flex items-end justify-between sm:justify-center gap-2.5"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {/* Left/Center Slot: Cutesy Scrapbook Lyric Pill */}
        <div className="flex-1 sm:flex-initial flex justify-start sm:justify-center min-w-0">
          {externalPaused ? (
            <div className="animate-lyric-cutesy relative rounded-2xl bg-[#FFFDFB]/95 border-2 border-[#FBCFE8] px-3.5 py-2 sm:px-4 sm:py-2 shadow-md flex items-center gap-2">
              <Heart
                className="w-3.5 h-3.5 text-[#F472B6] fill-current shrink-0 animate-heart-bob"
                aria-hidden="true"
              />
              <span className="font-serif-display italic text-xs sm:text-sm text-[#9D174D]">
                Music paused while watching video ♥
              </span>
            </div>
          ) : isPlaying && activeLine ? (
            <div
              key={activeLine.startTime}
              aria-live="polite"
              className="animate-lyric-cutesy relative w-full sm:w-auto max-w-[calc(100vw-5.25rem)] sm:max-w-lg rounded-2xl bg-[#FFFDFB]/95 border-2 border-[#FBCFE8] px-3.5 py-2 sm:px-5 sm:py-2.5 shadow-md text-center flex items-center justify-center gap-2"
            >
              {/* Tiny pastel washi tape strip on top of the lyric note */}
              <div
                className="washi-tape-pink w-12 sm:w-14 h-2.5 sm:h-3 absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 rounded-xs"
                aria-hidden="true"
              />

              <Heart
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F472B6] fill-current shrink-0 animate-heart-bob"
                aria-hidden="true"
              />

              <p className="font-serif-display italic text-xs sm:text-base text-[#9D174D] leading-snug break-words line-clamp-2">
                {activeLine.text}
              </p>

              <Heart
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F472B6] fill-current shrink-0 animate-heart-bob"
                style={{ animationDelay: '-1.4s' }}
                aria-hidden="true"
              />
            </div>
          ) : !isPlaying ? (
            <button
              type="button"
              onClick={togglePlayPause}
              className="pointer-events-auto animate-lyric-cutesy relative rounded-2xl bg-[#FFFDFB]/95 border-2 border-[#FBCFE8] px-3.5 py-2 sm:px-4 sm:py-2 shadow-md flex items-center gap-2 text-left cursor-pointer"
            >
              <Heart
                className="w-3.5 h-3.5 text-[#BE185D] fill-current shrink-0 animate-heart-bob"
                aria-hidden="true"
              />
              <span className="font-serif-display italic text-xs sm:text-sm text-[#9D174D]">
                Tap to play our song ♪
              </span>
            </button>
          ) : null}
        </div>

        {/* Right Slot: Circled Play / Pause Floating Button */}
        <button
          type="button"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          title={isPlaying ? 'Pause music' : 'Play music'}
          className="pointer-events-auto sm:fixed sm:bottom-5 sm:right-5 shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#BE185D] hover:bg-[#9D174D] text-white shadow-lg border-2 border-[#FCE7F3] flex items-center justify-center transition-transform duration-150 active:scale-95 cursor-pointer"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          ) : (
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
          )}
        </button>
      </div>
    </>
  );

  if (typeof document === 'undefined') {
    return floatingDock;
  }

  return createPortal(floatingDock, document.body);
};
