'use client';
import { useEffect, useState } from 'react';

const RetroConsole = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDots, setLoadingDots] = useState('');
  const [bootSequence, setBootSequence] = useState('');
  const [currentLine, setCurrentLine] = useState('');
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isBooted, setIsBooted] = useState(false);

  const initialBootMessages = [
    { text: 'Initializing secure connection...', delay: 500 },
    { text: 'Connection established', delay: 800 },
    { text: 'System check complete', delay: 1200 },
    { text: 'Warning: Unauthorized access detected', delay: 1500 },
    { text: 'Warning: Running security protocols...', delay: 2500 },
    { text: 'Access granted', delay: 3500 },
    { text: '[INCOMING TRANSMISSION]', delay: 3800 },
  ];

  const secretMessage = [
    'Sorry about that, the connection was unstable and dropped before I could finish.',
    "It seems you didn't need my help after all.",
    "You see it, don't you?",
    "They're not gone. They're somewhere... else.",
    'Edgar succeeded in crossing and Margaret found him.',
    'Help me find them both.',
    "Most people don't see it, but you do. You see the connections.",
    'The answer is hidden in history.',
    'Where the words cross, the key is revealed, the message is exposed.',
    'https://whhs.goudeketting.nl/gazette/19031980.pdf',
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
      dots = dots.length >= 3 ? '' : dots + '.';
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

  const showEndMessage = () => {
    setTimeout(() => {
      setCompletedLines((prev) => [...prev, '[TRANSMISSION ENDED]']);
    }, 1000);
  };

  // Handle boot sequence
  useEffect(() => {
    if (isLoading) return;

    let timeouts: NodeJS.Timeout[] = [];
    initialBootMessages.forEach((message, index) => {
      const timeout = setTimeout(() => {
        setBootSequence(message.text);
        if (index === initialBootMessages.length - 1) {
          setTimeout(() => setIsBooted(true), 300);
        }
      }, message.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isLoading]);

  // Handle message typing
  useEffect(() => {
    if (!isBooted) return;

    if (currentLineIndex >= secretMessage.length) {
      showEndMessage();
      return;
    }

    const currentMessageLine = secretMessage[currentLineIndex];

    if (currentCharIndex === currentMessageLine.length) {
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentMessageLine]);
        setCurrentLine('');
        setCurrentCharIndex(0);
        setCurrentLineIndex((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentLine((prev) => prev + currentMessageLine[currentCharIndex]);
      setCurrentCharIndex((prev) => prev + 1);
    }, 80);

    return () => clearTimeout(timeout);
  }, [isBooted, currentLineIndex, currentCharIndex]);

  return (
    <div className='min-h-screen bg-black p-6'>
      <div className='mx-auto max-w-4xl'>
        <div className='relative mt-10 border border-[#0f0] p-6'>
          <div className='absolute -top-4 left-6 border border-[#0f0] bg-black px-4 text-[#0f0]'>
            SYSTEM ACCESS TERMINAL
          </div>
          <div className='space-y-2 font-mono text-[#0f0]'>
            {isLoading ? (
              <div className='animate-pulse'>
                [*] {loadingDots}
                <span className='animate-pulse'>_</span>
              </div>
            ) : (
              <>
                {bootSequence && (
                  <div
                    className={`
                      ${bootSequence === '[INCOMING TRANSMISSION]' ? 'font-bold' : ''}
                      ${
                        bootSequence === '[INCOMING TRANSMISSION]' &&
                        completedLines[completedLines.length - 1] !== '[TRANSMISSION ENDED]'
                          ? 'animate-pulse'
                          : ''
                      }
                    `}
                  >
                    {bootSequence === '[INCOMING TRANSMISSION]'
                      ? completedLines[completedLines.length - 1] === '[TRANSMISSION ENDED]'
                        ? ''
                        : '>_ INCOMING TRANSMISSION _<\n\n'
                      : `[*] ${bootSequence}`}
                  </div>
                )}
                {completedLines.map((line, index) => (
                  <div
                    key={`completed-${index}`}
                    className={`text-[#0f0] ${line === '[TRANSMISSION ENDED]' ? 'font-bold' : ''}`}
                  >
                    {line === '[TRANSMISSION ENDED]' ? 'TRANSMISSION ENDED\n\n' : `> ${line}`}
                  </div>
                ))}
                {currentLine && (
                  <div className='text-[#0f0]'>
                    {currentLine}
                    <span className='animate-pulse'>_</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroConsole;
