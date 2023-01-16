import { getButtonElement } from 'utils/getButtonElement';
import { getDivElement } from 'utils/getDivElement';

export const listenPageChange = () => {
  const garageBtn = getButtonElement(document, '#to-garage');
  const winnersBtn = getButtonElement(document, '#to-winners');
  const garagePage = getDivElement(document, '.wrapper__garage');
  const winnersPage = getDivElement(document, '.wrapper__winners');
  garageBtn.addEventListener('click', () => {
    garagePage.classList.remove('hide');
    winnersPage.classList.add('hide');
  });
  winnersBtn.addEventListener('click', () => {
    garagePage.classList.add('hide');
    winnersPage.classList.remove('hide');
  });
};
