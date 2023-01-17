import { getSpanElement } from './getSpanElement';

export const getAllCarsAmount = (): number => {
  const currentAmountElem = getSpanElement(document, '#cars-amount');
  return Number(currentAmountElem.textContent);
};
