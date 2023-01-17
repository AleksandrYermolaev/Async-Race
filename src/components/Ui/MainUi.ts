import { getCars, getWinners } from 'components/Api';
import { renderGaragePage } from './GarageUi';
import { renderWinnersPage } from './WinnersUi';

export const renderPage = async () => {
  const garageProps = await getCars(1);
  const garageHTML = renderGaragePage(garageProps);
  const winnerProps = await getWinners(1);
  const winnerHTML = await renderWinnersPage(winnerProps);
  return `
  <div class="wrapper">
    <button class="to-garage button" id="to-garage">TO GARAGE</button>
    <button class="to-winners button" id="to-winners">TO WINNERS</button>
    ${garageHTML}
    ${winnerHTML}
    <button class="wrapper__prev button" id="prev-page" disabled>PREV</button>
    <button class="wrapper__next button" id="next-page" disabled>NEXT</button>
  </div>`;
};
