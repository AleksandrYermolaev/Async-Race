import { listenCreateCar, listenPageChange, listenUpdateCar, setListenersToCars } from 'components/Listeners';
import { renderPage } from 'components/Ui/MainUi';
import './index.scss';

const app = async () => {
  const body = document.body;
  body.innerHTML = await renderPage();
  listenPageChange();
  listenCreateCar();
  listenUpdateCar();
  setListenersToCars();
};

app();
