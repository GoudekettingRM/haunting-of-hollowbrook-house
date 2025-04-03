'use client';
import DashboardButton from '@/components/DashboardButton';
import TypingAnimation from '@/components/TypingAnimation';
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useMemo, useState } from 'react';
import AudioPlayer from '../AudioElement';
import { useDashboardPageContext } from '../context/useDashboardPageContext';
import { useFragmentsContext } from '../context/useFragmentsContext';
import { usePuzzleAnswerContext } from '../context/usePuzzleAnswersContext';
import DashboardInput from '../DashboardInput';
import HintSystem from '../Hinter';

const ExecuteProtocol = () => {
  const {
    frequencyOne,
    frequencyTwo,
    frequencyThree,
    freqOnePhaseShift,
    freqTwoPhaseShift,
    freqThreePhaseShift,
    setFreqOnePhaseShift,
    setFreqThreePhaseShift,
    setFreqTwoPhaseShift,
  } = usePuzzleAnswerContext();
  const [showFragmentContent, setShowFragmentContent] = useState(false);
  const { accessedProtocolExecutionOnce, setAccessedProtocolExecutionOnce } = useFragmentsContext();
  const { setFinished } = useDashboardPageContext();

  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const answers = [212, 327, 269];

    const shifts = [freqOnePhaseShift, freqTwoPhaseShift, freqThreePhaseShift]
      .map((freq, index) => {
        if (freq === null) {
          return 'missing';
        }
        if (freq !== answers[index]) {
          return 'incorrect';
        }
        return null;
      })
      .filter(Boolean);

    if (shifts.length === 0) {
      setFinished(true);
      return;
    }

    const errorMessage = shifts.map((shift, index) => {
      if (shift === 'missing') {
        return `Frequency ${index + 1} phase shift is missing`;
      }
      return `Frequency ${index + 1} phase shift is incorrect`;
    });
    setError(errorMessage.join(', '));
  };

  const showFinalPuzzle = useMemo(() => {
    return Boolean(frequencyOne) && Boolean(frequencyTwo) && Boolean(frequencyThree);
  }, [frequencyOne, frequencyTwo, frequencyThree]);

  const handleChange = (
    fn: Dispatch<SetStateAction<number | null>>,
  ): ((event: ChangeEvent<HTMLInputElement>) => void) => {
    return (event) => {
      if (event.target.value === '' || isNaN(Number(event.target.value)) || Number(event.target.value) < 0) {
        fn(null);
      } else {
        fn(Number(event.target.value));
      }
    };
  };

  return (
    <>
      {showFragmentContent && (
        <HintSystem
          className='absolute top-0 right-0'
          hints={[
            'It seems this audio fragment is only one half of the conversation. There should be another audio fragment somewhere.',
            'Is there another place where you found an audio fragment?',
            'You can find the first audio fragment in the initial E-mail from Robin.',
            'What is the significance of the quiet parts in the audio fragments?',
            'What happens if you play both audio fragments at the same time?',
            'What needs to happen to the phase shifts to cancel out the frequencies?',
            'What are the phase shifts for the three frequencies mentioned in the audio fragments?',
            'What do you get when you adjust the phase shifts mentioned with the correction mentioned?',
            'If you add 180 to the mentioned phase shifts, what do you get?',
            'The correct phase shifts for canceling out the frequencies are 32 + 180 (212), 147 + 180 (327), and 89 + 180 (269), respectively.',
          ]}
          fragment='protocol-execution'
        />
      )}
      {showFinalPuzzle && (
        <>
          <TypingAnimation
            lines={[
              "You did it. You found all the frequencies. We're so close to severing the connection.",
              "The last thing to do it figure out the right phase shifts to cancel out the signal. We both don't remember the exact values... It has been so long...",
              'Margaret mentioned there was a recording of her and a friend of hers discussing them. Unfortunately I could only recover half of the conversation...',
              "I'm sure you can figure it out. Once you have the correct phase shifts, you can finally sever the connection and end the agony we have been in for the last decades.",
            ]}
            completed={accessedProtocolExecutionOnce || showFragmentContent}
            onComplete={() => {
              setShowFragmentContent(true);
              setAccessedProtocolExecutionOnce(true);
            }}
            showTransmissionLabels
          />
          {showFragmentContent && (
            <>
              <AudioPlayer src='/MargaretPartSpacedNoised.mp3' className='max-w-80 mx-auto !mt-4' />
              <form onSubmit={handleSubmit} className='flex items-center justify-center flex-wrap'>
                <div className='mt-4 w-full h-1'></div>
                <div className={`flex gap-10 mb-4 ${showFinalPuzzle ? '' : 'mx-auto shrink-0'}`}>
                  <label className='flex gap-2 flex-col items-start' htmlFor='frequencyOne'>
                    <span className='block'>Frequency 1</span>
                    <div className='flex gap-1 items-center'>
                      <DashboardInput
                        disabled
                        placeholder='______'
                        name='frequencyOne'
                        id='frequencyOne'
                        value={frequencyOne || undefined}
                        className='text-right tracking-[0.3em]'
                      />
                      <span className='block'>Hz</span>
                    </div>
                  </label>
                  {showFinalPuzzle && (
                    <label className='flex gap-2 flex-col items-start' htmlFor='frequencyOnePhaseShift'>
                      <span className='block'>Phase Shift</span>
                      <div className='flex gap-1 items-center'>
                        <DashboardInput
                          placeholder='___'
                          inputMode='numeric'
                          pattern='[0-9]*'
                          name='frequencyOnePhaseShift'
                          id='frequencyOnePhaseShift'
                          value={freqOnePhaseShift ?? ''}
                          className='text-right tracking-[0.3em]'
                          onChange={handleChange(setFreqOnePhaseShift)}
                        />
                        <span className='block text-3xl'>°</span>
                      </div>
                    </label>
                  )}
                </div>

                <div className={`flex gap-10 mb-4 ${showFinalPuzzle ? '' : 'mx-auto shrink-0'}`}>
                  <label className='flex gap-2 flex-col items-start' htmlFor='frequencyTwo'>
                    <span className='block'>Frequency 2</span>
                    <div className='flex gap-1 items-center'>
                      <DashboardInput
                        disabled
                        placeholder='______'
                        name='frequencyTwo'
                        id='frequencyTwo'
                        value={frequencyTwo || undefined}
                        className='text-right tracking-[0.3em]'
                      />
                      <span className='block'>Hz</span>
                    </div>
                  </label>
                  {showFinalPuzzle && (
                    <label className='flex gap-2 flex-col items-start' htmlFor='frequencyTwoPhaseShift'>
                      <span className='block'>Phase Shift</span>
                      <div className='flex gap-1 items-center'>
                        <DashboardInput
                          placeholder='___'
                          inputMode='numeric'
                          pattern='[0-9]*'
                          name='frequencyTwoPhaseShift'
                          id='frequencyTwoPhaseShift'
                          value={freqTwoPhaseShift ?? ''}
                          className='text-right tracking-[0.3em]'
                          onChange={handleChange(setFreqTwoPhaseShift)}
                        />
                        <span className='block text-3xl'>°</span>
                      </div>
                    </label>
                  )}
                </div>
                <div className={`flex gap-10 mb-2 ${showFinalPuzzle ? '' : 'mx-auto shrink-0'}`}>
                  <label className='flex gap-2 flex-col items-start' htmlFor='frequencyThree'>
                    <span className='block'>Frequency 3</span>
                    <div className='flex gap-1 items-center'>
                      <DashboardInput
                        disabled
                        placeholder='______'
                        name='frequencyThree'
                        id='frequencyThree'
                        value={frequencyThree || undefined}
                        className='text-right tracking-[0.3em]'
                      />
                      <span className='block'>Hz</span>
                    </div>
                  </label>
                  {showFinalPuzzle && (
                    <label className='flex gap-2 flex-col items-start' htmlFor='frequencyThreePhaseShift'>
                      <span className='block'>Phase Shift</span>
                      <div className='flex gap-1 items-center'>
                        <DashboardInput
                          placeholder='___'
                          inputMode='numeric'
                          pattern='[0-9]*'
                          name='frequencyThreePhaseShift'
                          id='frequencyThreePhaseShift'
                          value={freqThreePhaseShift ?? ''}
                          className='text-right tracking-[0.3em]'
                          onChange={handleChange(setFreqThreePhaseShift)}
                        />
                        <span className='block text-3xl'>°</span>
                      </div>
                    </label>
                  )}
                </div>
                {showFinalPuzzle && (
                  <div className='w-full flex justify-center'>
                    <DashboardButton type='submit' className='mt-4'>
                      Sever the connection
                    </DashboardButton>
                  </div>
                )}
                {error && (
                  <p className="w-full justify-center before:content-['⚠'] flex items-center before:relative before:top-[1px] before:inline-block before:mr-2 mt-4 mr-[3ch]">
                    {error}
                  </p>
                )}
              </form>
            </>
          )}
        </>
      )}
    </>
  );
};
export default ExecuteProtocol;
