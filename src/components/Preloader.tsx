import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { AglLogo } from './AglLogo';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(() => document.readyState === 'complete');
  const hasCalledComplete = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (pageLoaded) return;
    const markLoaded = () => setPageLoaded(true);
    window.addEventListener('load', markLoaded, { once: true });
    return () => window.removeEventListener('load', markLoaded);
  }, [pageLoaded]);

  useEffect(() => {
    if (prefersReducedMotion) setIntroComplete(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (introComplete && pageLoaded) setIsDone(true);
  }, [introComplete, pageLoaded]);

  const handleExitComplete = () => {
    if (hasCalledComplete.current) return;
    hasCalledComplete.current = true;
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isDone && (
        <motion.div
          id="agl-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex select-none flex-col items-center justify-center overflow-hidden bg-[#0A1930]"
          aria-hidden="true"
        >
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="0" x2="100%" y2="100%" stroke="#FF9933" strokeWidth="1" strokeDasharray="6 6" />
              <line x1="100%" y1="0" x2="0" y2="100%" stroke="#2F6FED" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="50%" cy="50%" r="200" stroke="#FAF7F2" strokeWidth="0.8" fill="none" strokeDasharray="4 4" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative flex h-24 w-44 items-center justify-center sm:w-52"
            >
              <AglLogo variant="light" compact className="h-24 sm:h-28" />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              onAnimationComplete={() => setIntroComplete(true)}
              className="mt-6 flex flex-col items-center"
            >
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF9933]">
                <span>DESIGN</span><span className="h-1 w-1 rounded-full bg-[#FAF7F2]/40" /><span>PRINT</span><span className="h-1 w-1 rounded-full bg-[#FAF7F2]/40" /><span>PACK</span>
              </div>
              <div className="mt-3 h-[2px] w-36 overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }} className="h-full w-full bg-gradient-to-r from-transparent via-[#FF9933] to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
