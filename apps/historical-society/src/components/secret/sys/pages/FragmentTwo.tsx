'use client';

import DashboardButton from '@/components/DashboardButton';
import TypingAnimation from '@/components/TypingAnimation';
import { FormEvent, useState } from 'react';
import { useDashboardPageContext } from '../context/useDashboardPageContext';
import { useFragmentsContext } from '../context/useFragmentsContext';
import { usePuzzleAnswerContext } from '../context/usePuzzleAnswersContext';
import DashboardInput from '../DashboardInput';
import HintSystem from '../Hinter';

function FragmentTwo({ onSuccess }: { onSuccess: () => void }) {
  const [showFragmentContent, setShowFragmentContent] = useState(false);
  const { setCompletedPuzzles } = useDashboardPageContext();
  const { accessedFragmentTwoOnce, setAccessedFragmentTwoOnce } = useFragmentsContext();
  const { frequencyTwo, setFrequencyTwo } = usePuzzleAnswerContext();
  const [value, setValue] = useState(frequencyTwo !== null ? frequencyTwo.toString() : '');
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value) {
      setError('No answer provided');
      return;
    }

    if (Number(value) !== 258350) {
      setError('There seems to be an issue with the frequency... Try again...');
      return;
    }
    setFrequencyTwo(258350);
    setCompletedPuzzles((prev) => [...prev, 'emf_readings']);

    onSuccess();
  };
  return (
    <>
      {showFragmentContent && (
        <HintSystem
          className='absolute top-0 right-0'
          hints={[
            'Have you heard the name James Chen before?',
            'I think he must have a blog somewhere... That must be where the articles are.',
            'I found that James Chen actually is the curator of the Historical Society. He has the link to his blog in his email signature.',
            'His blog is hosted on www.betweenapparitions.net',
            'You should be able to search for the lighthouse articles on his blog, in his blog archive.',
            'The first article is called "The Abandoned Lighthouse of Point Pleasant", search for that.',
            'There are four articles about the Lighthouse at Point Pleasant. Each article should have a picture of his EMF reader in there.',
            'The EMF readings combined should tell you the second frequency. I made sure to keep the correct numbers in order, chronologically.',
            'The first EMF reading is 25, the second reading is 8, the third reading is 35, and the last one is 0. Enter 258350 in the input field on the page.',
          ]}
          fragment='2'
        />
      )}

      <div className='!mt-6'>
        <TypingAnimation
          lines={[
            "Great, you got the first frequency. Let's move on to the next one.",
            "I couldn't manage to get the second frequency also in the newspaper, but I a way to generate some electromagnetic interference at a lighthouse.",
            'I figured if I could make it look like some paranormal activity was happening there, and the local news would pick it up. I think it worked, because I see that a man named James Chen went there four times to investigate.',
            'I think he wrote an article about it every single time, but I could not find where he posted these.',
            'If you can find out where he posted these articles about his trips to the lighthouse, I am sure you will find the second frequency.',
          ]}
          completed={accessedFragmentTwoOnce || showFragmentContent}
          onComplete={() => setShowFragmentContent(true)}
          showTransmissionLabels
        />
        {showFragmentContent && (
          <>
            <div className='w-full h-[1px] bg-[#0f0] !my-4' />

            <TypingAnimation
              lines={['Once you find the second frequency, just enter it below.']}
              completed={accessedFragmentTwoOnce}
              onComplete={() => setAccessedFragmentTwoOnce(true)}
            />
            <form className='flex items-start mt-4 w-fit flex-col gap-y-2' onSubmit={onSubmit}>
              <div>
                <DashboardInput
                  placeholder='______'
                  disabled={frequencyTwo !== null}
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
          </>
        )}
      </div>
    </>
  );
}
export default FragmentTwo;
