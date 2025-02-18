'use client';
import TypingAnimation from '@/components/TypingAnimation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const animation = {
  initial: { opacity: 0 },
  open: (delays: number[]) => ({ opacity: 1, transition: { duration: 0.1, delay: 0.04 * delays[0] } }),
  closed: (delays: number[]) => ({
    backgroundColor: '#000',
    opacity: 1,
    transition: { duration: 0.1, delay: 0.02 * delays[0] },
  }),
};

const COLUMN_COUNT = 50;

interface PixelBreakdownProps {
  onFinishAnimation: () => Promise<void>;
}

const PixelBreakdown = ({ onFinishAnimation }: PixelBreakdownProps) => {
  const [start, setStart] = useState(false);
  const [showFirstLine, setShowFirstLine] = useState(false);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showThirdLine, setShowThirdLine] = useState(false);
  const [showFourthLine, setShowFourthLine] = useState(false);
  const [showFifthLine, setShowFifthLine] = useState(false);
  const [end, setEnd] = useState(false);
  const shuffle = (a: number[]) => {
    let j: number;
    let x: number;
    let i: number;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }

    return a;
  };

  const getBlocks = (columnIndex: number) => {
    if (typeof window === 'undefined') return null;

    const { innerWidth, innerHeight } = window;
    const dimensions = innerHeight / COLUMN_COUNT;
    const blocksCount = Math.ceil(innerWidth / dimensions);
    const delays = shuffle([...Array(blocksCount)].map((_, index) => index));

    return delays.map((randomDelay, index) => {
      return (
        <motion.div
          key={index}
          variants={animation}
          initial='initial'
          animate={start ? 'open' : end ? 'closed' : 'initial'}
          className='w-[2vh] h-full bg-[#0f0]'
          custom={[columnIndex + randomDelay, COLUMN_COUNT - columnIndex + randomDelay]}
        ></motion.div>
      );
    });
  };

  useEffect(() => {
    if (!start) {
      setTimeout(() => setStart(true), 500);
      setTimeout(() => {
        setShowFirstLine(true);
      }, 5000);
    }
  }, []);

  return (
    <div className='h-dvh w-dvw flex flex-col fixed inset-0 !m-0 pointer-events-none'>
      {showFirstLine && (
        <TypingAnimation
          lines={['You did it']}
          className='absolute top-1/2 !my-0 left-1/2 -translate-x-1/2 -translate-y-1/2 *:!text-black z-[99999]'
          linePrefix=''
          onComplete={() => {
            setTimeout(() => {
              setShowFirstLine(false);
              setShowSecondLine(true);
            }, 2000);
          }}
        />
      )}
      {showSecondLine && (
        <TypingAnimation
          lines={['Thank you']}
          className='absolute top-1/2 !my-0 left-1/2 -translate-x-1/2 -translate-y-1/2 *:!text-black z-[99999]'
          linePrefix=''
          onComplete={() => {
            setTimeout(() => {
              setShowSecondLine(false);
              setShowThirdLine(true);
            }, 2000);
          }}
        />
      )}
      {showThirdLine && (
        <TypingAnimation
          lines={['Margaret and I can finally be at peace']}
          className='absolute top-1/2 !my-0 left-1/2 -translate-x-1/2 -translate-y-1/2 *:!text-black z-[99999]'
          linePrefix=''
          onComplete={() => {
            setTimeout(() => {
              setShowThirdLine(false);
              setShowFourthLine(true);
            }, 2000);
          }}
        />
      )}
      {showFourthLine && (
        <TypingAnimation
          lines={['The connection will break now']}
          className='absolute top-1/2 !my-0 left-1/2 -translate-x-1/2 -translate-y-1/2 *:!text-black z-[99999]'
          linePrefix=''
          onComplete={() => {
            setTimeout(() => {
              setShowFourthLine(false);
              setShowFifthLine(true);
            }, 2000);
          }}
        />
      )}
      {showFifthLine && (
        <TypingAnimation
          lines={['Goodbye, friend.']}
          className='absolute top-1/2 !my-0 left-1/2 -translate-x-1/2 -translate-y-1/2 *:!text-black z-[99999]'
          linePrefix=''
          onComplete={() => {
            setTimeout(() => {
              setStart(false);
              setEnd(true);
              setTimeout(() => {
                onFinishAnimation().catch(console.error);
              }, 5000);
            }, 2000);
          }}
        />
      )}
      {[...Array(COLUMN_COUNT)].map((_, index) => {
        return (
          <div key={index} className='w-dvw h-[2vh] flex'>
            {getBlocks(index)}
          </div>
        );
      })}
    </div>
  );
};
export default PixelBreakdown;
