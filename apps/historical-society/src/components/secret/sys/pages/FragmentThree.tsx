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

function FragmentThree({ onSuccess }: { onSuccess: () => void }) {
  const [showFragmentContent, setShowFragmentContent] = useState(false);
  const { setCompletedPuzzles } = useDashboardPageContext();
  const { accessedFragmentThreeOnce, setAccessedFragmentThreeOnce } = useFragmentsContext();
  const { frequencyThree, setFrequencyThree } = usePuzzleAnswerContext();
  const [value, setValue] = useState(frequencyThree !== null ? frequencyThree.toString() : '');
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value) {
      setError('No answer provided');
      return;
    }

    if (Number(value) !== 241872) {
      setError('There seems to be an issue with the frequency... Try again...');
      return;
    }
    setFrequencyThree(241872);
    setCompletedPuzzles((prev) => [...prev, 'wikipedia_search']);

    onSuccess();
  };

  return (
    <>
      {showFragmentContent && (
        <HintSystem
          className='absolute top-0 right-0'
          hints={[
            'Make sure to look at the article of March 15, 2004. That shows the entrance to the estate.',
            'Can you find some numbers in the article related to the entrance to the estate?',
            'What countable elements are there?',
            'In the image caption, you are being told most numbers.',
            "Don't forget, we need 6 digits.",
            'The elements of interest are the arches, towers, merlons, bollards, and the compass.',
            'The numbers related to these are, respectively, 2, 2, 7, 4, and 18.',
            'What could it mean to order them alphabetically?',
            'If you order the names alphabetically, you get: arches, bollards, compass, merlons, and towers. This gives you the frequency: 2 4 18 7 2.',
          ]}
          fragment='3'
        />
      )}

      <div className='!mt-6'>
        <TypingAnimation
          lines={[
            "Exquisite! You've made it to the final fragment. This one is a bit tricky, but I'm sure you can handle it.",
            'Margaret and I worked together on this one. The last frequency is hidden in the entrance to the estate.',
            'We hid it in plain sight, but you need to know where to look.',
            'Each element of is a number in the frequency, and by ordering them alphabetically, you find the answer.',
            'It was even in the newspaper. I linked it below for you again in case you need it.',
          ]}
          completed={accessedFragmentThreeOnce || showFragmentContent}
          onComplete={() => {
            setAccessedFragmentThreeOnce(true);
            setShowFragmentContent(true);
          }}
          showTransmissionLabels
        />
        {showFragmentContent && (
          <>
            <div className='w-full h-[1px] bg-[#0f0] !my-4' />
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
                    disabled={frequencyThree !== null}
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
export default FragmentThree;
