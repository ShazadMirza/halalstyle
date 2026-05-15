"use client";

import { AnimatePresence, motion } from "framer-motion";

type GoldToastProps = {
  message: string;
  visible: boolean;
};

export function GoldToast({ message, visible }: GoldToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
          className="gold-toast pointer-events-none"
        >
          <span className="font-brand text-[0.8rem] tracking-[0.1em]">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
