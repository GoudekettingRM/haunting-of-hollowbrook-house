'use client';
import { DEFAULT_OPTIONS, PUZZLE_ANSWERS_CONTEXT_COOKIE_NAME } from '@/utils/cookieConfig';
import Cookies from 'js-cookie';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

interface PuzzleAnswerContextType {
  frequencyOne: number | null;
  setFrequencyOne: Dispatch<SetStateAction<number | null>>;
  frequencyTwo: number | null;
  setFrequencyTwo: Dispatch<SetStateAction<number | null>>;
  frequencyThree: number | null;
  setFrequencyThree: Dispatch<SetStateAction<number | null>>;
  freqOnePhaseShift: number | null;
  setFreqOnePhaseShift: Dispatch<SetStateAction<number | null>>;
  freqTwoPhaseShift: number | null;
  setFreqTwoPhaseShift: Dispatch<SetStateAction<number | null>>;
  freqThreePhaseShift: number | null;
  setFreqThreePhaseShift: Dispatch<SetStateAction<number | null>>;
}

const PuzzleAnswerContext = createContext<PuzzleAnswerContextType | undefined>(undefined);

export function PuzzleAnswerContextProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [frequencyOne, setFrequencyOne] = useState<number | null>(null);
  const [frequencyTwo, setFrequencyTwo] = useState<number | null>(null);
  const [frequencyThree, setFrequencyThree] = useState<number | null>(null);
  const [freqOnePhaseShift, setFreqOnePhaseShift] = useState<number | null>(null);
  const [freqTwoPhaseShift, setFreqTwoPhaseShift] = useState<number | null>(null);
  const [freqThreePhaseShift, setFreqThreePhaseShift] = useState<number | null>(null);

  useEffect(() => {
    if (!loaded) return;
    const state = {
      frequencyOne,
      frequencyTwo,
      frequencyThree,
    };
    Cookies.set(PUZZLE_ANSWERS_CONTEXT_COOKIE_NAME, JSON.stringify(state), DEFAULT_OPTIONS);
  }, [frequencyOne, frequencyTwo, frequencyThree]);

  useEffect(() => {
    const cookie = Cookies.get(PUZZLE_ANSWERS_CONTEXT_COOKIE_NAME);

    if (cookie) {
      const state: {
        frequencyOne: number | null;
        frequencyTwo: number | null;
        frequencyThree: number | null;
      } = JSON.parse(cookie);
      setFrequencyOne(state.frequencyOne);
      setFrequencyTwo(state.frequencyTwo);
      setFrequencyThree(state.frequencyThree);
    }
    setLoaded(true);
  }, []);

  return (
    <PuzzleAnswerContext.Provider
      value={{
        frequencyOne,
        setFrequencyOne,
        frequencyTwo,
        setFrequencyTwo,
        frequencyThree,
        setFrequencyThree,
        freqOnePhaseShift,
        setFreqOnePhaseShift,
        freqTwoPhaseShift,
        setFreqTwoPhaseShift,
        freqThreePhaseShift,
        setFreqThreePhaseShift,
      }}
    >
      {children}
    </PuzzleAnswerContext.Provider>
  );
}

export function usePuzzleAnswerContext() {
  const context = useContext(PuzzleAnswerContext);
  if (!context) {
    throw new Error('usePuzzleAnswerContext must be used within a PuzzleAnswerContextProvider');
  }
  return context;
}
