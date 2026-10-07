import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, X } from 'lucide-react';

interface CelebrationOverlayProps {
  active: boolean;
  onDismiss: () => void;
  herName: string;
}

interface ConfettiPiece {
  id: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
  size: number;
  shape: 'heart' | 'petal' | 'star';
}

const CONFETTI_PIECES: ConfettiPiece[] = Array.from({ length: 34 }).map((_, idx) => {
  const colors = ['#DB2777', '#F472B6', '#C084FC', '#FBBF24', '#FB7185', '#A78BFA'];
  const shapes: ('heart' | 'petal' | 'star')[] = ['heart', 'petal', 'star'];
  return {
    id: idx,
    left: `${(idx * 2.9 + 3) % 96}%`,
    delay: `${(idx % 9) * 0.28}s`,
    duration: `${4.5 + (idx % 5) * 0.75}s`,
    color: colors[idx % colors.length],
    size: 14 + (idx % 4) * 4,
    shape: shapes[idx % shapes.length],
  };
});

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({
  active,
  onDismiss,
  herName,
}) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (active) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [active]);

  if (!active) return null;

  return (
    <>
      {/* Gentle falling celebratory hearts and petals */}
      <div
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        aria-hidden="true"
      >
        {CONFETTI_PIECES.map((piece) => (
          <div
            key={piece.id}
            className="absolute top-0 animate-celebration-fall"
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
            }}
          >
            {piece.shape === 'heart' && (
              <svg
                width={piece.size}
                height={piece.size}
                viewBox="0 0 24 24"
                fill={piece.color}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
            {piece.shape === 'petal' && (
              <svg
                width={piece.size}
                height={piece.size}
                viewBox="0 0 24 24"
                fill={piece.color}
              >
                <path d="M12 2C8 6 6 11 8 16C9.5 19.5 12 22 12 22C12 22 14.5 19.5 16 16C18 11 16 6 12 2Z" />
              </svg>
            )}
            {piece.shape === 'star' && (
              <svg
                width={piece.size}
                height={piece.size}
                viewBox="0 0 24 24"
                fill={piece.color}
              >
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Celebratory Birthday Toast Modal */}
      {showBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2224]/35 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-[#FFFDFB] border border-[#FBCFE8] p-6 sm:p-8 text-center shadow-xl">
            <button
              type="button"
              onClick={() => {
                setShowBanner(false);
                onDismiss();
              }}
              aria-label="Close celebration card"
              className="absolute top-4 right-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-[#7A6368] hover:text-[#2D2224] hover:bg-[#FCE7F3]/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#FCE7F3] flex items-center justify-center text-[#BE185D]">
              <Sparkles className="w-7 h-7" />
            </div>

            <p className="text-xs text-[#7A6368] mb-2">
              October 8, 2026 · 12:00 AM IST
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#2D2224] mb-3">
              Happy Birthday, {herName}!
            </h2>
            <p className="text-sm sm:text-base text-[#5C474C] leading-relaxed mb-6">
              The clock has struck midnight and your birthday scrapbook is officially open. Every photo, note, and memory inside was made just for you.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowBanner(false);
                onDismiss();
              }}
              className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#BE185D] hover:bg-[#9D174D] text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Explore Your Birthday Scrapbook</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
