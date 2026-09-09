import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { AglLogo } from './AglLogo';

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
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="w-44 sm:w-52 h-24 relative flex items-center justify-center"
            >
              <AglLogo variant="light" compact className="h-24 sm:h-28" />
            </motion.div>

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
