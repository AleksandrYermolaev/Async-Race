import { getButtonElement } from 'utils/getButtonElement';
import { getCurrentPage } from 'utils/getCurrentPage';
import { getDivElement } from 'utils/getDivElement';
import { getInputElement } from 'utils/getInputElement';
import { updateGarage } from 'utils/updateGarage';
import { createCar, getCar, updateCar } from './Api';

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

export const setListenersToCars = () => {
  const tracksCollection = document.querySelectorAll('.car-track');
  const inputName = getInputElement(document, '#update-car-name');
  const inputColor = getInputElement(document, '#update-car-color');
  const updateCarButton = getButtonElement(document, '#update-car');
  tracksCollection.forEach((track) => {
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
  });
};
