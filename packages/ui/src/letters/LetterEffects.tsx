import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PhysicsLetter } from './PhysicsLetter';

export type EffectType = 'fall' | 'fade' | 'scatter' | 'none';

interface LetterEffectProps {
  children: string;
  randomBaseDelay: number;
  effect: EffectType;
}

interface PhysicsLetterProps {
  children: string;
  baseDelay: number;
}

// Your existing FadingLetter component
const FadingLetter = ({ children, baseDelay }: { children: string; baseDelay: number }) => {
  const [animationPhase, setAnimationPhase] = useState('initial');
  const randomRotation = useRef(Math.random() * 360);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationPhase('fadeOut');
    }, baseDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [baseDelay]);

  return (
    <motion.span
      className='inline-block'
      initial={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        transformOrigin: 'center',
      }}
      animate={
        animationPhase === 'fadeOut'
          ? {
              opacity: 0,
              scale: 0.5,
              rotate: randomRotation.current,
            }
          : undefined
      }
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
      style={{
        display: 'inline-block',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
      }}
    >
      {children}
    </motion.span>
  );
};

// Your existing ScatterLetter component
const ScatterLetter = ({ children, baseDelay }: { children: string; baseDelay: number }) => {
  const [animationPhase, setAnimationPhase] = useState('initial');

  useEffect(() => {
    const timerOne = setTimeout(() => {
      setAnimationPhase('fadeIn');
    }, baseDelay);

    const timerTwo = setTimeout(() => {
      setAnimationPhase('scatter');
    }, baseDelay + 1500);

    return () => {
      clearTimeout(timerOne);
      clearTimeout(timerTwo);
    };
  }, [baseDelay]);

  const variants = {
    initial: {
      opacity: 0,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
    },
    fadeIn: (index: number) => ({
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.1,
      },
    }),
    scatter: (index: number) => ({
      scale: 0,
      opacity: 0,
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60,
      rotate: Math.random() * 90 - 45,
      transition: {
        duration: 1,
        ease: 'backIn',
        delay: index * 0.1,
      },
    }),
  };

  return (
    <span
      className='relative inline-block'
      style={{
        width: '1ch',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        transition: 'opacity 0.5s',
      }}
    >
      <span
        className={animationPhase !== 'scatter' ? '' : 'invisible'}
        style={{
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
        }}
      >
        {children}
      </span>

      {[...Array(4)].map((_, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={variants}
          initial='initial'
          animate={animationPhase}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
          }}
        >
          {children}
        </motion.span>
      ))}
    </span>
  );
};

export const LetterEffect = ({ children, effect, randomBaseDelay }: LetterEffectProps) => {
  switch (effect) {
    case 'fall':
      return <PhysicsLetter baseDelay={randomBaseDelay}>{children}</PhysicsLetter>;
    case 'fade':
      return <FadingLetter baseDelay={randomBaseDelay}>{children}</FadingLetter>;
    case 'scatter':
      return <ScatterLetter baseDelay={randomBaseDelay}>{children}</ScatterLetter>;
    default:
      return <>{children}</>;
  }
};

export default LetterEffect;
