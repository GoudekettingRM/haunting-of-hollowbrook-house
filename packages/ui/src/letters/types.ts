export type EffectType = 'fall' | 'fade' | 'scatter';

export interface LetterEffectConfig {
  enabled: boolean;
  frequency: number; // How often letters are chosen to animate
  maxPerPage: number; // Maximum animated letters per page
  maxByWordLength: {
    short: {
      // 3-4 letters
      max: number;
      minLength: number;
      maxLength: number;
    };
    medium: {
      // 5-7 letters
      max: number;
      minLength: number;
      maxLength: number;
    };
    long: {
      // 8+ letters
      max: number;
      minLength: number;
    };
  };
  effects: EffectType[];
  skipClasses: string[];
  skipElements: string[];
}

export interface AnimatedLetter {
  type: 'animated';
  letter: string;
  effect: EffectType;
  key: string;
}

export type ProcessedWord = string | (string | AnimatedLetter)[];
export type ProcessedText = ProcessedWord[] | null;
