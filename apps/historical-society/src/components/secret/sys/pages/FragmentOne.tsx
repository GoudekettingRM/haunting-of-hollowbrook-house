'use client';
import DashboardButton from '@/components/DashboardButton';
import TypingAnimation from '@/components/TypingAnimation';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useDashboardPageContext } from '../context/useDashboardPageContext';
import { useFragmentsContext } from '../context/useFragmentsContext';
import { usePuzzleAnswerContext } from '../context/usePuzzleAnswersContext';
import DashboardInput from '../DashboardInput';
import HintSystem from '../Hinter';

function FragmentOne({ onSuccess }: { onSuccess: () => void }) {
  const { setCompletedPuzzles } = useDashboardPageContext();
  const { accessedFragmentOneOnce, setAccessedFragmentOneOnce } = useFragmentsContext();
  const [showFragmentContent, setShowFragmentContent] = useState(accessedFragmentOneOnce);
  const { frequencyOne, setFrequencyOne } = usePuzzleAnswerContext();
  const [value, setValue] = useState(frequencyOne !== null ? frequencyOne.toString() : '');
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value) {
      setError('No answer provided');
      return;
    }

    if (Number(value) !== 847392) {
      setError('There seems to be an issue with the frequency... Try again...');
      return;
    }
    setFrequencyOne(847392);
    setCompletedPuzzles((prev) => [...prev, 'newspaper_archive']);

    onSuccess();
  };

  return (
    <>
      {showFragmentContent && (
        <HintSystem
          className='absolute top-0 right-0'
          hints={[
            'The scrambled letters at the bottom of the page, hide the truth',
            'Each character needs to be shifted',
            'How many steps did it I take to hide the frequency?',
            'What happens if you work your way backwards through the alphabet using that number?',
            'If you shift the letters of the first word 7 characters (e.g. M becomes F), it reveals `frequency`.',
            'The answer to the Caesar cipher is; Frequency one is eight four seven three nine two Hertz. Fill in this number (847392) in the input field on the page.',
          ]}
          fragment='1'
        />
      )}

      <div className='!mt-6'>
        <TypingAnimation
          lines={[
            "I managed to hide the first frequency in the newspaper. It's interesting what I can access in your timeline from where I am.",
            "Time works differently here, it's not linear like for you. Unfortunately, that also means I'm not sure what edition it was I hid it in.",
            'However, I am pretty sure that it was one of the articles about my old house. I remember seeing a crossword puzzle on the page.',
            "Start at the following link and from there I assume you'll find it.",
            "It took me a whopping seven steps to get it in properly, but I'm confident there are no mistakes. Once you find it, just work your way backwards.",
          ]}
          completed={accessedFragmentOneOnce || showFragmentContent}
          onComplete={() => setShowFragmentContent(true)}
          showTransmissionLabels
        />
        {showFragmentContent && (
          <>
            <div className='w-full h-[1px] bg-[#0f0] !my-4' />

            <TypingAnimation
              lines={[
                "Here I have linked the Whispering Hollows Gazette Archives for you. Once you're done, fill in what you found below.",
              ]}
              completed={accessedFragmentOneOnce}
              onComplete={() => setAccessedFragmentOneOnce(true)}
            />
            <div className='grid grid-cols-1 md:grid-cols-2 w-full'>
              <p className='flex justify-between w-full my-4 md:my-0 flex-col items-center'>
                <span className='block'>Whispering Hollows Gazette:</span>
                <Link
                  href={`${process.env.NEXT_PUBLIC_GAZETTE_URL}/whispering-hollows-gazette?q=hollowbrook`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline hover:underline-offset-4 transition-all duration-300 ease-in-out my-2'
                >
                  {`${process.env.NEXT_PUBLIC_GAZETTE_URL}/whispering-hollows-gazette?q=hollowbrook`}
                </Link>
              </p>
              <form className='flex items-end mx-auto w-fit flex-col gap-y-2' onSubmit={onSubmit}>
                <div>
                  <DashboardInput
                    placeholder='______'
                    disabled={frequencyOne !== null}
                    className='text-right tracking-[0.3em]'
                    value={value}
                    onChange={(e) => {
                      if (error) setError('');
                      setValue(e.target.value);
                    }}
                  />
                  <span className='inline-block ml-[1ch]'>Hz</span>
                </div>
                <DashboardButton type='submit' className='mr-[3ch]'>
                  Submit
                </DashboardButton>
                {error && (
                  <p className="justify-end before:content-['⚠'] flex items-center before:relative before:top-[1px] before:inline-block before:mr-2 mt-4 mr-[3ch]">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default FragmentOne;
