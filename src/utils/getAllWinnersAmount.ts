import { getSpanElement } from './getSpanElement';

export const getAllWinnersAmount = (): number => {
  const currentAmountElem = getSpanElement(document, '#winners-amount');
  return Number(currentAmountElem.textContent);
};
