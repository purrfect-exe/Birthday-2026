import React from 'react';

interface FloatingElement {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  type: 'heart' | 'petal' | 'sparkle' | 'star';
  color: string;
}

// Lightweight set of 8 slow-drifting SVG items for smooth 60fps on low-end mobile devices
const FLOATING_ITEMS: FloatingElement[] = [
  { id: 1, left: '8%', size: 17, duration: '26s', delay: '0s', type: 'heart', color: '#F472B6' },
  { id: 2, left: '20%', size: 14, duration: '31s', delay: '-6s', type: 'petal', color: '#F9A8D4' },
  { id: 3, left: '34%', size: 18, duration: '28s', delay: '-14s', type: 'sparkle', color: '#C084FC' },
  { id: 4, left: '48%', size: 15, duration: '33s', delay: '-4s', type: 'heart', color: '#FB7185' },
  { id: 5, left: '62%', size: 16, duration: '29s', delay: '-19s', type: 'star', color: '#FBBF24' },
  { id: 6, left: '75%', size: 18, duration: '32s', delay: '-9s', type: 'heart', color: '#F472B6' },
  { id: 7, left: '86%', size: 15, duration: '27s', delay: '-16s', type: 'petal', color: '#E879F9' },
  { id: 8, left: '93%', size: 16, duration: '30s', delay: '-11s', type: 'sparkle', color: '#F472B6' },
];

export const FloatingBackground: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Slow drifting cute hand-drawn hearts, blossom petals, and stars (pure transform + opacity) */}
      {FLOATING_ITEMS.map((item) => (
        <div
          key={item.id}
          className="absolute top-0 animate-drift-up"
          style={{
            left: item.left,
            animationDuration: item.duration,
            animationDelay: item.delay,
          }}
        >
          {item.type === 'heart' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill={item.color}
              fillOpacity="0.45"
              stroke={item.color}
              strokeWidth="1.5"
              strokeOpacity="0.65"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {item.type === 'petal' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill={item.color}
              fillOpacity="0.5"
            >
              <path d="M12 2C8 6 6 11 8 16C9.5 19.5 12 22 12 22C12 22 14.5 19.5 16 16C18 11 16 6 12 2Z" />
            </svg>
          )}
          {item.type === 'sparkle' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill={item.color}
              fillOpacity="0.55"
            >
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
            </svg>
          )}
          {item.type === 'star' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill={item.color}
              fillOpacity="0.55"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
