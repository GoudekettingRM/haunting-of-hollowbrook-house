'use client';
import { CHAT_STATE_COOKIE_NAME, DEFAULT_OPTIONS } from '@/utils/cookieConfig';
import Cookies from 'js-cookie';
import { InfoIcon, MessagesSquare, ShieldQuestionIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PAUSE_DURATION = 1500;

interface ChatState {
  hasInitiatedChat: boolean;
  currentMessageIndex: number;
  isDoneTyping: boolean;
  lastSeenMessageIndex: number;
  hintRequested: boolean;
  nextHintToShow: number;
  shownMessages: string[];
}

function ChatWindow() {
  const [showWantToChatMessage, setShowWantToChatMessage] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasInitiatedChat, setHasInitiatedChat] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isDoneTyping, setIsDoneTyping] = useState(false);
  const [hintRequested, setHintRequested] = useState(false);
  const [nextHintToShow, setNextHintToShow] = useState(0);
  const baseMessages = [
    'Hey you! Please help me.. I am stuck..\n\nIf you are willing to help, follow these instructions:',
    'Rich paragraphs with chosen words\nHide secrets meant to be disturbed',
    "In fives, the numbers hold their sway\nLike clockwork marking time's display",
    'The last two show the path to trace\nFirst down, then right across the space',
    'Once you reveal what is true\nEnter it where search is due',
    '15 1 22 11 17 5 4 22 1 29 1 9 21 3 9 1 9 21 4 2 20 2 22 5 46',
    '22 2 22 6 59 20 2 22 7 62 2 11 21 3 20 15 5 22 5 40',
    'If you are who I think you are, you will know what to do. I hope to see you on the other side.',
  ];

  const [messages, setMessages] = useState(baseMessages);

  const hints = [
    'Where would you find rich paragraphs on this site?',
    'Rich paragraphs could also be seen as articles.',
    'The numbers are in groups of five. What could that mean?',
    'What could the first three numbers (of a group of five numbers) represent?',
    'If you write the first three numbers like this ../../.., what does it look like?',
    'The first three digits (of a group of five) is the date of an article.',
    'The last two numbers are akin to coordinates in an article. If you count down, what would you be counting?',
    'If you count the fourth number (of a group of five) down, you count the paragraphs.',
    'If you count right across the space, what would you be counting?',
    'If you take the first three digits, you get a date of an article, the other two numbers indicate the paragraph and word in that paragraph to look for.',
    'ansIf you do this for all the numbers, you get the following message: "read article about investigation equipment, take each first character".',
    'What article does this refer to?',
    'What could be the first character that the message is referring to?',
    'Look for the article titled: The Evolution of Paranormal Investigation Equipment',
    'What stands out in the article?',
    'What happens if you look at the bullet points in the article?',
    'ansThe first letters of the bullet points spell out `WE ARE STILL ALIVE`.',
    'Where would you enter this to search?',
    'ansThere is a search bar on the site. Enter the answer there.',
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const lastSeenMessageIndexRef = useRef(-1);
  const isChatOpenRef = useRef(isChatOpen);

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
      hintRequested,
      nextHintToShow,
      shownMessages: messages,
    };
    Cookies.set(CHAT_STATE_COOKIE_NAME, JSON.stringify(state), DEFAULT_OPTIONS);
  };

  const loadChatState = () => {
    const savedState = Cookies.get(CHAT_STATE_COOKIE_NAME);
    if (savedState) {
      const state = JSON.parse(savedState) as ChatState;
      setHasInitiatedChat(state.hasInitiatedChat);
      lastSeenMessageIndexRef.current = state.lastSeenMessageIndex;
      setShowWantToChatMessage(false);
      setHintRequested(state.hintRequested);
      setNextHintToShow(state.nextHintToShow);
      setMessages(state.shownMessages);

      if (state.isDoneTyping) {
        setCurrentMessageIndex(state.currentMessageIndex);
        setIsDoneTyping(true);
        setIsTyping(false);
      } else {
        startMessageSequence(state.currentMessageIndex + 1);
      }
      return true;
    }
    return false;
  };

  const startMessageSequence = (startFromIndex = 0) => {
    setIsTyping(true);
    let totalDelay = 0;

    if (startFromIndex > 0) {
      setCurrentMessageIndex(startFromIndex - 1);
    }

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

  const handleShowNextHint = () => {
    if (nextHintToShow < hints.length) {
      setIsDoneTyping(false);
      setIsTyping(true);

      setTimeout(() => {
        let nextHint = hints[nextHintToShow];
        // Strip 'ans' prefix if present but still count it as answer hint
        const isAnswerHint = nextHint.startsWith('ans');
        if (isAnswerHint) {
          nextHint = nextHint.substring(3);
        }
        setMessages((prevMessages) => [...prevMessages, nextHint]);
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
        setNextHintToShow((prev) => prev + 1);
        setHintRequested(true);
        setIsTyping(false);
        setIsDoneTyping(true);
      }, PAUSE_DURATION);
    }
  };

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

  useEffect(() => {
    if (hasInitiatedChat) {
      saveChatState();
    }
  }, [hasInitiatedChat, currentMessageIndex, isDoneTyping, hintRequested, messages]);

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

  const showHintButton = isDoneTyping && !isTyping && nextHintToShow < hints.length;
  const nextHintIsAnswer = nextHintToShow < hints.length && hints[nextHintToShow].startsWith('ans');

  return (
    <>
      {isChatOpen ? (
        <div className='fixed top-0 w-full h-[calc(100dvh-65px)] sm:h-[444px] sm:top-auto sm:right-4 sm:bottom-28 sm:w-fit'>
          <div className='bg-parchment rounded-b-lg sm:rounded-lg h-full drop-shadow-lg w-full min-w-full sm:min-w-80 sm:w-96 transition-all duration-300 ease-in-out opacity-100 translate-y-0'>
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
                  <div className='max-w-[80%] rounded-lg p-3 bg-white whitespace-pre-wrap text-dark-wood rounded-bl-none'>
                    {msg}
                  </div>
                </div>
              ))}
              {isTyping && (
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
              )}
              <div className='flex items-center mt-4 mb-2 justify-center'>
                {isDoneTyping && (
                  <p className='text-center text-sm flex items-center justify-center gap-1 text-red-700'>
                    <InfoIcon className='h-4 w-4' /> Connection lost
                  </p>
                )}
                {isDoneTyping && showHintButton && <span className='mx-2 text-red-700'>•</span>}
                {showHintButton && (
                  <button
                    onClick={handleShowNextHint}
                    className='text-center text-sm flex items-center justify-center gap-1 text-red-700 underline sm:no-underline hover:underline'
                  >
                    <ShieldQuestionIcon className='w-4 h-4' />
                    {nextHintIsAnswer ? 'Reveal next step' : 'Help'}
                  </button>
                )}
              </div>

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
            className={`p-3 rounded-full bg-white text-dark-wood hover:bg-opacity-100 ${
              isChatOpen ? 'bg-opacity-100' : 'bg-opacity-80'
            }`}
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
