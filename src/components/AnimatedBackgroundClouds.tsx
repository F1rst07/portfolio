import React from 'react';
import { motion } from 'motion/react';

interface CloudConfig {
  id: string;
  top: string;
  widthClass: string;
  shapeHref: string;
  opacity: number;
  duration: string;
  delay: string;
  reverse?: boolean;
  bobbingType: 'subtle' | 'gentle';
  bobbingDuration: string;
}

interface SparkleConfig {
  id: string;
  top: string;
  left: string;
  char: '✦' | '✧' | '⋆';
  color: string;
  sizeClass: string;
  duration: number;
  delay: number;
  rotationDir: 1 | -1;
  glowColor: string;
}

export const AnimatedBackgroundClouds: React.FC = () => {
  // 14 Staggered Drifting Clouds - เมฆสีขาวบริสุทธิ์ จางนุ่มละมุนตา (Opacity 0.38 - 0.48)
  const driftingClouds: CloudConfig[] = [
    // Top Sky (0% - 20%)
    {
      id: 'drift-1',
      top: '3%',
      widthClass: 'w-64 sm:w-80',
      shapeHref: '#cloud-shape-b',
      opacity: 0.46,
      duration: '26s',
      delay: '-14s',
      bobbingType: 'subtle',
      bobbingDuration: '5.5s',
    },
    {
      id: 'drift-2',
      top: '9%',
      widthClass: 'w-72 sm:w-[420px]',
      shapeHref: '#cloud-shape-a',
      opacity: 0.42,
      duration: '32s',
      delay: '-24s',
      reverse: true,
      bobbingType: 'gentle',
      bobbingDuration: '7s',
    },
    {
      id: 'drift-3',
      top: '16%',
      widthClass: 'w-52 sm:w-68',
      shapeHref: '#cloud-shape-d',
      opacity: 0.40,
      duration: '22s',
      delay: '-6s',
      bobbingType: 'subtle',
      bobbingDuration: '4.8s',
    },

    // Upper-Mid (20% - 40%)
    {
      id: 'drift-4',
      top: '23%',
      widthClass: 'w-80 sm:w-[460px]',
      shapeHref: '#cloud-shape-b',
      opacity: 0.45,
      duration: '34s',
      delay: '-18s',
      bobbingType: 'gentle',
      bobbingDuration: '6.5s',
    },
    {
      id: 'drift-5',
      top: '30%',
      widthClass: 'w-60 sm:w-80',
      shapeHref: '#cloud-shape-c',
      opacity: 0.38,
      duration: '25s',
      delay: '-12s',
      reverse: true,
      bobbingType: 'subtle',
      bobbingDuration: '5.2s',
    },
    {
      id: 'drift-6',
      top: '37%',
      widthClass: 'w-72 sm:w-[390px]',
      shapeHref: '#cloud-shape-a',
      opacity: 0.42,
      duration: '28s',
      delay: '-22s',
      bobbingType: 'gentle',
      bobbingDuration: '6.2s',
    },

    // Mid-Section (40% - 60%)
    {
      id: 'drift-7',
      top: '44%',
      widthClass: 'w-56 sm:w-72',
      shapeHref: '#cloud-shape-d',
      opacity: 0.40,
      duration: '23s',
      delay: '-8s',
      bobbingType: 'subtle',
      bobbingDuration: '5s',
    },
    {
      id: 'drift-8',
      top: '51%',
      widthClass: 'w-80 sm:w-[450px]',
      shapeHref: '#cloud-shape-b',
      opacity: 0.48,
      duration: '35s',
      delay: '-28s',
      reverse: true,
      bobbingType: 'gentle',
      bobbingDuration: '7.5s',
    },
    {
      id: 'drift-9',
      top: '58%',
      widthClass: 'w-64 sm:w-84',
      shapeHref: '#cloud-shape-c',
      opacity: 0.40,
      duration: '27s',
      delay: '-15s',
      bobbingType: 'subtle',
      bobbingDuration: '5.8s',
    },

    // Lower-Mid to Footer (60% - 95%)
    {
      id: 'drift-10',
      top: '66%',
      widthClass: 'w-72 sm:w-[400px]',
      shapeHref: '#cloud-shape-a',
      opacity: 0.44,
      duration: '30s',
      delay: '-19s',
      bobbingType: 'gentle',
      bobbingDuration: '6.8s',
    },
    {
      id: 'drift-11',
      top: '73%',
      widthClass: 'w-56 sm:w-72',
      shapeHref: '#cloud-shape-d',
      opacity: 0.38,
      duration: '24s',
      delay: '-11s',
      reverse: true,
      bobbingType: 'subtle',
      bobbingDuration: '5s',
    },
    {
      id: 'drift-12',
      top: '81%',
      widthClass: 'w-80 sm:w-[480px]',
      shapeHref: '#cloud-shape-b',
      opacity: 0.46,
      duration: '36s',
      delay: '-25s',
      bobbingType: 'gentle',
      bobbingDuration: '8s',
    },
    {
      id: 'drift-13',
      top: '88%',
      widthClass: 'w-64 sm:w-80',
      shapeHref: '#cloud-shape-c',
      opacity: 0.40,
      duration: '26s',
      delay: '-16s',
      bobbingType: 'subtle',
      bobbingDuration: '5.6s',
    },
    {
      id: 'drift-14',
      top: '94%',
      widthClass: 'w-72 sm:w-[430px]',
      shapeHref: '#cloud-shape-a',
      opacity: 0.42,
      duration: '31s',
      delay: '-7s',
      reverse: true,
      bobbingType: 'gentle',
      bobbingDuration: '7s',
    },
  ];

  // 28 DREAMY TWINKLES & SPARKLES - ลดสีสันลง ใช้ประกายดาวสีขาวและทองนวล สบายตา ไม่ฉูดฉาด
  const sparkles: SparkleConfig[] = [
    // Top Zone (0% - 25%)
    { id: 'sp-1', top: '4%', left: '7%', char: '✦', color: 'text-white', sizeClass: 'text-xs sm:text-sm', duration: 3.8, delay: 0, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-2', top: '6%', left: '22%', char: '✧', color: 'text-amber-200', sizeClass: 'text-sm sm:text-base', duration: 4.2, delay: 0.8, rotationDir: -1, glowColor: 'rgba(253,230,138,0.5)' },
    { id: 'sp-3', top: '8%', left: '38%', char: '⋆', color: 'text-white', sizeClass: 'text-xs', duration: 3.4, delay: 1.4, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-4', top: '5%', left: '50%', char: '✦', color: 'text-purple-200', sizeClass: 'text-sm sm:text-base', duration: 4.6, delay: 2.1, rotationDir: -1, glowColor: 'rgba(233,213,255,0.5)' },
    { id: 'sp-5', top: '9%', left: '64%', char: '✧', color: 'text-white', sizeClass: 'text-xs sm:text-sm', duration: 3.9, delay: 0.5, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-6', top: '7%', left: '78%', char: '⋆', color: 'text-sky-200', sizeClass: 'text-xs', duration: 4.1, delay: 1.2, rotationDir: -1, glowColor: 'rgba(186,230,253,0.5)' },
    { id: 'sp-7', top: '5%', left: '92%', char: '✦', color: 'text-white', sizeClass: 'text-xs sm:text-sm', duration: 3.7, delay: 1.9, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },

    // Upper-Mid Zone (25% - 50%)
    { id: 'sp-8', top: '24%', left: '12%', char: '✧', color: 'text-purple-200', sizeClass: 'text-sm sm:text-base', duration: 4.3, delay: 1.8, rotationDir: -1, glowColor: 'rgba(233,213,255,0.5)' },
    { id: 'sp-9', top: '28%', left: '29%', char: '✦', color: 'text-white', sizeClass: 'text-xs sm:text-sm', duration: 3.8, delay: 2.6, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-10', top: '22%', left: '44%', char: '⋆', color: 'text-amber-200', sizeClass: 'text-xs', duration: 3.2, delay: 0.3, rotationDir: -1, glowColor: 'rgba(253,230,138,0.5)' },
    { id: 'sp-11', top: '30%', left: '56%', char: '✦', color: 'text-white', sizeClass: 'text-sm sm:text-base', duration: 4.0, delay: 1.5, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-12', top: '25%', left: '71%', char: '✧', color: 'text-sky-200', sizeClass: 'text-sm sm:text-base', duration: 4.5, delay: 2.2, rotationDir: -1, glowColor: 'rgba(186,230,253,0.5)' },
    { id: 'sp-13', top: '32%', left: '86%', char: '⋆', color: 'text-white', sizeClass: 'text-xs', duration: 3.6, delay: 0.9, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },

    // Center-Mid Zone (50% - 75%)
    { id: 'sp-14', top: '47%', left: '8%', char: '✦', color: 'text-white', sizeClass: 'text-xs sm:text-sm', duration: 4.1, delay: 0.7, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-15', top: '52%', left: '24%', char: '⋆', color: 'text-purple-200', sizeClass: 'text-xs', duration: 3.5, delay: 1.9, rotationDir: -1, glowColor: 'rgba(233,213,255,0.5)' },
    { id: 'sp-16', top: '45%', left: '39%', char: '✧', color: 'text-white', sizeClass: 'text-sm sm:text-base', duration: 4.4, delay: 2.9, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-17', top: '56%', left: '52%', char: '✦', color: 'text-amber-200', sizeClass: 'text-sm sm:text-base', duration: 3.9, delay: 1.1, rotationDir: -1, glowColor: 'rgba(253,230,138,0.5)' },
    { id: 'sp-18', top: '49%', left: '67%', char: '⋆', color: 'text-white', sizeClass: 'text-xs', duration: 3.7, delay: 2.4, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-19', top: '54%', left: '82%', char: '✧', color: 'text-sky-200', sizeClass: 'text-xs sm:text-sm', duration: 4.3, delay: 0.6, rotationDir: -1, glowColor: 'rgba(186,230,253,0.5)' },

    // Lower Zone & Footer (75% - 98%)
    { id: 'sp-20', top: '71%', left: '14%', char: '✧', color: 'text-white', sizeClass: 'text-sm sm:text-base', duration: 4.0, delay: 0.4, rotationDir: -1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-21', top: '76%', left: '31%', char: '✦', color: 'text-purple-200', sizeClass: 'text-xs sm:text-sm', duration: 4.2, delay: 1.6, rotationDir: 1, glowColor: 'rgba(233,213,255,0.5)' },
    { id: 'sp-22', top: '69%', left: '48%', char: '⋆', color: 'text-white', sizeClass: 'text-xs', duration: 3.3, delay: 2.8, rotationDir: -1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-23', top: '78%', left: '62%', char: '✧', color: 'text-amber-200', sizeClass: 'text-xs sm:text-sm', duration: 4.1, delay: 1.0, rotationDir: 1, glowColor: 'rgba(253,230,138,0.5)' },
    { id: 'sp-24', top: '73%', left: '76%', char: '✦', color: 'text-white', sizeClass: 'text-sm sm:text-base', duration: 3.8, delay: 2.1, rotationDir: -1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-25', top: '88%', left: '20%', char: '⋆', color: 'text-sky-200', sizeClass: 'text-xs', duration: 3.5, delay: 2.0, rotationDir: -1, glowColor: 'rgba(186,230,253,0.5)' },
    { id: 'sp-26', top: '91%', left: '42%', char: '✧', color: 'text-white', sizeClass: 'text-xs sm:text-sm', duration: 4.2, delay: 0.9, rotationDir: 1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-27', top: '86%', left: '58%', char: '✦', color: 'text-white', sizeClass: 'text-xs sm:text-sm', duration: 3.6, delay: 1.7, rotationDir: -1, glowColor: 'rgba(255,255,255,0.6)' },
    { id: 'sp-28', top: '93%', left: '84%', char: '⋆', color: 'text-amber-200', sizeClass: 'text-xs', duration: 3.7, delay: 2.5, rotationDir: 1, glowColor: 'rgba(253,230,138,0.5)' },
  ];

  return (
    <div 
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Pure White Clean Soft Cloud Gradient - ขาวล้วน จางนุ่มนวล สบายตา */}
          <linearGradient id="cloud-gradient-pure-white" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.86" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0.55" />
          </linearGradient>

          {/* Cloud Shape A (Classic 3-puff Cumulus) */}
          <path
            id="cloud-shape-a"
            d="M 25 55 
               C 10 55 0 45 0 32 
               C 0 20 10 11 22 10 
               C 27 3 39 0 52 0 
               C 68 0 81 7 86 18 
               C 92 14 102 15 108 21 
               C 120 23 126 33 124 43 
               C 122 52 112 55 102 55 
               Z"
          />

          {/* Cloud Shape B (Wide, billowy cumulus) */}
          <path
            id="cloud-shape-b"
            d="M 35 60 
               C 15 60 0 48 0 34 
               C 0 22 12 12 26 12 
               C 32 4 46 0 62 0 
               C 80 0 94 6 100 17 
               C 108 13 120 14 128 22 
               C 142 25 150 36 148 48 
               C 146 58 134 60 120 60 
               Z"
          />

          {/* Cloud Shape C (Elongated soft cloud) */}
          <path
            id="cloud-shape-c"
            d="M 28 42 
               C 12 42 0 34 0 24 
               C 0 15 10 8 22 8 
               C 28 2 40 0 52 0 
               C 66 0 78 4 84 12 
               C 90 9 100 10 106 16 
               C 116 18 122 26 120 34 
               C 118 41 108 42 98 42 
               Z"
          />

          {/* Cloud Shape D (Compact cute puffy cloud) */}
          <path
            id="cloud-shape-d"
            d="M 20 40 
               C 8 40 0 32 0 22 
               C 0 13 8 6 18 6 
               C 22 1 32 0 40 0 
               C 52 0 62 6 66 14 
               C 72 12 80 14 84 18 
               C 92 20 96 28 94 34 
               C 92 40 84 40 76 40 
               Z"
          />
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* 1. CONTINUOUS DRIFTING CLOUDS (14 ก้อน เมฆขาวบริสุทธิ์ จางละมุน นวลตา) */}
      {/* ========================================================================= */}
      {driftingClouds.map((cloud) => (
        <div
          key={cloud.id}
          className={`absolute left-0 ${cloud.widthClass}`}
          style={{
            top: cloud.top,
            opacity: cloud.opacity,
            filter: 'drop-shadow(0 10px 20px rgba(148, 163, 184, 0.10))',
            animation: `${cloud.reverse ? 'cloudDriftReverse' : 'cloudDriftAcross'} ${cloud.duration} linear infinite`,
            animationDelay: cloud.delay,
            willChange: 'transform',
          }}
        >
          <div
            style={{
              animation: `${cloud.bobbingType === 'subtle' ? 'cloudBobbingSubtle' : 'cloudBobbingGentle'} ${cloud.bobbingDuration} ease-in-out infinite`,
              willChange: 'transform',
            }}
          >
            <svg
              viewBox={
                cloud.shapeHref === '#cloud-shape-b'
                  ? '0 0 150 65'
                  : cloud.shapeHref === '#cloud-shape-a'
                  ? '0 0 125 55'
                  : cloud.shapeHref === '#cloud-shape-c'
                  ? '0 0 120 45'
                  : '0 0 96 42'
              }
              className="w-full h-auto"
            >
              <use href={cloud.shapeHref} fill="url(#cloud-gradient-pure-white)" />
            </svg>
          </div>
        </div>
      ))}

      {/* ========================================================================= */}
      {/* 2. FLOATING AMBIENT CORNER & EDGE CLOUDS (เมฆขาวปุยขอบและมุมจอ จางโปร่งสบายตา) */}
      {/* ========================================================================= */}

      {/* Corner Cloud 1: Top-Left Floating Giant */}
      <motion.div
        animate={{
          x: [0, 35, -20, 0],
          y: [0, -22, 16, 0],
          scale: [1, 1.04, 0.97, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-14 -left-12 sm:-left-6 w-80 sm:w-[440px] drop-shadow-[0_12px_24px_rgba(148,163,184,0.10)] opacity-48"
      >
        <svg viewBox="0 0 150 65" className="w-full h-auto">
          <use href="#cloud-shape-b" fill="url(#cloud-gradient-pure-white)" />
        </svg>
      </motion.div>

      {/* Corner Cloud 2: Top-Right Floating Giant */}
      <motion.div
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 22, -18, 0],
          scale: [1, 1.03, 0.98, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -top-10 -right-16 sm:-right-8 w-80 sm:w-[460px] drop-shadow-[0_12px_24px_rgba(148,163,184,0.10)] opacity-45"
      >
        <svg viewBox="0 0 150 65" className="w-full h-auto">
          <use href="#cloud-shape-b" fill="url(#cloud-gradient-pure-white)" />
        </svg>
      </motion.div>

      {/* Edge Cloud 3: Mid-Left Floating Puff */}
      <motion.div
        animate={{
          x: [0, 45, -15, 0],
          y: [0, -25, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute top-[40%] -left-16 sm:-left-8 w-72 sm:w-96 drop-shadow-[0_10px_20px_rgba(148,163,184,0.10)] opacity-42"
      >
        <svg viewBox="0 0 125 55" className="w-full h-auto">
          <use href="#cloud-shape-a" fill="url(#cloud-gradient-pure-white)" />
        </svg>
      </motion.div>

      {/* Edge Cloud 4: Mid-Right Floating Puff */}
      <motion.div
        animate={{
          x: [0, -35, 18, 0],
          y: [0, 24, -20, 0],
        }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[52%] -right-14 sm:-right-6 w-72 sm:w-[400px] drop-shadow-[0_10px_20px_rgba(148,163,184,0.10)] opacity-44"
      >
        <svg viewBox="0 0 150 65" className="w-full h-auto">
          <use href="#cloud-shape-b" fill="url(#cloud-gradient-pure-white)" />
        </svg>
      </motion.div>

      {/* Corner Cloud 5: Bottom-Left Billow */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -22, 18, 0],
          scale: [1, 1.03, 0.98, 1],
        }}
        transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        className="absolute -bottom-8 -left-12 sm:-left-6 w-80 sm:w-[460px] drop-shadow-[0_12px_24px_rgba(148,163,184,0.10)] opacity-48"
      >
        <svg viewBox="0 0 150 65" className="w-full h-auto">
          <use href="#cloud-shape-b" fill="url(#cloud-gradient-pure-white)" />
        </svg>
      </motion.div>

      {/* Corner Cloud 6: Bottom-Right Billow */}
      <motion.div
        animate={{
          x: [0, -45, 20, 0],
          y: [0, 25, -22, 0],
          scale: [1, 1.03, 0.98, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-10 -right-14 sm:-right-6 w-88 sm:w-[480px] drop-shadow-[0_12px_24px_rgba(148,163,184,0.10)] opacity-45"
      >
        <svg viewBox="0 0 150 65" className="w-full h-auto">
          <use href="#cloud-shape-b" fill="url(#cloud-gradient-pure-white)" />
        </svg>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. ELEGANT WHITE & SOFT GOLDEN SPARKLES (ประกายดาวสีขาวและทองนวล สบายตา) */}
      {/* ========================================================================= */}
      {sparkles.map((sp) => (
        <motion.div
          key={sp.id}
          animate={{
            scale: [0.75, 1.25, 0.75],
            opacity: [0.18, 0.75, 0.18],
            rotate: [0, sp.rotationDir * 90, 0],
          }}
          transition={{
            duration: sp.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: sp.delay,
          }}
          style={{
            top: sp.top,
            left: sp.left,
            filter: `drop-shadow(0 0 4px ${sp.glowColor})`,
          }}
          className={`absolute ${sp.color} ${sp.sizeClass} select-none font-sans font-medium`}
        >
          {sp.char}
        </motion.div>
      ))}
    </div>
  );
};
