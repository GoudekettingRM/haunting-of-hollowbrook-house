'use client';
import DashboardButton from '@/components/DashboardButton';
import TypingAnimation from '@/components/TypingAnimation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Terminal, XIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
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
  fragment: '1' | '2' | '3' | 'protocol-execution';
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showingNewLine, setShowingNewLine] = useState(false);

  const {
    fragmentOneNextHintNumber,
    setFragmentOneNextHintNumber,
    fragmentTwoNextHintNumber,
    setFragmentTwoNextHintNumber,
    fragmentThreeNextHintNumber,
    setFragmentThreeNextHintNumber,
    protocolExecutionNextHintNumber,
    setProtocolExecutionNextHintNumber,
  } = useFragmentsContext();

  // Get the current hint number from context based on fragment
  const getContextHintNumber = useCallback(() => {
    switch (fragment) {
      case '1':
        return fragmentOneNextHintNumber;
      case '2':
        return fragmentTwoNextHintNumber;
      case '3':
        return fragmentThreeNextHintNumber;
      case 'protocol-execution':
        return protocolExecutionNextHintNumber;
      default:
        return 1;
    }
  }, [
    fragment,
    fragmentOneNextHintNumber,
    fragmentTwoNextHintNumber,
    fragmentThreeNextHintNumber,
    protocolExecutionNextHintNumber,
  ]);

  // Update nextHintToShow when context changes or dialog opens
  const [nextHintToShow, setNextHintToShow] = useState(getContextHintNumber());

  useEffect(() => {
    if (isOpen) {
      setNextHintToShow(getContextHintNumber());
    }
  }, [isOpen, getContextHintNumber]);

  // Update context when hint number changes
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
        case 'protocol-execution':
          setProtocolExecutionNextHintNumber(number);
          break;
      }
    },
    [
      fragment,
      setFragmentOneNextHintNumber,
      setFragmentTwoNextHintNumber,
      setFragmentThreeNextHintNumber,
      setProtocolExecutionNextHintNumber,
    ],
  );

  const showNextHint = () => {
    if (nextHintToShow <= hints.length) {
      const newHintNumber = nextHintToShow + 1;
      setNextHintToShow(newHintNumber);
      updateContextMethod(newHintNumber);
      setShowingNewLine(true);
    }
  };

  const handleShowFirstHint = () => {
    setNextHintToShow(2);
    updateContextMethod(2);
    setShowingNewLine(true);
  };

  // Handle animation completion
  const handleAnimationComplete = () => {
    setShowingNewLine(false);
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
          <p>If you&apos;re stuck, you can get some help here.</p>
          {nextHintToShow === 1 ? (
            <DashboardButton onClick={handleShowFirstHint}>Show First Hint</DashboardButton>
          ) : (
            <>
              <TypingAnimation
                lines={hints.slice(0, nextHintToShow - 1)}
                completed={!showingNewLine}
                onComplete={handleAnimationComplete}
              />

              {/* Navigation button */}
              {nextHintToShow <= hints.length && (
                <div className='flex justify-end items-center'>
                  <DashboardButton onClick={showNextHint} disabled={showingNewLine}>
                    {nextHintToShow === hints.length ? 'Reveal Answer' : 'Next Hint'}
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
