'use client';

import Cookies from 'js-cookie';
import { InfoIcon, MessagesSquare } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PAUSE_DURATION = 1500;
const COOKIE_NAME = 'whhs-chat-state';

interface ChatState {
  hasInitiatedChat: boolean;
  currentMessageIndex: number;
  isDoneTyping: boolean;
  lastSeenMessageIndex: number;
}

function ChatWindow() {
  const [showWantToChatMessage, setShowWantToChatMessage] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasInitiatedChat, setHasInitiatedChat] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isDoneTyping, setIsDoneTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const lastSeenMessageIndexRef = useRef(-1);
  const isChatOpenRef = useRef(isChatOpen);

  const messages = [
    'Hey you!',
    'Please help me.. I am stuck..',
    'I need your help to get out of here. If you are willing to help, follow these instructions:',
    'Rich paragraphs with chosen words',
    'Hide secrets meant to be disturbed',
    'In fives, the numbers hold their sway',
    "Like clockwork marking time's display",
    'The last two show the path to trace',
    'First down, then right across the space',
    'Once you reveal what is true',
    'Enter it where search is due',
    '15 1 22 11 17 5 4 22 1 29 1 9 21 3 9 25 7 22 2 1',
    '15 10 21 2 25 2 11 21 10 2 25 7 22 8 22 15 5 22 10 33',
    '22 2 22 6 59 20 2 22 7 62 2 11 21 3 20 15 5 22 5 40',
    'If you are who I think you are, you will know what to do',
    'I hope to see you on the other side',
  ];

  const scrollToBottom = (scrollMethod: 'smooth' | 'instant' | 'auto') => {
    messagesEndRef.current?.scrollIntoView({ behavior: scrollMethod });
  };

  const getTypingDuration = (message: string) => {
    return Math.max(500, message.length * 50);
  };

  const saveChatState = () => {
    const state = {
      hasInitiatedChat,
      currentMessageIndex,
      isDoneTyping,
      lastSeenMessageIndex: lastSeenMessageIndexRef.current,
    };
    Cookies.set(COOKIE_NAME, JSON.stringify(state), { expires: 7 });
  };

  const loadChatState = () => {
    const savedState = Cookies.get(COOKIE_NAME);
    if (savedState) {
      const state = JSON.parse(savedState) as ChatState;
      setHasInitiatedChat(state.hasInitiatedChat);
      lastSeenMessageIndexRef.current = state.lastSeenMessageIndex;
      setShowWantToChatMessage(false);

      // If the sequence was complete
      if (state.isDoneTyping) {
        setCurrentMessageIndex(state.currentMessageIndex);
        setIsDoneTyping(true);
        setIsTyping(false);
      } else {
        // Resume the sequence from where it left off
        startMessageSequence(state.currentMessageIndex + 1);
      }
      return true;
    }
    return false;
  };

  const startMessageSequence = (startFromIndex = 0) => {
    setIsTyping(true);
    let totalDelay = 0;

    // Immediately show all messages up to startFromIndex
    if (startFromIndex > 0) {
      setCurrentMessageIndex(startFromIndex - 1);
    }

    // Continue with remaining messages
    messages.slice(startFromIndex).forEach((message, index) => {
      const currentMessageDelay = totalDelay;
      const actualIndex = startFromIndex + index;

      if (actualIndex < messages.length - 1) {
        totalDelay += getTypingDuration(messages[actualIndex + 1]) + PAUSE_DURATION;
      }

      const showMessageTimer = setTimeout(() => {
        setCurrentMessageIndex(actualIndex);
      }, currentMessageDelay);

      timeoutsRef.current.push(showMessageTimer);
    });

    setTimeout(
      () => {
        setIsTyping(false);
        setIsDoneTyping(true);
      },
      totalDelay + PAUSE_DURATION + PAUSE_DURATION,
    );
  };

  const handleInitialClick = () => {
    setShowWantToChatMessage(false);
    setIsChatOpen(true);
    setHasInitiatedChat(true);
    startMessageSequence();
  };

  // Initial load effect
  useEffect(() => {
    const hasExistingState = loadChatState();
    if (!hasExistingState) {
      const timer = setTimeout(() => {
        if (isChatOpenRef.current) {
          handleInitialClick();
        } else {
          setShowWantToChatMessage(true);
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Save state effect
  useEffect(() => {
    if (hasInitiatedChat) {
      saveChatState();
    }
  }, [hasInitiatedChat, currentMessageIndex, isDoneTyping]);

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
    scrollToBottom('smooth');
  }, [currentMessageIndex, isTyping, isDoneTyping]);

  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
    if (isChatOpen) {
      scrollToBottom('instant');
    }
  }, [isChatOpen]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {isChatOpen ? (
        <div className='fixed top-0 w-full h-[calc(100dvh-65px)] sm:h-[444px] sm:top-auto sm:right-4 sm:bottom-28 sm:w-fit'>
          <div className='bg-parchment rounded-b-lg sm:rounded-lg h-full drop-shadow-lg w-full min-w-full sm:min-w-80 sm:w-80 transition-all duration-300 ease-in-out opacity-100 translate-y-0'>
            <div className='bg-parchment text-dark-wood p-4 sm:rounded-t-lg flex justify-between items-center border border-medium-wood'>
              <h2 className='text-lg font-semibold'>Messages</h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className='text-dark-wood hover:text-light-wood'
                aria-label='Close messages'
                type='button'
              >
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            <div className='h-[calc(100%-60px)] sm:h-96 p-4 w-full overflow-y-scroll overscroll-contain border border-medium-wood border-t-0 rounded-bl-lg'>
              {messages.slice(0, currentMessageIndex + 1).map((msg, i) => (
                <div key={i} className='mb-2 flex justify-start'>
                  <div className='max-w-[80%] rounded-lg p-3 bg-white text-dark-wood rounded-bl-none'>{msg}</div>
                </div>
              ))}
              {isTyping ? (
                <div className='mb-4 flex justify-start'>
                  <div className='max-w-[80%] rounded-lg p-3 bg-white text-dark-wood rounded-bl-none'>
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
              ) : null}
              {isDoneTyping ? (
                <p className='mt-4 mb-2 w-full text-center text-sm flex mx-auto items-center justify-center gap-1 text-red-700'>
                  <InfoIcon className='h-4 w-4' /> Connection lost
                </p>
              ) : null}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      ) : null}
      {!hasInitiatedChat && showWantToChatMessage ? (
        <button
          onClick={handleInitialClick}
          className='fixed bottom-10 right-4 transition-transform hover:scale-105 animate-pulse hover:animate-none drop-shadow-lg'
          aria-label='Someone wants to chat'
          type='button'
        >
          <div className='flex gap-2 items-center p-4 rounded-md bg-white text-dark-wood'>
            <InfoIcon size={32} />
            Someone wants to chat
          </div>
        </button>
      ) : (
        <div className='fixed bottom-10 right-4 drop-shadow-lg'>
          <button
            onClick={() => setIsChatOpen((prev) => !prev)}
            aria-label='Open messages'
            type='button'
            className={`p-3 rounded-full bg-white text-dark-wood hover:bg-opacity-100 ${isChatOpen ? 'bg-opacity-100' : 'bg-opacity-80'}`}
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
}

export default ChatWindow;
