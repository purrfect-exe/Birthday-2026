import React from 'react';
import { Clock, Heart } from 'lucide-react';

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

interface UnlockGateProps {
  countdown: CountdownValues;
  herName: string;
}

export const UnlockGate: React.FC<UnlockGateProps> = ({
  countdown,
  herName,
}) => {
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 relative z-10">
      <div className="w-full max-w-2xl rounded-3xl bg-[#FFFDFB]/95 border border-[#FBCFE8] p-6 sm:p-10 shadow-sm relative">
        {/* Decorative Washi Tape on Top */}
        <div
          className="washi-tape-pink w-32 h-7 mx-auto -mt-9 sm:-mt-13 mb-6 rounded-xs transform -rotate-2"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs text-[#7A6368] mb-2">
            Birthday Surprise · Unlocks October 8, 2026 at 12:00 AM IST
          </p>

          <h1 className="text-3xl sm:text-5xl font-semibold text-[#2D2224] leading-tight">
            Counting Down for{' '}
            <span className="italic text-[#BE185D]">{herName}</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#5C474C] max-w-md mx-auto leading-relaxed">
            Your special 18th birthday surprise will open automatically the exact moment the clock strikes midnight on October 8th!
          </p>
        </div>

        {/* Live Countdown Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] p-4 text-center">
              <div className="font-mono-timer text-3xl sm:text-4xl font-semibold text-[#9D174D]">
                {pad(countdown.days)}
              </div>
              <div className="text-xs text-[#7A6368] mt-1">Days</div>
            </div>

            <div className="rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] p-4 text-center">
              <div className="font-mono-timer text-3xl sm:text-4xl font-semibold text-[#9D174D]">
                {pad(countdown.hours)}
              </div>
              <div className="text-xs text-[#7A6368] mt-1">Hours</div>
            </div>

            <div className="rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] p-4 text-center">
              <div className="font-mono-timer text-3xl sm:text-4xl font-semibold text-[#9D174D]">
                {pad(countdown.minutes)}
              </div>
              <div className="text-xs text-[#7A6368] mt-1">Minutes</div>
            </div>

            <div className="rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] p-4 text-center">
              <div className="font-mono-timer text-3xl sm:text-4xl font-semibold text-[#BE185D]">
                {pad(countdown.seconds)}
              </div>
              <div className="text-xs text-[#7A6368] mt-1">Seconds</div>
            </div>
          </div>
        </div>

        {/* Romantic Waiting Note */}
        <div className="pt-6 border-t border-[#F5EBF0] text-center">
          <div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-serif-display italic text-[#9D174D]">
            <Heart className="w-4 h-4 fill-current text-[#F472B6] animate-heart-bob" />
            <span>Every second brings us closer to your special day</span>
            <Heart
              className="w-4 h-4 fill-current text-[#F472B6] animate-heart-bob"
              style={{ animationDelay: '-1.4s' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
