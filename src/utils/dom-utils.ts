export const convertWidthToEM = (widthPX: number): number => widthPX / parseFloat(getBodyFontSize());

// @ts-ignore
const getBodyFontSize = (): string => getComputedStyle(document.querySelector('body'))['font-size'];
