import { getButtonElement } from 'utils/getButtonElement';
import { getCurrentPage } from 'utils/getCurrentPage';
import { getCurrentWinnersPage } from 'utils/getCurrentWiinersPage';
import { getDivElement } from 'utils/getDivElement';
import { getInputElement } from 'utils/getInputElement';
import { getSpanElement } from 'utils/getSpanElement';
import { updateButtonStates } from 'utils/updateButtonStates';
import { updateGarage } from 'utils/updateGarage';
import { updateWinners } from 'utils/updateWinners';
import { createCar, deleteCar, getCar, updateCar } from './Api';

export const listenPageChange = () => {
  const garageBtn = getButtonElement(document, '#to-garage');
  const winnersBtn = getButtonElement(document, '#to-winners');
  const garagePage = getDivElement(document, '.wrapper__garage');
  const winnersPage = getDivElement(document, '.wrapper__winners');
  garageBtn.addEventListener('click', () => {
    garagePage.classList.remove('hide');
    winnersPage.classList.add('hide');
    updateButtonStates();
  });
  winnersBtn.addEventListener('click', () => {
    garagePage.classList.add('hide');
    winnersPage.classList.remove('hide');
    updateButtonStates();
  });
};

export const listenCreateCar = () => {
  const inputName = getInputElement(document, '#set-car-name');
  const inputColor = getInputElement(document, '#set-car-color');
  const createButton = getButtonElement(document, '#create-car');
  const currentPage = getCurrentPage();
  createButton.addEventListener('click', async () => {
    if (inputName.value) {
      await createCar({ name: inputName.value, color: inputColor.value });
      await updateGarage(currentPage);
      inputName.value = '';
      inputColor.value = '#FFFFFF';
    }
  });
};

export const listenUpdateCar = () => {
  const inputName = getInputElement(document, '#update-car-name');
  const inputColor = getInputElement(document, '#update-car-color');
  const updateCarButton = getButtonElement(document, '#update-car');
  const currentPage = getCurrentPage();
  updateCarButton.addEventListener('click', async function updateByClick() {
    if (inputName.value) {
      const carId = Number(updateCarButton.dataset.car);
      await updateCar({
        name: inputName.value,
        color: inputColor.value,
        id: carId,
      });
      await updateGarage(currentPage);
      inputName.disabled = true;
      inputName.value = '';
      inputColor.disabled = true;
      inputColor.value = '#FFFFFF';
      updateCarButton.disabled = true;
    }
  });
};

const listenSelectCar = (
  track: Element,
  inputName: HTMLInputElement,
  inputColor: HTMLInputElement,
  updateCarButton: HTMLButtonElement
): void => {
  const selectBtn = getButtonElement(track, '#select');
  const carId = Number(track.id);
  selectBtn.addEventListener('click', async () => {
    const selectedCar = await getCar(carId);
    inputName.disabled = false;
    inputColor.disabled = false;
    updateCarButton.disabled = false;
    inputName.value = selectedCar.name;
    inputColor.value = selectedCar.color;
    updateCarButton.dataset.car = `${selectedCar.id}`;
  });
};

const listenRemoveCar = (track: Element): void => {
  const removeBtn = getButtonElement(track, '#remove');
  const carId = Number(track.id);
  const currentPage = getCurrentPage();
  removeBtn.addEventListener('click', async () => {
    await deleteCar(carId);
    await updateGarage(currentPage);
  });
};

export const setListenersToCars = () => {
  const tracksCollection = document.querySelectorAll('.car-track');

  const inputName = getInputElement(document, '#update-car-name');
  const inputColor = getInputElement(document, '#update-car-color');
  const updateCarButton = getButtonElement(document, '#update-car');

  tracksCollection.forEach((track) => {
    listenSelectCar(track, inputName, inputColor, updateCarButton);
    listenRemoveCar(track);
  });
};

const paginate = async (garagePage: HTMLDivElement, winnersPage: HTMLDivElement, direction: 1 | -1) => {
  if (!garagePage.classList.contains('hide')) {
    const currentGaragePage = getCurrentPage();
    const currentPageElem = getSpanElement(document, '#page-num');
    currentPageElem.innerHTML = '';
    currentPageElem.textContent = `${currentGaragePage + direction}`;
    await updateGarage(currentGaragePage + direction);
  }
  if (!winnersPage.classList.contains('hide')) {
    const currentWinnersPage = getCurrentWinnersPage();
    await updateWinners(currentWinnersPage + direction);
  }
};

export const listenPagination = () => {
  const prevPageBtn = getButtonElement(document, '#prev-page');
  const nextPageBtn = getButtonElement(document, '#next-page');
  const garagePage = getDivElement(document, '.wrapper__garage');
  const winnersPage = getDivElement(document, '.wrapper__winners');
  nextPageBtn.addEventListener('click', async () => {
    await paginate(garagePage, winnersPage, 1);
  });
  prevPageBtn.addEventListener('click', async () => {
    await paginate(garagePage, winnersPage, -1);
  });
};
