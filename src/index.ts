import {
  listenCreateCar,
  listenGenerateCars,
  listenPageChange,
  listenPagination,
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
};

app();
