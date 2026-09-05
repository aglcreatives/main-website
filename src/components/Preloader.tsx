import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is requested or user has already visited in this session, keep it minimal
    const hasSeen = sessionStorage.getItem('agl_preloader_seen');
    const delay = prefersReducedMotion || hasSeen ? 500 : 1400;

    const timer = setTimeout(() => {
      setIsDone(true);
      sessionStorage.setItem('agl_preloader_seen', 'true');
      setTimeout(() => {
        onComplete();
      }, 400); // allow fade out transition
    }, delay);

    return () => clearTimeout(timer);
  }, [onComplete, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="agl-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0A1930] flex flex-col items-center justify-center select-none overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle background dieline creases */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="0" x2="100%" y2="100%" stroke="#FF9933" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="100%" y1="0" x2="0" y2="100%" stroke="#2F6FED" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="50%" cy="50%" r="200" stroke="#FAF7F2" strokeWidth="0.8" fill="none" strokeDasharray="4 4" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* SVG Logo Stroke Animation */}
            <div className="w-64 sm:w-80 h-28 relative flex items-center justify-center">
              <svg
                viewBox="0 0 320 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
              >
                <defs>
                  <linearGradient id="loaderBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2F6FED" />
                    <stop offset="100%" stopColor="#5CA0FF" />
                  </linearGradient>
                  <linearGradient id="loaderSaffronGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF9933" />
                    <stop offset="100%" stopColor="#FFB35C" />
                  </linearGradient>
                </defs>

                {/* Animated stroked Paths of A, G, L */}
                {/* 'A' Outline */}
                <motion.path
                  d="M52 14L8 92H24L38 65H68L78 84C74 86 69 88 64 90L60 92H82L52 14Z"
                  stroke="#FAF7F2"
                  strokeWidth="2"
                  fill="#FAF7F2"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                />

                {/* 'A' loop curve */}
                <motion.path
                  d="M34 67C46 67 60 67 74 67C92 73 112 84 135 84C162 84 186 66 186 46C186 28 170 14 145 14C122 14 100 28 92 48L106 53C112 39 126 28 144 28C161 28 171 37 171 47C171 59 154 71 134 71C108 71 85 57 48 57L34 67Z"
                  stroke="url(#loaderBlueGrad)"
                  strokeWidth="2.5"
                  fill="url(#loaderBlueGrad)"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={{ duration: 1.0, delay: 0.15, ease: 'easeInOut' }}
                />

                {/* 'G' Structure */}
                <motion.path
                  d="M142 14C190 14 220 44 220 72C220 90 206 94 190 94H160V66H206C204 54 188 28 142 28C108 28 88 56 88 74C88 88 98 94 116 94C128 94 140 91 150 86V72H134V59H164V94C148 99 130 102 114 102C82 102 70 82 70 64C70 34 100 14 142 14Z"
                  stroke="#FAF7F2"
                  strokeWidth="2"
                  fill="#FAF7F2"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={{ duration: 0.95, delay: 0.2, ease: 'easeInOut' }}
                />

                {/* 'L' Structure */}
                <motion.path
                  d="M206 18H220V78H264L256 92H206V18Z"
                  stroke="#FAF7F2"
                  strokeWidth="2"
                  fill="#FAF7F2"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
                />

                {/* 'L' base highlight */}
                <motion.path
                  d="M214 80H260C256 86 250 90 242 92H214V80Z"
                  stroke="url(#loaderBlueGrad)"
                  strokeWidth="2"
                  fill="url(#loaderBlueGrad)"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
                />

                {/* Subtitle Line */}
                <motion.text
                  x="160"
                  y="110"
                  textAnchor="middle"
                  fill="#FAF7F2"
                  fontSize="12"
                  fontWeight="600"
                  letterSpacing="7"
                  fontFamily="'Satoshi', sans-serif"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  AGL CREATIVES
                </motion.text>
              </svg>
            </div>

            {/* Tagline & Subtle Progress Pulse */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 flex flex-col items-center"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.2em] text-[#FF9933] uppercase">
                <span>DESIGN</span>
                <span className="w-1 h-1 rounded-full bg-[#FAF7F2]/40" />
                <span>PRINT</span>
                <span className="w-1 h-1 rounded-full bg-[#FAF7F2]/40" />
                <span>PACK</span>
              </div>

              {/* Progress Line */}
              <div className="w-36 h-[2px] bg-white/10 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.0, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#FF9933] to-transparent"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
