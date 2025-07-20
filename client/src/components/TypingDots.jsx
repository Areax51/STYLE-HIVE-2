import React from "react";
import { motion } from "framer-motion";

const dotVariants = {
  animate: (i) => ({
    y: [0, -6, 0],
    transition: {
      yoyo: Infinity,
      ease: "easeInOut",
      duration: 0.6,
      delay: i * 0.2,
    },
  }),
};

const TypingDots = () => (
  <div
    role="status"
    aria-label="AI is typing"
    className="flex gap-1 items-center"
  >
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        custom={i}
        variants={dotVariants}
        animate="animate"
        className="h-2 w-2 bg-gold rounded-full"
      />
    ))}
  </div>
);

export default TypingDots;
