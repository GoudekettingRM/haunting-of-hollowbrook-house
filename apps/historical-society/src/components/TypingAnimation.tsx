import { useEffect, useState } from 'react';

interface TypingAnimationProps {
  lines: string[];
  completed?: boolean;
  onComplete?: () => void;
  typingSpeed?: number;
  linePauseTime?: number;
  showTransmissionLabels?: boolean;
  className?: string;
  linePrefix?: string;
  bottomRefElement?: HTMLDivElement | null;
}

const TypingAnimation = ({
  lines,
  completed = false,
  onComplete,
  typingSpeed = 40,
  linePauseTime = 1000,
  showTransmissionLabels = false,
  className = '',
  linePrefix = '> ',
  bottomRefElement,
}: TypingAnimationProps) => {
  // Track if we're in typing mode
  const [typing, setTyping] = useState(!completed);

  // Current partially-typed line
  const [currentLine, setCurrentLine] = useState('');

  // Completed lines that are fully displayed
  const [completedLines, setCompletedLines] = useState<string[]>(completed ? lines : []);

  // Current indexes
  const [currentLineIndex, setCurrentLineIndex] = useState(completed ? lines.length : 0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // Reset animation when completed prop changes
  useEffect(() => {
    if (completed) {
      setTyping(false);
      setCompletedLines(lines);
      setCurrentLineIndex(lines.length);
      setCurrentLine('');
      setCurrentCharIndex(0);
    }
  }, [completed, lines]);

  // Main typing effect
  useEffect(() => {
    // If we've typed all lines, finish animation
    if (currentLineIndex >= lines.length) {
      if (typing) {
        setTyping(false);
        onComplete?.();
      }
      return;
    }

    // Start typing if not already
    if (!typing) setTyping(true);

    const currentMessageLine = lines[currentLineIndex];

    // If we've finished the current line
    if (currentCharIndex === currentMessageLine.length) {
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentMessageLine]);
        setCurrentLine('');
        setCurrentCharIndex(0);
        setCurrentLineIndex((prev) => prev + 1);
      }, linePauseTime);
      return () => clearTimeout(timeout);
    }

    // Type the next character
    const timeout = setTimeout(() => {
      setCurrentLine((prev) => prev + currentMessageLine[currentCharIndex]);
      setCurrentCharIndex((prev) => prev + 1);
      bottomRefElement?.scrollIntoView({ behavior: 'smooth' });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, lines, typing, typingSpeed, linePauseTime, onComplete, bottomRefElement]);

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
