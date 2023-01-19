import {
  listenCreateCar,
  listenGenerateCars,
  listenPageChange,
  listenPagination,
  listenRace,
  listenReset,
  listenUpdateCar,
  setListenersToCars,
} from 'components/Listeners';
import { renderPage } from 'components/Ui/MainUi';
import { updateButtonStates } from 'utils/updateButtonStates';
import './index.scss';

const app = async () => {
  const body = document.body;
  body.innerHTML = await renderPage();
  listenPageChange();
  listenCreateCar();
  listenUpdateCar();
  setListenersToCars();
  updateButtonStates();
  listenPagination();
  listenGenerateCars();
  listenRace();
  listenReset();
};

app();
