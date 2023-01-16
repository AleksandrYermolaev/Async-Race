import { listenPageChange } from 'components/Listeners';
import { renderPage } from 'components/Ui/MainUi';
import './index.scss';

const app = async () => {
  const body = document.body;
  body.innerHTML = await renderPage();
  listenPageChange();
};

app();
