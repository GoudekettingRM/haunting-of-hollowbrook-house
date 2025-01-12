import { usePuzzleAnswerContext } from '../context/usePuzzleAnswersContext';
import DashboardInput from '../DashboardInput';

const ExecuteProtocol = () => {
  const { frequencyOne, frequencyTwo, frequencyThree } = usePuzzleAnswerContext();
  return (
    <>
      <div className='mt-4 w-full h-1'></div>
      <div className='flex gap-10'>
        <label className='flex gap-4 items-center'>
          <span className='block'>Frequency 1</span>
          <div className='flex gap-1 items-center'>
            <DashboardInput
              disabled
              placeholder='______'
              value={frequencyOne || undefined}
              className='text-right tracking-[0.3em]'
            />
            <span className='block'>Hz</span>
          </div>
        </label>
        <label className='flex gap-4 items-center'>
          <span className='block'>Phase Shift</span>
          <div className='flex gap-1 items-center'>
            <DashboardInput
              placeholder='___'
              inputMode='numeric'
              pattern='[0-9]*'
              className='text-right tracking-[0.3em]'
            />
            <span className='block text-3xl'>°</span>
          </div>
        </label>
      </div>
      <div className='flex gap-10'>
        <label className='flex gap-4 items-center'>
          <span className='block'>Frequency 2</span>
          <div className='flex gap-1 items-center'>
            <DashboardInput
              disabled
              placeholder='______'
              value={frequencyTwo || undefined}
              className='text-right tracking-[0.3em]'
            />
            <span className='block'>Hz</span>
          </div>
        </label>
        <label className='flex gap-4 items-center'>
          <span className='block'>Phase Shift</span>
          <div className='flex gap-1 items-center'>
            <DashboardInput
              placeholder='___'
              inputMode='numeric'
              pattern='[0-9]*'
              className='text-right tracking-[0.3em]'
            />
            <span className='block text-3xl'>°</span>
          </div>
        </label>
      </div>
      <div className='flex gap-10'>
        <label className='flex gap-4 items-center'>
          <span className='block'>Frequency 3</span>
          <div className='flex gap-1 items-center'>
            <DashboardInput
              disabled
              placeholder='______'
              value={frequencyThree || undefined}
              className='text-right tracking-[0.3em]'
            />
            <span className='block'>Hz</span>
          </div>
        </label>
        <label className='flex gap-4 items-center'>
          <span className='block'>Phase Shift</span>
          <div className='flex gap-1 items-center'>
            <DashboardInput
              placeholder='___'
              inputMode='numeric'
              pattern='[0-9]*'
              className='text-right tracking-[0.3em]'
            />
            <span className='block text-3xl'>°</span>
          </div>
        </label>
      </div>
    </>
  );
};
export default ExecuteProtocol;
