const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export const encode = (str: string, shift: number): string => {
  const useableShift = ((shift % alphabet.length) + alphabet.length) % alphabet.length;

  return str
    .toLowerCase()
    .split('')
    .map((char) => {
      const index = alphabet.indexOf(char);
      if (index === -1) {
        return char;
      }
      return alphabet[(index + useableShift) % alphabet.length];
    })
    .join('');
};

export const decode = (str: string, shift: number): string => {
  const useableShift = ((-shift % alphabet.length) + alphabet.length) % alphabet.length;

  return str
    .toLowerCase()
    .split('')
    .map((char) => {
      const index = alphabet.indexOf(char);
      if (index === -1) {
        return char;
      }
      return alphabet[(index + useableShift) % alphabet.length];
    })
    .join('');
};
