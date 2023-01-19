import { animateCar, animationId } from 'utils/animateCar';
import { generateRandomCars } from 'utils/generateRandomCars';
import { getButtonElement } from 'utils/getButtonElement';
import { getCurrentPage } from 'utils/getCurrentPage';
import { getCurrentWinnersPage } from 'utils/getCurrentWiinersPage';
import { getDivElement } from 'utils/getDivElement';
import { getInputElement } from 'utils/getInputElement';
import { getSpanElement } from 'utils/getSpanElement';
import { getSvgElement } from 'utils/getSvgElement';
import { setCarToWinners } from 'utils/setCarToWinners';
import { toggleErrorMessage } from 'utils/toggleErrorMessage';
import { toggleWinnerMessage } from 'utils/toggleWinnerMessage';
import { EngineStatus, RaceWinnerProps } from 'utils/types';
import { updateButtonStates } from 'utils/updateButtonStates';
import { updateGarage } from 'utils/updateGarage';
import { updateWinners } from 'utils/updateWinners';
import { createCar, deleteCar, deleteWinner, getCar, startStopEngine, updateCar } from './Api';

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
  winnersBtn.addEventListener('click', async () => {
    await updateWinners(getCurrentWinnersPage());
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
    await deleteWinner(carId);
    await updateGarage(getCurrentPage());
    await updateWinners(getCurrentWinnersPage());
  });
};

const startEngine = async (track: Element) => {
  const startCarBtn = getButtonElement(track, '#accelerate');
  const stopCarBtn = getButtonElement(track, '#brake');
  const carId = Number(track.id);
  const carName = getSpanElement(track, '#car-name').textContent;
  startCarBtn.disabled = true;
  const driveProps = await startStopEngine(carId, EngineStatus.Started);
  const raceDuration = driveProps.distance / driveProps.velocity;
  stopCarBtn.disabled = false;
  if (await animateCar(track, raceDuration)) {
    return Promise.resolve({ carId, carName, raceDuration });
  } else {
    return Promise.reject(`${carName}'s (id ${carId}) engine broke down`);
  }
};

const stopEngine = async (track: Element): Promise<void> => {
  const startCarBtn = getButtonElement(track, '#accelerate');
  const stopCarBtn = getButtonElement(track, '#brake');
  const carElem = getSvgElement(track, '#car-image');
  const carId = Number(track.id);
  stopCarBtn.disabled = true;
  await startStopEngine(carId, EngineStatus.Stopped);
  window.cancelAnimationFrame(animationId.id);
  carElem.style.transform = `translateX(0)`;
  startCarBtn.disabled = false;
};

const listenStartStopEngine = (track: Element) => {
  const startCarBtn = getButtonElement(track, '#accelerate');
  const stopCarBtn = getButtonElement(track, '#brake');
  startCarBtn.addEventListener('click', async () => {
    try {
      await startEngine(track);
    } catch (error) {
      console.log(error);
    }
  });
  stopCarBtn.addEventListener('click', async () => {
    await stopEngine(track);
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
    listenStartStopEngine(track);
  });
};

const paginate = async (garagePage: HTMLDivElement, winnersPage: HTMLDivElement, direction: 1 | -1) => {
  if (!garagePage.classList.contains('hide')) {
    const currentPageElem = getSpanElement(document, '#page-num');
    currentPageElem.textContent = `${getCurrentPage() + direction}`;
    await updateGarage(getCurrentPage());
  }
  if (!winnersPage.classList.contains('hide')) {
    const currentPageElem = getSpanElement(document, '#winners-page-num');
    currentPageElem.textContent = `${getCurrentWinnersPage() + direction}`;
    await updateWinners(getCurrentWinnersPage());
  }
};

export const listenPagination = (): void => {
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

export const listenGenerateCars = (): void => {
  const generateBtn = getButtonElement(document, '#generate');
  generateBtn.addEventListener('click', async () => {
    const generatedCars = generateRandomCars();
    const createCarPromises = generatedCars.map((generatedCar) => createCar(generatedCar));
    await Promise.all(createCarPromises);
    updateGarage(getCurrentPage());
  });
};

export const listenRace = () => {
  const raceBtn = getButtonElement(document, '#race');
  const resetBtn = getButtonElement(document, '#reset');
  raceBtn.addEventListener('click', async () => {
    raceBtn.disabled = true;
    const tracksCollection = document.querySelectorAll('.car-track');
    const racePromises = Array.from(tracksCollection).map((track) => startEngine(track));
    let raceWinner: RaceWinnerProps = {
      carId: 0,
      carName: null,
      raceDuration: 0,
    };
    try {
      raceWinner = await Promise.any(racePromises);
      toggleWinnerMessage(raceWinner);
      await setCarToWinners(raceWinner.carId, raceWinner.raceDuration);
    } catch (error) {
      toggleErrorMessage();
    } finally {
      resetBtn.disabled = false;
    }
  });
};

export const listenReset = () => {
  const resetBtn = getButtonElement(document, '#reset');
  const raceBtn = getButtonElement(document, '#race');
  resetBtn.addEventListener('click', async () => {
    resetBtn.disabled = true;
    const tracksCollection = document.querySelectorAll('.car-track');
    const resetPromises = Array.from(tracksCollection).map((track) => stopEngine(track));
    await Promise.all(resetPromises);
    toggleWinnerMessage();
    raceBtn.disabled = false;
  });
};
