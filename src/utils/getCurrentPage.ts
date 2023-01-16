import { getSpanElement } from './getSpanElement';

export const getCurrentPage = (): number => {
  const currentPageElem = getSpanElement(document, '#page-num');
  return Number(currentPageElem.textContent);
};
