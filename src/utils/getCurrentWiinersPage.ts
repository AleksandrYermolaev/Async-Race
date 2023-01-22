import { getSpanElement } from './htmlGetters/getSpanElement';

export const getCurrentWinnersPage = (): number => {
  const currentPageElem = getSpanElement(document, '#winners-page-num');
  return Number(currentPageElem.textContent);
};
