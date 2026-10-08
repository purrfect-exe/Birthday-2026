import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ENABLE_COUNTDOWN_LOCK,
  HER_NAME,
  SCRAPBOOK_PHOTOS,
  TARGET_BIRTHDAY_MS,
} from './data/scrapbookData';
import { FloatingBackground } from './components/FloatingBackground';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { UnlockGate, CountdownValues } from './components/UnlockGate';
import { PhotoGallery } from './components/PhotoGallery';
import { VideoMemorySection } from './components/VideoMemorySection';
import { MusicPlayer } from './components/MusicPlayer';

function calculateCountdown(targetMs: number): CountdownValues {
  const now = Date.now();
  const diff = targetMs - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isComplete: false };
}

export default function App() {
  const [countdown, setCountdown] = useState<CountdownValues>(() =>
    calculateCountdown(TARGET_BIRTHDAY_MS)
  );
  const [celebrationActive, setCelebrationActive] = useState<boolean>(false);
  const [hasCelebratedOnce, setHasCelebratedOnce] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  // Check countdown every 250ms AND schedule an exact timeout for 12:00 AM October 8, 2026 IST
  // so the website unlocks the exact millisecond midnight IST arrives!
  useEffect(() => {
    const updateCountdown = () => {
      const next = calculateCountdown(TARGET_BIRTHDAY_MS);
      setCountdown((prev) => {
        if (
          prev.days === next.days &&
          prev.hours === next.hours &&
          prev.minutes === next.minutes &&
          prev.seconds === next.seconds &&
          prev.isComplete === next.isComplete
        ) {
          return prev;
        }
        return next;
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 250);

    // Exact millisecond trigger for 12:00 AM IST
    const msUntilUnlock = TARGET_BIRTHDAY_MS - Date.now();
    let exactUnlockTimer: number | undefined;
    if (msUntilUnlock > 0 && msUntilUnlock < 2147483647) {
      exactUnlockTimer = window.setTimeout(() => {
        updateCountdown();
      }, msUntilUnlock);
    }

    return () => {
      window.clearInterval(interval);
      if (exactUnlockTimer !== undefined) {
        window.clearTimeout(exactUnlockTimer);
      }
    };
  }, []);

  // Controlled by ENABLE_COUNTDOWN_LOCK boolean in src/data/scrapbookData.ts
  // When ENABLE_COUNTDOWN_LOCK is true, it unlocks immediately as soon as 12:00 AM on Oct 8 IST hits!
  const isWebsiteUnlocked = !ENABLE_COUNTDOWN_LOCK || countdown.isComplete;

  // Trigger celebratory animation automatically the instant the countdown unlocks
  useEffect(() => {
    if (ENABLE_COUNTDOWN_LOCK && isWebsiteUnlocked && !hasCelebratedOnce) {
      setCelebrationActive(true);
      setHasCelebratedOnce(true);
    }
  }, [isWebsiteUnlocked, hasCelebratedOnce]);

  // Smooth scroll to the #memories photo section
  const handleSmoothScrollToMemories = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const target = document.getElementById('memories');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    []
  );

  // Celebrate & smoothly start over from the top of the webpage
  const handleCelebrateAndStartOver = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCelebrationActive(true);
  }, []);

  return (
    <div className="min-h-screen scrapbook-paper text-[#2D2224] relative selection:bg-[#FCE7F3] selection:text-[#BE185D]">
      {/* Slow, lovely floating hearts, blossom petals, and sparkles in background */}
      <FloatingBackground />

      {/* Celebratory Birthday Confetti & Welcome Modal */}
      <CelebrationOverlay
        active={celebrationActive}
        onDismiss={() => setCelebrationActive(false)}
        herName={HER_NAME}
      />

      {!isWebsiteUnlocked ? (
        <UnlockGate countdown={countdown} herName={HER_NAME} />
      ) : (
        <div className="relative z-10">
          {/* Floating Romantic Background Music Player ("blue" by yung kai) — only mounts & plays after countdown completes */}
          <MusicPlayer externalPaused={isVideoPlaying} />

          {/* Main Container */}
          <main
            id="top"
            className="max-w-[1120px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-28 overflow-x-hidden"
          >
            {/* Centered Romantic Birthday Hero */}
            <section className="max-w-2xl mx-auto text-center pb-12 sm:pb-16 border-b border-[#F3E1E8]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center space-y-5"
              >
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#7A6368]">
                  <span>October 8, 2026</span>
                  <span aria-hidden="true">·</span>
                  <span>Happy 18th Birthday</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-semibold text-[#2D2224] leading-[1.18] tracking-tight break-words">
                  Happy Birthday,{' '}
                  <span className="italic text-[#BE185D]">{HER_NAME}</span>
                </h1>

                <p className="text-sm sm:text-lg text-[#5C474C] leading-relaxed max-w-xl">
                  Every day with you feels like my favorite story in a fairytale. Each chapter of my life starts with you and ends with you, no matter the distance between us. For this 18th birthday, I wanna show you a little website that I created to show my appreciation to our every precious moment that I felt right through in my heart.
                </p>

                {/* Primary Hero Action CTA — Smoothly scrolls to Photo Memories */}
                <div className="pt-2 w-full sm:w-auto flex justify-center">
                  <a
                    href="#memories"
                    onClick={handleSmoothScrollToMemories}
                    className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-xl bg-[#BE185D] hover:bg-[#9D174D] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-current shrink-0" />
                    <span>Explore Our Memories</span>
                  </a>
                </div>

                {/* Personal Love Note Letter Card (Adapts cleanly to any paragraph length on mobile & desktop) */}
                <div className="w-full pt-4 sm:pt-6">
                  <div className="relative rounded-3xl bg-[#FFFDFB] border border-[#FBCFE8] px-5 py-6 sm:px-9 sm:py-8 shadow-xs text-left">
                    {/* Subtle Romantic Letter Header */}
                    <div className="flex items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#F5EBF0]">
                      <span className="font-serif-display italic text-sm sm:text-base text-[#BE185D]">
                        Dearest {HER_NAME},
                      </span>
                      <Heart
                        className="w-4 h-4 text-[#F472B6] fill-current shrink-0 animate-heart-bob"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Write your love note below — supports multiple lines & paragraphs automatically */}
                    <p className="text-sm sm:text-base text-[#4A383C] leading-[1.8] sm:leading-[1.9] whitespace-pre-line break-words">
                     HAPPIEST BIRTHDAY MYY DARLINGG, MY WIFEYY, MY HONEYY, MY SWEETIEE, MY CUTIEE, MY PRINCESS, MY LADYYY, MY QUEEN, MY ONE AND ONLY AND EVERYTHINGGG!!! ❤💞❤💞❤💞❤💞❤💞

Budhhu aapko wish to karke hee jaaunga na. Mai waise surprise karne waala tha, par aap sad baby ho gayi to mujhe rukna pata. Matlab jaana to hai mujhe but maine enough time buy kar liya tha pehle hee. I loveee youuuu the mostttt myyy luckiest and mosttt precious girlfriend. You are my everything, from top to bottom, u are mineeeee. 

Finally aap 18 ki ho gayiiiii!!!!!!!! Btw wo website par mai pehle se kaam kar raha hu to ho sakta hai ki usme kuchh ho jo time ke according thik na baithe. Aur maine countdown bhi lagaya tha website par isliye heee ki exact time par open hooo. 

I just wish youuuu all the luck and pray ki aapko health sabse best raheeee. Aapki saari wishes puri honi chahiye warna mai bhagwaan ji se personally baat karunga 😤😤😤😤😤. 

Btww uuu areee reallyyyy reallyyyyy prettyyyyy 🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈. 

 

Aapki photo dekhta rehta hu har baar aur kho jaata hu ki meri chhoti si baby, jisko mai coru bolta hu, ab 18 years ki ho gayiiii. Bohot weird hai mere liye, I mean amazing way mae. Ofc I will always celebrate your birthday with uuu forever and alwaysss. There's no one who can stop meeeeee. I can do anything for you just to make u smileee. Hu na mai pagal aapke liye~

Hamaari jitni bhi fights ho, end mae I will still and always choose u, no because, no reasons. I need only you than any reasons. You are a pretty soul, human, goddess and angel. No one can be like youuuu. So HAPPY BIRTHDAY TOOO YOUUUUU :DDDDDD 🎉🎉🎉🎉🎉🎉🎉🎉🎉

 

Btw party when 🥺🥺🥺

Mai aapka partner hu to ye matlab nahi mujhe party nahi milegi 😤. Ab chalo ye raha aapka cute sa 🎂. Blow the candlee and ask for your wishhh. I know already shaayad ki kya wish hogiii, and I will try my best to make it come trueeeee. Abki baar ke gifts thode kam hai, I'm sorry :((.

But I really appreciate every atom of u and whatever you do. You are one of an infinity. Thank you for always being there for me, taking care for me and loving me unconditionally. I will always try to show you how much you mean to me and what I really think about you. Ham past to change nahi kar sakte but I want to improve for our future. Thank you once again for all ur trust and affection, I'm very indebted to you forever and always. I LOVEEE YOUUU THE MOSTTTT FOREVER AND ALWAYSSSSS.
                    </p>

                    {/* Subtle Letter Sign-Off */}
                    <div className="pt-4 mt-5 border-t border-[#F5EBF0] flex items-center justify-end">
                      <span className="font-serif-display italic text-xs sm:text-sm text-[#9D174D]">
                        Forever yours ♥
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* 5-Photo 3D Flip Card Gallery */}
            <PhotoGallery photos={SCRAPBOOK_PHOTOS} />

            {/* Doodle-Animated Local Video Memory Section */}
            <VideoMemorySection onVideoPlaybackChange={setIsVideoPlaying} />

            {/* End-of-Page 'Celebrate & Start Over Again' Section */}
            <motion.section
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 sm:mt-12 pt-10 sm:pt-14 border-t border-[#F3E1E8] text-center"
            >
              <div className="max-w-lg mx-auto rounded-3xl bg-[#FFFDFB] border border-[#FBCFE8] p-6 sm:p-10 shadow-xs">
                <p className="text-xs text-[#7A6368] mb-2">
                  October 8, 2026 · Happy 18th Birthday
                </p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#2D2224] mb-3">
                  Relive the Birthday Magic
                </h3>
                <p className="text-sm sm:text-base text-[#5C474C] leading-relaxed mb-6">
                  Tap below to shower the page with birthday confetti and start our journey from the top again.
                </p>

                <button
                  type="button"
                  onClick={handleCelebrateAndStartOver}
                  className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-xl bg-[#BE185D] hover:bg-[#9D174D] text-white font-medium text-sm inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Celebrate & Start Over Again</span>
                  <RotateCcw className="w-3.5 h-3.5 ml-0.5 shrink-0" />
                </button>
              </div>
            </motion.section>
          </main>
        </div>
      )}
    </div>
  );
}
