'use client';
import DashboardButton from '@/components/DashboardButton';
import TypingAnimation from '@/components/TypingAnimation';
import { useRef, useState } from 'react';
import { useDashboardPageContext } from './context/useDashboardPageContext';
import { useGeneralSysAdminContext } from './context/useGeneralSysAdminContext';

const secretMessages = [
  "Sorry about that, the connection was unstable and dropped. I'm glad to see that you made it here. I hope you're ready for what's to come.",
  "Time moves differently where I am, making each moment of connection increasingly painful. The strain... well, let's just say existing in two places at once isn't something the human consciousness was meant to endure.",
  "Maybe you have heard my story - or at least the version history remembers. The eccentric inventor who vanished from his mansion on a stormy night in 1939. But what the newspapers couldn't report was that my disappearance wasn't an ending, but a beginning. A terribly painful one, as it turns out.",
  "Margaret, my dear great-niece, was the first to truly understand what I'd achieved at Hollowbrook House (though I never could stand that grandiose name - it was simply home to me). She followed my research, traced my steps, and eventually found her way to where I am. But in doing so, she too became trapped in this half-existence, this torturous divide between realms.",
  "The connection I established that night in '39 needs to be severed in order for our consciousnesses to be freed. Not just for my sake, but also for Margaret's. If I were the only one, I could perhaps endure this suffering. But I cannot stand to watch her suffer. She's a really gentle soul, you know.",
  'I figured out how to sever the connection, but I need your help. From this place I can only do so much. The connection was set up using three individual frequencies and it is those frequencies that we need to disconnect too. I was able to scatter them across various digital resources. I need you to find them and execute the protocol. The last thing I managed to do was generate this interface for me to talk to you.',
  "Be warned - once you begin this process, there's no turning back. When the connection is finally broken, Margaret and I will be free and this interface will cease to exist. Time grows short. Each moment of maintaining this link becomes more excruciating. Are you ready to begin?",
];

interface InitialMessagesProps {
  completed: boolean;
}

function InitialMessages({ completed = false }: InitialMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { setPage } = useDashboardPageContext();
  const { setInitialAccessComplete, initialTypingAnimationCompleted, setInitialTypingAnimationCompleted } =
    useGeneralSysAdminContext();
  const [showButton, setShowButton] = useState(false);

  const handleTypingComplete = () => {
    setShowButton(true);
    setInitialTypingAnimationCompleted(true);
  };

  return (
    <div className='space-y-2'>
      <TypingAnimation
        lines={secretMessages}
        bottomRefElement={bottomRef.current}
        completed={completed || initialTypingAnimationCompleted}
        onComplete={handleTypingComplete}
        showTransmissionLabels={true}
      />
      {showButton && !completed && (
        <DashboardButton
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setInitialAccessComplete(true);
              setPage('dashboard');
            }
          }}
          onClick={() => {
            setInitialAccessComplete(true);
            setPage('dashboard');
          }}
        >
          Let&apos;s do this
        </DashboardButton>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default InitialMessages;
