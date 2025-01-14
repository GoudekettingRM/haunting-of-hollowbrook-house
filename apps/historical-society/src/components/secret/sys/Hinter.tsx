'use client';
import DashboardButton from '@/components/DashboardButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Terminal, XIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useFragmentsContext } from './context/useFragmentsContext';

const HintSystem = ({
  hints = [],
  helpButtonText = 'Help',
  className = '',
  fragment,
}: {
  helpButtonText?: string;
  hints: string[];
  className?: string;
  fragment: '1' | '2' | '3' | '4';
}) => {
  const {
    fragmentOneNextHintNumber,
    setFragmentOneNextHintNumber,
    fragmentTwoNextHintNumber,
    setFragmentTwoNextHintNumber,
    fragmentThreeNextHintNumber,
    setFragmentThreeNextHintNumber,
    fragmentFourNextHintNumber,
    setFragmentFourNextHintNumber,
  } = useFragmentsContext();
  const [nextHintToShow, setNextHintToShow] = useState(() => {
    switch (fragment) {
      case '1':
        return fragmentOneNextHintNumber;
      case '2':
        return fragmentTwoNextHintNumber;
      case '3':
        return fragmentThreeNextHintNumber;
      case '4':
        return fragmentFourNextHintNumber;
      default:
        return 1;
    }
  });

  const updateContextMethod = useCallback(
    (number: number) => {
      switch (fragment) {
        case '1':
          setFragmentOneNextHintNumber(number);
          break;
        case '2':
          setFragmentTwoNextHintNumber(number);
          break;
        case '3':
          setFragmentThreeNextHintNumber(number);
          break;
        case '4':
          setFragmentFourNextHintNumber(number);
          break;
      }
    },
    [fragment],
  );
  const [isOpen, setIsOpen] = useState(false);

  const [showingHints, setShowingHints] = useState(() => {
    return nextHintToShow > 1 && nextHintToShow <= hints.length;
  });

  const showNextHint = () => {
    if (nextHintToShow <= hints.length) {
      setNextHintToShow(nextHintToShow + 1);
      updateContextMethod(nextHintToShow + 1);
    }
  };

  const handleShowFirstHint = () => {
    setNextHintToShow(2);
    updateContextMethod(2);
    setShowingHints(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DashboardButton className={`bg-black flex items-center gap-2 !mt-0 !border-t-0 !border-r-0 ${className}`}>
          <Terminal size={16} />
          {helpButtonText}
        </DashboardButton>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md border-[#0f0] bg-black/95 max-h-[90dvh] overflow-auto'>
        <DialogHeader>
          <DialogTitle className='text-[#0f0] font-mono'>
            Help System - Hint used {`${nextHintToShow - 1}/${hints.length}`}
          </DialogTitle>
          <DashboardButton
            className='absolute top-0 right-0 !mt-0 !border-t-0 !border-r-0 text-[#0f0]'
            onClick={() => setIsOpen(false)}
          >
            <XIcon />
          </DashboardButton>
        </DialogHeader>

        <div className='font-mono text-[#0f0] min-h-[100px] flex flex-col gap-4'>
          <p>If you're stuck, you can get some help here.</p>
          {nextHintToShow === 1 ? (
            <DashboardButton onClick={handleShowFirstHint}>Show First Hint {'>'}</DashboardButton>
          ) : (
            <>
              {/* Show hints up to nextHintToShow */}
              {hints.slice(0, nextHintToShow - 1).map((hint, index) => (
                <div key={index} className='bg-black/50 p-4 rounded border border-[#0f0]/30'>
                  <span className='text-[#0f0]/70'>{'>'}</span> {hint}
                </div>
              ))}

              {/* Navigation button */}
              {nextHintToShow <= hints.length && (
                <div className='flex justify-end items-center'>
                  <DashboardButton onClick={showNextHint}>
                    {nextHintToShow === hints.length ? 'Reveal Answer >' : 'Next Hint >'}
                  </DashboardButton>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HintSystem;
