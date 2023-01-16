import { getCars } from 'components/Api';
import { setListenersToCars } from 'components/Listeners';
import { renderTracks } from 'components/Ui/GarageUi';
import { getDivElement } from './getDivElement';
import { getSpanElement } from './getSpanElement';

export const updateGarage = async (page = 1): Promise<void> => {
  const garageProps = await getCars(page);
  const tracksMarkup = renderTracks(garageProps.cars);
  const trackElem = document.createElement('div');
  const carsAmountElem = getSpanElement(document, '#cars-amount');
  const tracksElems = document.querySelectorAll('.car-track');
  const garageElem = getDivElement(document, '.wrapper__garage');
  tracksElems.forEach((track) => track.remove());
  trackElem.innerHTML = tracksMarkup;
  garageElem.append(trackElem);
  carsAmountElem.innerHTML = '';
  carsAmountElem.textContent = garageProps.amount;
  setListenersToCars();
};
