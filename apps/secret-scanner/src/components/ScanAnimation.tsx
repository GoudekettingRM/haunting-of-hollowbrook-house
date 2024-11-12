'use client';
import { SCAN_TIME_FORWARDS, SCAN_TIME_REVERSE } from '@/app/page';
import { useEffect, useRef, useState } from 'react';

interface ScanAnimationProps {
  isScanning: boolean;
  onComplete?: () => void;
}

const ScanAnimation = ({ isScanning, onComplete }: ScanAnimationProps) => {
  const [scanState, setScanState] = useState<'initial' | 'forward' | 'reverse' | 'completing'>('initial');
  const [translateY, setTranslateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScanning) {
      setScanState('forward');

      const forwardScanTimeout = setTimeout(() => {
        setScanState('reverse');
        // Move up the full height of the container
        const containerHeight = containerRef.current?.parentElement?.clientHeight || 0;
        setTranslateY(-containerHeight);
      }, SCAN_TIME_FORWARDS);

      const reverseScanTimeout = setTimeout(() => {
        setScanState('completing');
        setTranslateY(0);
        if (onComplete) {
          onComplete();
        }
      }, SCAN_TIME_FORWARDS + SCAN_TIME_REVERSE);

      return () => {
        clearTimeout(forwardScanTimeout);
        clearTimeout(reverseScanTimeout);
      };
    } else {
      setScanState('initial');
      setTranslateY(0);
    }
  }, [isScanning, onComplete]);

  if (!isScanning && scanState === 'initial') return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        transform: `translateY(${translateY}px)`,
        transition: `transform ${scanState === 'reverse' ? SCAN_TIME_REVERSE : SCAN_TIME_FORWARDS}ms linear`,
        animationName: 'scan',
        animationDuration: `${scanState === 'reverse' ? SCAN_TIME_REVERSE : SCAN_TIME_FORWARDS}ms`,
        animationTimingFunction: 'linear',
        animationFillMode: 'forwards',
        animationPlayState: scanState === 'completing' ? 'paused' : 'running',
        pointerEvents: 'none',
      }}
    >
      {scanState === 'reverse' && <div className='border-b-2 border-blue-500' />}
      <div
        className={`${scanState === 'reverse' ? 'bg-gradient-to-t h-32' : 'bg-gradient-to-b h-20'} from-transparent via-transparent to-blue-500/50`}
      />
      {scanState !== 'reverse' && <div className='border-b-2 border-blue-500' />}
    </div>
  );
};

export default ScanAnimation;
