import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 h-1 origin-left z-[60] bg-gradient-to-r from-saffron-500 via-leaf-500 to-sky2-500"
      aria-hidden
    />
  );
}

