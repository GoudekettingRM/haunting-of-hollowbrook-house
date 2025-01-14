import { useEffect, useState } from 'react';

type TypingAnimationProps = {
  lines: string[];
  completed?: boolean;
  onComplete?: () => void;
  typingSpeed?: number;
  linePauseTime?: number;
  showTransmissionLabels?: boolean;
  className?: string;
  linePrefix?: string;
};

const TypingAnimation = ({
  lines,
  completed = false,
  onComplete,
  typingSpeed = 40,
  linePauseTime = 1000,
  showTransmissionLabels = false,
  className = '',
  linePrefix = '> ',
}: TypingAnimationProps) => {
  const [typing, setTyping] = useState(false);
  const [currentLine, setCurrentLine] = useState('');
  const [completedLines, setCompletedLines] = useState<string[]>(completed ? lines : []);
  const [currentLineIndex, setCurrentLineIndex] = useState(completed ? lines.length : 0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setTyping(false);
      onComplete?.();
      return;
    }

    if (!typing) setTyping(true);

    const currentMessageLine = lines[currentLineIndex];

    if (currentCharIndex === currentMessageLine.length) {
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentMessageLine]);
        setCurrentLine('');
        setCurrentCharIndex(0);
        setCurrentLineIndex((prev) => prev + 1);
      }, linePauseTime);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setCurrentLine((prev) => prev + currentMessageLine[currentCharIndex]);
      setCurrentCharIndex((prev) => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, lines, typing, typingSpeed, linePauseTime, onComplete]);

  const isTransmissionLabel = (line: string) => line.startsWith('[') && line.endsWith(']');

  return (
    <div className={`space-y-2 ${className}`}>
      {showTransmissionLabels && typing && (
        <div className='text-[#0f0] animate-pulse font-bold'>[INCOMING TRANSMISSION]</div>
      )}
      {showTransmissionLabels && !typing && completedLines.length > 0 && (
        <div className='text-[#0f0] font-bold'>[TRANSMISSION ENDED]</div>
      )}
      {completedLines.map((line, index) => (
        <div
          key={`completed-${index}`}
          className={`text-[#0f0] ${isTransmissionLabel(line) ? 'animate-pulse font-bold' : ''}`}
        >
          {isTransmissionLabel(line) ? line : `${linePrefix}${line}`}
        </div>
      ))}
      {currentLine && (
        <div className='text-[#0f0]'>
          {linePrefix}
          {currentLine}
          <span className='animate-pulse'>_</span>
        </div>
      )}
    </div>
  );
};

export default TypingAnimation;
