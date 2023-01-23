import { getSpanElement } from './htmlGetters/getSpanElement';

export const getAllCarsAmount = (): number => {
  const currentAmountElem = getSpanElement(document, '#cars-amount');
  return Number(currentAmountElem.textContent);
};
