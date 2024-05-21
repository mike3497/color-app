import { colord } from 'colord';

export const getBlackOrWhiteTextColor = (inputColor: string): string => {
  const color = colord(inputColor);
  const blackTextContrastRatio = color.contrast('#000000');
  const whiteTextContrastRatio = color.contrast('#FFFFFF');

  if (blackTextContrastRatio > whiteTextContrastRatio) {
    return '#000000';
  }

  return '#FFFFFF';
};
