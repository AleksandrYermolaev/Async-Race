import { animateCar } from 'utils/animateCar';
import { generateRandomCars } from 'utils/generateRandomCars';
import { getButtonElement } from 'utils/getButtonElement';
import { getCurrentPage } from 'utils/getCurrentPage';
import { getCurrentWinnersPage } from 'utils/getCurrentWiinersPage';
import { getDivElement } from 'utils/getDivElement';
import { getInputElement } from 'utils/getInputElement';
import { getSpanElement } from 'utils/getSpanElement';
import { EngineStatus } from 'utils/types';
import { updateButtonStates } from 'utils/updateButtonStates';
import { updateGarage } from 'utils/updateGarage';
import { updateWinners } from 'utils/updateWinners';
import { createCar, deleteCar, getCar, startStopEngine, updateCar } from './Api';

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
  createButton.addEventListener('click', async () => {
    if (inputName.value) {
      await createCar({ name: inputName.value, color: inputColor.value });
      await updateGarage(getCurrentPage());
      inputName.value = '';
      inputColor.value = '#FFFFFF';
    }
  });
};

export const listenUpdateCar = () => {
  const inputName = getInputElement(document, '#update-car-name');
  const inputColor = getInputElement(document, '#update-car-color');
  const updateCarButton = getButtonElement(document, '#update-car');
  updateCarButton.addEventListener('click', async function updateByClick() {
    if (inputName.value) {
      const carId = Number(updateCarButton.dataset.car);
      await updateCar({
        name: inputName.value,
        color: inputColor.value,
        id: carId,
      });
      await updateGarage(getCurrentPage());
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
  removeBtn.addEventListener('click', async () => {
    await deleteCar(carId);
    await updateGarage(getCurrentPage());
    await updateWinners(getCurrentWinnersPage());
  });
};

const listenStartEngine = (track: Element) => {
  const startCarBtn = getButtonElement(track, '#accelerate');
  const carId = Number(track.id);
  startCarBtn.addEventListener('click', async () => {
    startCarBtn.disabled = true;
    const driveProps = await startStopEngine(carId, EngineStatus.Started);
    const raceDuration = driveProps.distance / driveProps.velocity;
    animateCar(track, raceDuration);
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
    listenStartEngine(track);
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

export const listenGenerateCars = () => {
  const generateBtn = getButtonElement(document, '#generate');
  generateBtn.addEventListener('click', async () => {
    const generatedCars = generateRandomCars();
    const createCarPromises = generatedCars.map((generatedCar) => createCar(generatedCar));
    await Promise.all(createCarPromises);
    updateGarage(getCurrentPage());
  });
};
