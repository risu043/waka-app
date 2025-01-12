'use client';

import { AnimatePresence, motion, Variants } from 'motion/react';

import { cn } from '@/lib/utils';

interface FlipTextProps {
  word: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export default function FlipText({
  word,
  duration = 1.4,
  delayMultiple = 0.18,
  framerProps = {
    hidden: { y: 20, filter: 'blur(10px)', opacity: 0 },
    visible: { y: 0, filter: 'blur(0px)', opacity: 1 },
  },
  className,
}: FlipTextProps) {
  return (
    <div className="flex flex-wrap justify-start space-x-2">
      <AnimatePresence mode="wait">
        {word.split('').map((char, i) => (
          <motion.span
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn('origin-center drop-shadow-sm', className)}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
