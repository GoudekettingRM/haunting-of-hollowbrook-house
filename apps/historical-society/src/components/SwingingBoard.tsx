'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useBuggingContext } from './useBuggingContext';

const SwingingDiv = ({
  children,
  originSide = 'left',
}: {
  children: React.ReactNode;
  originSide?: 'left' | 'right';
}) => {
  const { isBugged } = useBuggingContext();
  const [isReleased, setIsReleased] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (isReleased) return;
    const timeout = setTimeout(
      () => {
        setIsReleased(true);
      },
      Math.random() * 10000 + 2000,
    );
    return () => clearTimeout(timeout);
  }, [isReleased]);

  useEffect(() => {
    if (!isReleased) return;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- I don't want to await, just fire and forget
    controls.start({
      rotate: originSide === 'left' ? 90 : -90,
      transition: {
        type: 'spring',
        stiffness: 10,
        damping: 1,
        duration: 5,
      },
    });
  }, [isReleased, controls]);

  const origin = useMemo(() => {
    return {
      originX: originSide === 'left' ? 0 : 1,
      originY: 0.5,
    };
  }, [originSide]);

  if (!isBugged) return children;

  return (
    <motion.div animate={controls} initial={{ rotate: 0 }} className='max-w-screen-lg' style={origin}>
      {children}
    </motion.div>
  );
};

export default SwingingDiv;
