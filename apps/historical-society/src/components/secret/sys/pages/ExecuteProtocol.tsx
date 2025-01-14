'use client';
import { FormEvent, useState } from 'react';
import { usePuzzleAnswerContext } from '../context/usePuzzleAnswersContext';
import DashboardInput from '../DashboardInput';

const ExecuteProtocol = () => {
  const { frequencyOne, frequencyTwo, frequencyThree } = usePuzzleAnswerContext();
  const [freqOnePhaseShift, setFreqOnePhaseShift] = useState('');
  const [freqTwoPhaseShift, setFreqTwoPhaseShift] = useState('');
  const [freqThreePhaseShift, setFreqThreePhaseShift] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const state = {
      frequencyOne,
      frequencyTwo,
      frequencyThree,
      freqOnePhaseShift,
      freqTwoPhaseShift,
      freqThreePhaseShift,
    };

    return state;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-4 w-full h-1'></div>
      <div className='flex gap-10'>
        <label className='flex gap-4 items-center' htmlFor='frequencyOne'>
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
        <label className='flex gap-4 items-center' htmlFor='frequencyOnePhaseShift'>
          <span className='block'>Phase Shift</span>
          <div className='flex gap-1 items-center'>
            <DashboardInput
              placeholder='___'
              inputMode='numeric'
              pattern='[0-9]*'
              name='frequencyOnePhaseShift'
              id='frequencyOnePhaseShift'
              value={freqOnePhaseShift}
              className='text-right tracking-[0.3em]'
              onChange={(e) => setFreqOnePhaseShift(e.target.value)}
            />
            <span className='block text-3xl'>°</span>
          </div>
        </label>
      </div>

      <div className='flex gap-10'>
        <label className='flex gap-4 items-center' htmlFor='frequencyTwo'>
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
        <label className='flex gap-4 items-center' htmlFor='frequencyTwoPhaseShift'>
          <span className='block'>Phase Shift</span>
          <div className='flex gap-1 items-center'>
            <DashboardInput
              placeholder='___'
              inputMode='numeric'
              pattern='[0-9]*'
              name='frequencyTwoPhaseShift'
              id='frequencyTwoPhaseShift'
              value={freqTwoPhaseShift}
              className='text-right tracking-[0.3em]'
              onChange={(e) => setFreqTwoPhaseShift(e.target.value)}
            />
            <span className='block text-3xl'>°</span>
          </div>
        </label>
      </div>
      <div className='flex gap-10'>
        <label className='flex gap-4 items-center' htmlFor='frequencyThree'>
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
        <label className='flex gap-4 items-center' htmlFor='frequencyThreePhaseShift'>
          <span className='block'>Phase Shift</span>
          <div className='flex gap-1 items-center'>
            <DashboardInput
              placeholder='___'
              inputMode='numeric'
              pattern='[0-9]*'
              name='frequencyThreePhaseShift'
              id='frequencyThreePhaseShift'
              value={freqThreePhaseShift}
              className='text-right tracking-[0.3em]'
              onChange={(e) => setFreqThreePhaseShift(e.target.value)}
            />
            <span className='block text-3xl'>°</span>
          </div>
        </label>
      </div>
    </form>
  );
};
export default ExecuteProtocol;
