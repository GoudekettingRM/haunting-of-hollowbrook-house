import { useCallback, useEffect, useState } from 'react';

const getRandomEdgePosition = () => {
  const edge = Math.floor(Math.random() * 4);
  const w = window.innerWidth;
  const h = window.innerHeight;

  switch (edge) {
    case 0:
      return { x: Math.random() * w, y: -20 };
    case 1:
      return { x: w + 20, y: Math.random() * h };
    case 2:
      return { x: Math.random() * w, y: h + 20 };
    default:
      return { x: -20, y: Math.random() * h };
  }
};

const CursorFollowingText = ({ text, textClass }: { text: string; textClass?: string }) => {
  const [cursorPos, setCursorPos] = useState(getRandomEdgePosition());
  const [textPos, setTextPos] = useState(getRandomEdgePosition());
  const [isMoving, setIsMoving] = useState(false);
  const [moveTimeout, setMoveTimeout] = useState<number | null>(null);
  const [isEntering, setIsEntering] = useState(true);
  const [rotation, setRotation] = useState(Math.random() * 360);
  const [scale, setScale] = useState(0);

  const movingSpringStrength = 0.01;
  const stoppedSpringStrength = 0.02;

  useEffect(() => {
    setScale(0);
    setRotation(Math.random() * 360);
    setIsEntering(true);
    const timer = setTimeout(() => {
      setScale(1);
      setRotation(0);
      setIsEntering(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [text]);

  const updateTextPosition = useCallback(() => {
    const springStrength = isMoving ? movingSpringStrength : stoppedSpringStrength;
    const distanceX = cursorPos.x - textPos.x;
    const distanceY = cursorPos.y - textPos.y;

    const isVeryClose = Math.abs(distanceX) < 0.1 && Math.abs(distanceY) < 0.1;
    if (!isMoving && isVeryClose) {
      setTextPos(cursorPos);
      return;
    }

    setTextPos((prev) => ({
      x: prev.x + distanceX * springStrength,
      y: prev.y + distanceY * springStrength,
    }));
  }, [cursorPos, isMoving, textPos]);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      if (moveTimeout) {
        window.clearTimeout(moveTimeout);
      }

      const timeoutId = window.setTimeout(() => {
        setIsMoving(false);
      }, 150);
      setMoveTimeout(timeoutId as unknown as number);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (moveTimeout) {
        window.clearTimeout(moveTimeout);
      }
    };
  }, [moveTimeout]);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      updateTextPosition();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [updateTextPosition]);

  return (
    <div
      className='fixed inset-0 pointer-events-none'
      style={{
        zIndex: 9999,
        backgroundColor: 'transparent',
      }}
    >
      <div
        className='absolute pointer-events-none transition-all duration-300 ease-out'
        style={{
          left: textPos.x + 20,
          top: textPos.y - 10,
          transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
          userSelect: 'none',
          opacity: isEntering ? 0.5 : 1,
        }}
      >
        <span className={`${textClass} pointer-events-none`}>{text}</span>
      </div>
    </div>
  );
};

export default CursorFollowingText;
