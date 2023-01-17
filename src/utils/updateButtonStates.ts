import { getAllCarsAmount } from './getAllCarsAmount';
import { getAllWinnersAmount } from './getAllWinnersAmount';
import { getButtonElement } from './getButtonElement';
import { getCurrentPage } from './getCurrentPage';
import { getCurrentWinnersPage } from './getCurrentWiinersPage';
import { getDivElement } from './getDivElement';

const updateNextButtonState = () => {
  const nextPageBtn = getButtonElement(document, '#next-page');
  const currentGaragePage = getCurrentPage();
  const allCarsAmount = getAllCarsAmount();
  const garage = getDivElement(document, '.wrapper__garage');
  if (!garage.classList.contains('hide')) {
    if (allCarsAmount / 7 > currentGaragePage) {
      nextPageBtn.disabled = false;
    } else {
      nextPageBtn.disabled = true;
    }
  }

  const winners = getDivElement(document, '.wrapper__winners');
  const currentWinnersPage = getCurrentWinnersPage();
  const allWinnersAmount = getAllWinnersAmount();
  if (!winners.classList.contains('hide')) {
    if (allWinnersAmount / 10 > currentWinnersPage) {
      nextPageBtn.disabled = false;
    } else {
      nextPageBtn.disabled = true;
    }
  }
};

const updatePrevButtonState = () => {
  const prevPageBtn = getButtonElement(document, '#prev-page');
  const currentPage = getCurrentPage();
  const garage = getDivElement(document, '.wrapper__garage');
  if (!garage.classList.contains('hide')) {
    if (currentPage === 1) {
      prevPageBtn.disabled = true;
    } else {
      prevPageBtn.disabled = false;
    }
  }

  const winners = getDivElement(document, '.wrapper__winners');
  const currentWinnersPage = getCurrentWinnersPage();
  if (!winners.classList.contains('hide')) {
    if (currentWinnersPage === 1) {
      prevPageBtn.disabled = true;
    } else {
      prevPageBtn.disabled = false;
    }
  }
};

export const updateButtonStates = () => {
  updatePrevButtonState();
  updateNextButtonState();
};
