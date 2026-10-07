import React, { useState } from 'react';
import { Heart, Camera, Calendar, MapPin, RotateCw } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrapbookPhoto } from '../data/scrapbookData';

interface PhotoGalleryProps {
  photos: ScrapbookPhoto[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  // Strictly display our 5 photos
  const fivePhotos = photos.slice(0, 5);

  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [brokenImageIds, setBrokenImageIds] = useState<Record<string, boolean>>({});
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({
    'photo-1': true,
    'photo-2': true,
  });

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="memories" className="py-12 sm:py-16 scroll-mt-8">
      {/* Animated Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 text-center sm:text-left"
      >
        <p className="text-xs text-[#7A6368] mb-2">
          5 Favorite Moments · Interactive Memory Cards
        </p>
        <h2 className="text-2xl sm:text-4xl font-semibold text-[#2D2224]">
          Our Photo Memories
        </h2>
        <p className="text-sm sm:text-base text-[#5C474C] mt-2 max-w-xl mx-auto sm:mx-0">
          Tap any photo card to flip it.
        </p>
      </motion.div>

      {/* 5-Photo Responsive 3D Flip Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {fivePhotos.map((photo, index) => {
          const isWide = index === 0;
          const isFlipped = !!flippedIds[photo.id];
          const isLiked = !!likedIds[photo.id];
          const isBroken = !!brokenImageIds[photo.id];

          return (
            <motion.article
              key={photo.id}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.65,
                delay: (index % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`flip-card-perspective ${
                isWide
                  ? 'sm:col-span-2 h-[340px] sm:h-[400px]'
                  : 'h-[340px] sm:h-[380px]'
              }`}
            >
              <div
                onClick={() => toggleFlip(photo.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFlip(photo.id);
                  }
                }}
                aria-label={`${photo.title}. Tap to flip card.`}
                className={`flip-card-inner cursor-pointer select-none ${
                  isFlipped ? 'is-flipped' : ''
                }`}
              >
                {/* ================= FRONT FACE: PHOTO CARD ================= */}
                <div className="flip-card-face rounded-3xl bg-white border border-[#EFE2E7] shadow-xs overflow-hidden flex flex-col">
                  {/* Photo Area */}
                  <div className="relative flex-1 w-full overflow-hidden bg-[#FFF5F7]">
                    {!isBroken ? (
                      <img
                        src={photo.src}
                        alt={photo.title}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setBrokenImageIds((prev) => ({
                            ...prev,
                            [photo.id]: true,
                          }))
                        }
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FCE7F3] via-[#F3E8FF] to-[#FEF9C3]">
                        <Camera className="w-8 h-8 text-[#BE185D] mb-2" />
                        <p className="font-serif-display text-sm font-semibold text-[#2D2224]">
                          {photo.title}
                        </p>
                      </div>
                    )}

                    {/* Subtle Corner Flip Indicator Icon */}
                    <div
                      className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-[#FFFDFB]/90 border border-[#FBCFE8] text-[#9D174D] flex items-center justify-center shadow-xs"
                      title="Flip card"
                    >
                      <RotateCw className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Clean Bottom Card Bar */}
                  <div className="px-5 py-3.5 bg-white border-t border-[#F5EBF0] flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#7A6368] mb-0.5">
                        <span>{photo.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{photo.location}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#2D2224] truncate">
                        {photo.title}
                      </h3>
                    </div>

                    {/* Touch-Friendly Favorite Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLikedIds((prev) => ({
                          ...prev,
                          [photo.id]: !prev[photo.id],
                        }));
                      }}
                      aria-label={
                        isLiked
                          ? 'Remove from favorites'
                          : 'Mark as favorite memory'
                      }
                      className={`min-h-[42px] min-w-[42px] shrink-0 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        isLiked
                          ? 'bg-[#FCE7F3] text-[#BE185D]'
                          : 'bg-[#FDFBF9] text-[#7A6368] hover:bg-[#FCE7F3]/50'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* ================= BACK FACE: PHOTO DESCRIPTION & STORY ================= */}
                <div className="flip-card-face flip-card-back rounded-3xl bg-[#FFFDFB] border-2 border-[#FBCFE8] p-6 sm:p-8 shadow-sm flex flex-col justify-between overflow-y-auto">
                  <div>
                    {/* Top Metadata & Flip Back Icon */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#F3E1E8] text-xs text-[#7A6368]">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#BE185D]" />
                        <span>{photo.date}</span>
                        <span aria-hidden="true">·</span>
                        <MapPin className="w-3.5 h-3.5 text-[#BE185D]" />
                        <span>{photo.location}</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[#BE185D] font-medium shrink-0">
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Flip</span>
                      </span>
                    </div>

                    {/* Card Back Title & Caption */}
                    <h3 className="text-lg sm:text-xl font-semibold text-[#2D2224] mb-2">
                      {photo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7A6368] mb-4 leading-relaxed">
                      {photo.caption}
                    </p>

                    {/* Full Handwritten Story Description */}
                    <div className="rounded-2xl bg-[#FFF5F7] border border-[#FBCFE8] p-4">
                      <p className="font-serif-display italic text-sm sm:text-base text-[#2D2224] leading-relaxed">
                        “{photo.storyNote}”
                      </p>
                    </div>
                  </div>

                  {/* Subtle Footer Line on Back of Card */}
                  <div className="pt-3 flex items-center justify-between text-xs text-[#9D174D]">
                    <span>Happy 18th Birthday</span>
                    <Heart className="w-3.5 h-3.5 fill-current text-[#F472B6]" />
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
