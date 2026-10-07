import photo1Src from '../assets/images/1.jpg';
import photo2Src from '../assets/images/2.jpg';
import photo3Src from '../assets/images/3.jpg';
import photo4Src from '../assets/images/4.jpg';
import photo5Src from '../assets/images/5.jpg';

export interface ScrapbookPhoto {
  id: string;
  title: string;
  caption: string;
  date: string;
  location: string;
  src: string;
  aspect: '16:9' | '4:3' | '3:4' | '1:1';
  rotation: string;
  tapeStyle: 'pink' | 'lavender' | 'butter';
  storyNote: string;
}

export interface TimedLyricLine {
  startTime: number; // in seconds
  endTime: number;   // in seconds
  text: string;
}

// ============================================================================
// WEBSITE CONFIGURATION (EDIT THESE VALUES DIRECTLY IN CODE)
// ============================================================================

// 1. Set ENABLE_COUNTDOWN_LOCK to false while editing the website,
//    and set it to true when you are ready for the October 8, 2026 countdown lock!
export const ENABLE_COUNTDOWN_LOCK: boolean = true;

// 2. Target Birthday Unlock: October 8, 2026 at 12:00 AM IST (UTC+05:30)
export const TARGET_BIRTHDAY_ISO = '2026-10-08T00:00:00+05:30';
export const TARGET_BIRTHDAY_MS = new Date(TARGET_BIRTHDAY_ISO).getTime();

// 3. Her Name / Title used in the birthday greeting
export const HER_NAME = 'Coral';

// 4. Special Local Video Memory Configuration (Place your video file at /src/assets/images/video.mp4 or update src)
export const SPECIAL_VIDEO = {
  src: 'https://videotourl.com/videos/1791358581656-473fec19-c83e-48d5-9fe7-ee6a18e1b378.mp4',
  poster: 'https://thumbs.dreamstime.com/b/bit-pixel-art-animation-cute-couple-walking-hand-hand-bit-pixel-art-animation-cute-couple-walking-hand-hand-along-314626988.jpg',
  title: 'A Little Video by Me',
  subtitle: 'Hope you like it...',
  note: "Fights can't make me stop from doing things for you <3",
};

// 5. YouTube song ID for "blue" by yung kai (https://www.youtube.com/watch?v=IpFX2vq8HKw)
export const YOUTUBE_SONG_ID = 'IpFX2vq8HKw';

// 6. Exact LRC Synchronized Lyrics for "blue" by yung kai (IpFX2vq8HKw)
export const TIMED_LYRICS: TimedLyricLine[] = [
  { startTime: 0.5, endTime: 5.1, text: 'Hello my birthday girl!' },
  { startTime: 5.3, endTime: 10.1, text: 'Raise the volume or use headphones' },
  { startTime: 10.3, endTime: 14.1, text: '♪ I would like to dedicate this song to you ♪' },
  { startTime: 14.3, endTime: 19.1, text: '♪ I love you my Cherry ♪' },
  { startTime: 19.3, endTime: 25.9, text: 'Your morning eyes, I could stare like watching stars' },
  { startTime: 26.0, endTime: 33.1, text: "I could walk you by, and I'll tell without a thought" },
  { startTime: 33.2, endTime: 40.2, text: "You'd be mine, would you mind if I took your hand tonight?" },
  { startTime: 40.3, endTime: 48.0, text: "Know you're all that I want this life" },
  { startTime: 48.2, endTime: 51.0, text: "I'll imagine we fell in love" },
  { startTime: 51.1, endTime: 54.4, text: "I'll nap under moonlight skies with you" },
  { startTime: 54.5, endTime: 58.3, text: "I think I'll picture us, you with the waves" },
  { startTime: 58.4, endTime: 62.2, text: "The ocean's colors on your face" },
  { startTime: 62.3, endTime: 66.2, text: "I'll leave my heart with your air" },
  { startTime: 66.3, endTime: 69.7, text: 'So let me fly with you' },
  { startTime: 69.8, endTime: 77.5, text: 'Will you be forever with me, My Coral?' },
  { startTime: 107.0, endTime: 112.9, text: 'My love will always stay by you' },
  { startTime: 113.0, endTime: 117.6, text: "I'll keep it safe, so don't you worry a thing budhhu" },
  { startTime: 117.7, endTime: 121.7, text: "I'll tell you I love you more" },
  { startTime: 121.8, endTime: 128.5, text: "It's stuck with you forever, so promise you won't let it go" },
  { startTime: 128.6, endTime: 136.7, text: "I'll trust the universe will always bring me to you" },
  { startTime: 136.8, endTime: 139.6, text: "I'll imagine we fell in love" },
  { startTime: 139.7, endTime: 143.0, text: "I'll nap under moonlight skies with you" },
  { startTime: 143.1, endTime: 146.9, text: "I think I'll picture us, you with the waves" },
  { startTime: 147.0, endTime: 150.8, text: "The ocean's colors on your face" },
  { startTime: 150.9, endTime: 154.8, text: "I'll leave my heart with your air" },
  { startTime: 154.9, endTime: 158.3, text: 'So let me fly with you' },
  { startTime: 158.4, endTime: 168.0, text: 'Will you be forever with me, my wife?' },
  { startTime: 168.4, endTime: 208.0, text: 'Happy Birthday Once Again!' },
];

// 7. The 5 Scrapbook Photos (Replace `src`, `title`, `caption`, `date`, `location`, and `storyNote` here)
export const SCRAPBOOK_PHOTOS: ScrapbookPhoto[] = [
  {
    id: 'photo-1',
    title: 'Golden Hour With You By My Side',
    caption: 'The feeling of my open and stress-free mind starts with your presence.',
    date: 'Memory 01',
    location: 'INA Metro Station',
    src: photo1Src,
    aspect: '16:9',
    rotation: '-rotate-1',
    tapeStyle: 'pink',
    storyNote:
      'I remember us recordin this video where I faked sleep by putting my head on your shoulder. I love it when your eyes are always on me no matter in what position I am in!',
  },
  {
    id: 'photo-2',
    title: 'Gifts 4 Me & Us 2gether',
    caption: 'You, Me & Our first meal together in a fancy restaurant.',
    date: 'Memory 02',
    location: "McDonald's, South Extension",
    src: photo2Src,
    aspect: '4:3',
    rotation: 'rotate-1',
    tapeStyle: 'butter',
    storyNote:
      'One of the most unique gifts that you have given to me and inspired me by giving me more ideas on how to appreciate your efforts in more different ways. Always blessed to have your mind dedicated to me and always grateful to have you by my side in every meal, achievement or random incident.',
  },
  {
    id: 'photo-3',
    title: 'One And Beloved Forever',
    caption: 'Wrapping in multiple blankets of affection, is what I pursue the most.',
    date: 'Memory 03',
    location: 'Your house',
    src: photo3Src,
    aspect: '3:4',
    rotation: '-rotate-2',
    tapeStyle: 'lavender',
    storyNote:
      'Felt like a fairy visited my gallery and this picture caught my most attention back in 2023. Everything in your is far above perfect!',
  },
  {
    id: 'photo-4',
    title: 'Picking You Up, High Above',
    caption: 'Making sure that you reach to the moon and the starts and all above everyone else.',
    date: 'Memory 04',
    location: 'INA Metro Station',
    src: photo4Src,
    aspect: '1:1',
    rotation: 'rotate-2',
    tapeStyle: 'pink',
    storyNote:
      'Best day of my life where I got to hug you tightly and pick you up high enough like a little baby. The blush on your face made my heart skip two or more beats that day.',
  },
  {
    id: 'photo-5',
    title: 'Kssing My Little Boss Lady',
    caption: "Me at my Queen's Command, Law & Order",
    date: 'Memory 05',
    location: 'INA Metro Station',
    src: photo5Src,
    aspect: '4:3',
    rotation: '-rotate-1',
    tapeStyle: 'butter',
    storyNote:
      'One of the sweetest and the most precious photo that I wanna adore the mosts. This photo was taken when you were coming back from a meeting, dressed like a cute boss while I was your employee. That day, the employee kissed his sweetest boss.',
  },
];
