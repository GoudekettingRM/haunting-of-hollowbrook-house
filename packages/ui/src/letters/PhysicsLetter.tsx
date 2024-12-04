import { motion } from 'framer-motion';
import { Bodies } from 'matter-js';
import { useEffect, useRef, useState } from 'react';
import { usePhysics } from './PhysicsProvider';

interface PhysicsLetterProps {
  children: string;
  baseDelay: number;
}

export const PhysicsLetter = ({ children, baseDelay }: PhysicsLetterProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const startPositionRef = useRef<{ x: number; y: number } | null>(null);
  const { engine, addBody, removeBody } = usePhysics();

  useEffect(() => {
    const container = containerRef.current;
    const letter = letterRef.current;

    if (!container || !letter || !engine) return;

    const timer = setTimeout(() => {
      const rect = letter.getBoundingClientRect();
      startPositionRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      const letterBody = Bodies.rectangle(
        startPositionRef.current.x,
        startPositionRef.current.y + window.scrollY,
        rect.width,
        rect.height,
        {
          restitution: 0.5,
          friction: 0.1,
          density: 0.001,
        },
      );

      addBody(letterBody);

      const updatePosition = () => {
        if (letterBody.position && startPositionRef.current) {
          setPosition({
            x: letterBody.position.x - startPositionRef.current.x,
            y: letterBody.position.y - startPositionRef.current.y - window.scrollY,
          });
          setRotation(letterBody.angle * (180 / Math.PI));
        }
        requestAnimationFrame(updatePosition);
      };
      requestAnimationFrame(updatePosition);

      return () => {
        removeBody(letterBody);
      };
    }, baseDelay);

    return () => clearTimeout(timer);
  }, [baseDelay, engine, addBody, removeBody]);

  return (
    <span ref={containerRef} className='relative inline-block'>
      <span
        className='invisible'
        style={{
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
        }}
      >
        {children}
      </span>

      <motion.span
        ref={letterRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          transformOrigin: 'center center',
          display: 'inline-block',
          willChange: 'transform',
          zIndex: 1,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};
