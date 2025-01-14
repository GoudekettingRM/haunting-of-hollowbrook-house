import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  distance: number;
  size: number;
  delay: number;
  speed: number;
  opacity: number;
}

function CRTFirework({
  isVisible = false,
  onAnimationComplete,
}: {
  isVisible: boolean;
  onAnimationComplete: () => void;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shouldShow, setShouldShow] = useState(false);
  const numParticles = 250;

  const particleAnimationDuration = 2; // seconds
  const maxParticleDelay = 0.2; // seconds
  const totalAnimationTime = (particleAnimationDuration + maxParticleDelay) * 1000; // ms

  useEffect(() => {
    if (isVisible) {
      setShouldShow(true);
      const newParticles = Array.from({ length: numParticles }, (_, i) => {
        const angle = (i / numParticles) * 360 + Math.random() * 30 - 15;
        const speed = Math.random() * 0.4 + 0.8;
        return {
          id: i,
          x: angle,
          distance: Math.random() * 600 + window.innerWidth / 2,
          size: Math.random() * 6 + 2,
          delay: Math.random() * maxParticleDelay,
          speed,
          opacity: Math.random() * 0.7 + 0.3,
        };
      });
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setShouldShow(false);
      }, totalAnimationTime);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          className='fixed inset-0 z-50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={(definition: { opacity: number }) => {
            if (definition.opacity === 0) {
              onAnimationComplete();
            }
          }}
        >
          <div className='absolute inset-0 bg-black bg-opacity-100' />

          <div className='relative w-full h-full overflow-hidden'>
            <div
              className='absolute inset-0 pointer-events-none'
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,0,0.1) 2px, transparent 3px)',
                backgroundSize: '100% 3px',
              }}
            />

            {/* Particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className='absolute left-1/2 top-1/2 bg-green-400 rounded-full'
                style={{
                  width: particle.size,
                  height: particle.size,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  x: [0, Math.cos((particle.x * Math.PI) / 180) * particle.distance * particle.speed],
                  y: [0, Math.sin((particle.x * Math.PI) / 180) * particle.distance * particle.speed],
                  opacity: [0, particle.opacity, 0],
                }}
                transition={{
                  duration: particleAnimationDuration,
                  delay: particle.delay,
                  ease: 'easeOut',
                }}
              />
            ))}

            <div
              className='absolute inset-0 opacity-30 pointer-events-none'
              style={{
                background: 'radial-gradient(circle, rgba(0,255,0,0.2) 0%, transparent 70%)',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CRTFirework;
