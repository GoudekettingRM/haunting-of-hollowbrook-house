'use client';
import DashboardButton from '@/components/DashboardButton';
import TypingAnimation from '@/components/TypingAnimation';
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

    if (Number(value) !== 147577) {
      setError('There seems to be an issue with the frequency... Try again...');
      return;
    }
    setFrequencyThree(147577);
    setCompletedPuzzles((prev) => [...prev, 'wikipedia_search']);

    onSuccess();
  };

  return (
    <>
      {showFragmentContent && (
        <HintSystem
          className='absolute top-0 right-0'
          hints={[
            'Where would you be able to find information about Christopher Crawley?',
            'Try searching for Christopher Crawley on Google.',
            'If you cannot find anything that seems to fit, try adding Australia to the search query.',
            'Can you find a homestead located in Australia that was built by Christopher William Crawley?',
            "The homestead we're looking for is the Monte Cristo Homestead in Junee Australia.",
            'Here is the link to information about the Monte Cristo Homestead: https://tinyurl.com/monte-cristo-homestead',
            'The frequency we are looking for is the longitude of the Monte Cristo Homestead.',
            'Longitude is a coordinate that specifies the east-west position of a point on the Earth, indicated with the letter `E` or `W`.',
            'The longitude of the Monte Cristo Homestead is 147.577°E. This is the six-digit frequency we are looking for.',
          ]}
          fragment='3'
        />
      )}

      <div className='!mt-6'>
        <TypingAnimation
          lines={[
            "Exquisite! You've made it to the final fragment. This one is a bit tricky, but I'm sure you can handle it.",
            "I couldn't insert any information in your timeline this time, but I did find a different way to get you the information you need.",
            'An old friend of mine used to live in a homestead in Australia. A crazy fellow he was. Quite eccentric if I say so myself, but a good friend nonetheless.',
            'I cannot recall exactly what he called his home, but I do remember it was named after a famous novel. I think it had something to do with a `count` of some sort. He was a bit of a bookworm.',
            'Anyways, I believe the frequency we are looking for is the longitude of the homestead, it matches the frequency we are looking for exactly.',
            'Oh, I almost forgot! That friend of mine was called Christopher. Christopher Crawley.',
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
            <div className='mt-8'>
              <form className='flex items-start w-fit flex-col gap-y-2' onSubmit={onSubmit}>
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
