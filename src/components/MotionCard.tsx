import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  interactive?: boolean;
  onClick?: () => void;
}

export function MotionCard({
  children,
  className = '',
  delay = 0,
  interactive = true,
  onClick,
}: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={interactive ? { y: -3 } : undefined}
      onClick={onClick}
      className={`rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:border-neutral-300 hover:shadow-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}
