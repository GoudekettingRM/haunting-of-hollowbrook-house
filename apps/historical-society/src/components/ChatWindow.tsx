'use client';

import { InfoIcon, MessagesSquare } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ChatWindow = () => {
  const [showWantToChatMessage, setShowWantToChatMessage] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasInitiatedChat, setHasInitiatedChat] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const lastSeenMessageIndexRef = useRef(-1);

  const messages = [
    'Hi',
    'Are you who I think you are?',
    'I have to assume you are, since you are the only one currently on this website',
    'Please, help me',
    'Follow these instructions',
    '5 12 21 11 24 15 5 22 3 8 20 6 22 1 1 5 4 22 1 29 1 9 21 3 9 25 7 22 2 1 2 12 21 10 8 15 10 21 2 25 2 11 21 10 2 25 7 22 8 22 15 5 22 10 33 15 1 22 11 49 1 9 21 2 55 5 4 22 14 26 20 2 22 4 74 20 2 22 2 38 15 1 22 7 6 10 3 22 3 65 20 2 22 7 62 2 11 21 3 20 15 5 22 5 40',
    'Rich paragraphs with chosen words',
    'Hide secrets meant to be disturbed',
    'In fives, the numbers hold their sway',
    "Like clockwork marking time's display",
    'The last two show the path to trace',
    'First down, then right across the space',
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

  const startMessageSequence = () => {
    setIsTyping(true);
    let totalDelay = 0;

    messages.forEach((message, index) => {
      const currentMessageDelay = totalDelay;

      if (index < messages.length - 1) {
        totalDelay += getTypingDuration(messages[index + 1]) + getPauseDuration();
      }

      const showMessageTimer = setTimeout(() => {
        setCurrentMessageIndex(index);

        if (index === messages.length - 1) {
          setIsTyping(false);
        }
      }, currentMessageDelay);

      timeoutsRef.current.push(showMessageTimer);
    });
  };

  const handleInitialClick = () => {
    setShowWantToChatMessage(false);
    setIsChatOpen(true);
    setHasInitiatedChat(true);
    startMessageSequence();
  };

  useEffect(() => {
    if (isChatOpen) {
      setUnreadMessages(0);
      lastSeenMessageIndexRef.current = currentMessageIndex;
    } else if (hasInitiatedChat) {
      lastSeenMessageIndexRef.current = currentMessageIndex;
    }
  }, [isChatOpen, hasInitiatedChat]);

  useEffect(() => {
    if (!isChatOpen && hasInitiatedChat && currentMessageIndex > lastSeenMessageIndexRef.current) {
      setUnreadMessages(currentMessageIndex - lastSeenMessageIndexRef.current);
    }
  }, [currentMessageIndex, isChatOpen, hasInitiatedChat]);

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
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {isChatOpen && (
        <div className='fixed top-0 w-full h-[calc(100dvh-65px)] sm:h-[444px] sm:top-auto sm:right-4 sm:bottom-28 sm:w-fit'>
          <div
            className={`
            bg-white rounded-b-lg sm:rounded-lg h-full shadow-lg w-full min-w-full sm:min-w-80 sm:w-80
              transition-all duration-300 ease-in-out
              ${isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
          `}
          >
            <div className='bg-dark-wood text-parchment p-4 sm:rounded-t-lg flex justify-between items-center'>
              <h2 className='text-lg font-semibold'>Messages</h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className='text-white hover:text-gray-200'
                aria-label='Close messages'
                type='button'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            <div className='h-[calc(100%-60px)] sm:h-96 p-4 w-full overflow-y-scroll overscroll-contain'>
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
        </div>
      )}
      {!hasInitiatedChat && showWantToChatMessage ? (
        <button
          onClick={handleInitialClick}
          className='fixed bottom-10 right-4 transition-transform hover:scale-105 animate-pulse hover:animate-none'
          aria-label='Open messages'
          type='button'
        >
          <div className='flex gap-2 items-center p-4 rounded-md bg-parchment text-dark-wood'>
            <InfoIcon size={32} />
            Someone wants to chat
          </div>
        </button>
      ) : (
        <div className='fixed bottom-10 right-4'>
          <button
            onClick={() => setIsChatOpen((prev) => !prev)}
            aria-label='Open messages'
            type='button'
            className={`p-3 rounded-full bg-parchment text-dark-wood hover:bg-opacity-100 ${isChatOpen ? 'bg-opacity-100' : 'bg-opacity-80'}`}
          >
            <MessagesSquare size={32} />
          </button>
          {unreadMessages > 0 && (
            <div className='absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center'>
              {unreadMessages}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWindow;
