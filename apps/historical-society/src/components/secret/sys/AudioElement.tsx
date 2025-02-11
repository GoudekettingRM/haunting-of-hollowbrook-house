import { useRef, useState } from 'react';

const AudioPlayer = ({ src, className = '' }: { src: string; className?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress((audioRef.current.currentTime / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  return (
    <div className={`border border-[#0f0] p-4 font-mono text-[#0f0] bg-black ${className}`}>
      <div className='flex items-center space-x-4'>
        <button
          onClick={togglePlay}
          className={`border border-[#0f0] hover:bg-[#0f0] hover:bg-opacity-20 w-10 h-10 ${isPlaying ? 'text-lg' : ''}`}
        >
          {isPlaying ? '⏸︎' : '►'}
        </button>

        <div className='flex-1'>
          <div className='mb-2 flex justify-between text-sm'>
            <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className='h-2 border border-[#0f0] relative'>
            <div className='absolute top-0 left-0 h-full bg-[#0f0] bg-opacity-50' style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className='hidden'
      />
    </div>
  );
};

export default AudioPlayer;
