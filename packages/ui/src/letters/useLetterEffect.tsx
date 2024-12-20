/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { LetterEffect } from './LetterEffects';
import { EffectType, LetterEffectConfig } from './types';

const defaultConfig: LetterEffectConfig = {
  enabled: true,
  frequency: 0.05,
  maxPerPage: 50,
  maxByWordLength: {
    short: {
      max: 1,
      minLength: 3,
      maxLength: 4,
    },
    medium: {
      max: 2,
      minLength: 5,
      maxLength: 7,
    },
    long: {
      max: 3,
      minLength: 8,
    },
  },
  effects: ['fall'],
  skipClasses: ['no-effect', 'code', 'price'],
  skipElements: ['button', 'input', 'textarea', 'code'],
};

export const useLetterEffect = (config: Partial<LetterEffectConfig> = {}) => {
  const mergedConfig = { ...defaultConfig, ...config };
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const getRandomEffect = (): EffectType => {
    const index = Math.floor(Math.random() * mergedConfig.effects.length);
    return mergedConfig.effects[index];
  };

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  const processElement = (element: Element, index: number): JSX.Element => {
    const effect = getRandomEffect();
    const text = element.textContent || '';
    let position = Math.floor(Math.random() * text.length);
    let letter = text[position];

    while (letter === ' ') {
      position = Math.floor(Math.random() * text.length);
      letter = text[position];
    }

    const before = text.slice(0, position);
    const after = text.slice(position + 1);

    // Preserve the parent element structure
    return React.createElement(
      element.tagName.toLowerCase(),
      {
        className: element.className, // Preserve original classes
        ...Array.from(element.attributes).reduce((attrs: any, attr) => {
          if (attr.name !== 'class') {
            // Skip class since we handle it with className
            attrs[attr.name] = attr.value;
          }
          return attrs;
        }, {}),
      },
      [
        before,
        <LetterEffect key='effect' effect={effect} randomBaseDelay={Math.random() * 3000 * index}>
          {letter}
        </LetterEffect>,
        after,
      ],
    );
  };

  return {
    processElement,
    isEnabled: mergedConfig.enabled && !prefersReducedMotion,
    config: mergedConfig,
  };
};
