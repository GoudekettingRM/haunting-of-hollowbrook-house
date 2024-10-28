'use client';

import { InfoIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ChatWindow = () => {
  const [showWantToChatMessage, setShowWantToChatMessage] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = [
    'Hi',
    'Are you who I think you are?',
    'I have to assume you are, since you are the only one here',
    'Please, help me',
    'Follow these instructions',
    '5 12 21 11 24 15 5 22 3 8 20 6 22 1 1 5 4 22 1 29 1 9 21 3 9 25 7 22 2 1 2 12 21 10 8 15 10 21 2 25 2 11 21 10 2 25 7 22 8 22 15 5 22 10 33 15 1 22 11 49 1 9 21 2 55 5 4 22 14 26 20 2 22 4 74 20 2 22 2 38 15 1 22 7 6 10 3 22 3 65 20 2 22 7 62 2 11 21 3 20 15 5 22 5 40',
    'In fives, the numbers hold their sway',
    "Like clockwork marking time's display",
    'The final pair holds secrets deep',
    'One drops down, one sideways does leap',
    'Did you get all that?',
    'If you are who I think you are, you will know what to do, and I will see you on the other side',
    'Good luck',
    'JC.',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTypingDuration = (message: string) => {
    return Math.max(500, message.length * 50);
  };

  const getPauseDuration = () => {
    return 1500;
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessageIndex, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWantToChatMessage(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isChatOpen) return;

    const timer = setTimeout(() => {
      setIsTyping(true);

      let totalDelay = 0;

      messages.forEach((message, index) => {
        // Calculate delay for the next message
        const currentMessageDelay = totalDelay;

        // Add the delay for the next message
        if (index < messages.length - 1) {
          totalDelay += getTypingDuration(messages[index + 1]) + getPauseDuration();
        }

        const showMessageTimer = setTimeout(() => {
          setCurrentMessageIndex(index);

          // Set typing to false immediately when showing the last message
          if (index === messages.length - 1) {
            setIsTyping(false);
          }
        }, currentMessageDelay);
      });
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [isChatOpen]);

  return (
    <div className={`fixed ${currentMessageIndex === -1 ? 'bottom-4' : 'bottom-10'} right-4 z-50`}>
      <div
        className={`
        bg-white rounded-lg shadow-lg w-80
        transition-all duration-300 ease-in-out
        ${isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      >
        <div className='bg-dark-wood text-parchment p-4 rounded-t-lg flex justify-between items-center'>
          <h2 className='text-lg font-semibold'>Messages</h2>
          <button
            onClick={() => setIsChatOpen(false)}
            className='text-white hover:text-gray-200'
            aria-label='Close messages'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        <div className='h-96 p-4 overflow-y-auto'>
          {messages.slice(0, currentMessageIndex + 1).map((msg, i) => (
            <div key={i} className='mb-2 flex justify-start'>
              <div
                className='
                max-w-[80%] rounded-lg p-3
                bg-parchment text-dark-wood rounded-bl-none
              '
              >
                {msg}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className='mb-4 flex justify-start'>
              <div className='max-w-[80%] rounded-lg p-3 bg-parchment text-dark-wood rounded-bl-none'>
                <div className='flex gap-1'>
                  <div
                    className='h-2 w-2 bg-dark-wood rounded-full mt-1 animate-bounce'
                    style={{ animationDelay: '0ms' }}
                  />
                  <div
                    className='h-2 w-2 bg-dark-wood rounded-full mt-1 animate-bounce'
                    style={{ animationDelay: '200ms' }}
                  />
                  <div
                    className='h-2 w-2 bg-dark-wood rounded-full mt-1 animate-bounce'
                    style={{ animationDelay: '400ms' }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {currentMessageIndex === -1 && showWantToChatMessage && (
        <button
          onClick={() => setIsChatOpen(true)}
          className={`mt-4 ml-auto block transition-transform hover:scale-105 hover:animate-none ${isChatOpen ? 'animate-none' : 'animate-pulse'}`}
          aria-label='Open messages'
        >
          <div className='flex gap-2 items-center p-4 rounded-md bg-parchment text-dark-wood'>
            <InfoIcon size={32} />
            Someone wants to chat
          </div>
        </button>
      )}
    </div>
  );
};

export default ChatWindow;
