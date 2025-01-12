'use client';
import { useEffect, useState } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDots, setLoadingDots] = useState('');
  const [bootSequence, setBootSequence] = useState('');

  const initialBootMessages = [
    { text: 'Initializing secure connection...', delay: 500 },
    { text: 'Connection established', delay: 800 },
    { text: 'System check complete', delay: 1200 },
    { text: 'Security verification required...', delay: 1500 },
    { text: 'Verification complete', delay: 2000 },
    { text: 'Access granted', delay: 2500 },
  ];

  // Handle loading animation
  useEffect(() => {
    if (!isLoading) return;

    const loadingMessages = [
      'BIOS check',
      'Memory test',
      'CPU test',
      'Loading kernel',
      'Starting system',
      'Checking file system',
      'Loading drivers',
      'Initializing network',
      'Starting services',
    ];

    let currentMessageIndex = 0;
    let dots = '';

    const interval = setInterval(() => {
      dots = dots.length >= 3 ? '' : `${dots}.`;
      const message = loadingMessages[currentMessageIndex];
      setLoadingDots(`${message}${dots}`);

      if (dots === '') {
        currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
      }
    }, 300);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isLoading]);

  // Handle boot sequence
  useEffect(() => {
    if (isLoading) return;

    const timeouts: NodeJS.Timeout[] = [];
    initialBootMessages.forEach((message, index) => {
      const timeout = setTimeout(() => {
        setBootSequence(message.text);
        if (index === initialBootMessages.length - 1) {
          setTimeout(() => onComplete(), 1000);
        }
      }, message.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isLoading, onComplete]);

  return (
    <>
      {isLoading ? (
        <div className='animate-pulse'>
          [*] {loadingDots}
          <span className='animate-pulse'>_</span>
        </div>
      ) : (
        bootSequence && <div className='text-[#0f0]'>[*] {bootSequence}</div>
      )}
    </>
  );
}
