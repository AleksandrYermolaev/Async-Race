import { getCar } from 'components/Api';
import { Car, GetWinnersResponse, Winner } from 'utils/types';
import { createCar } from './GarageUi';

const WINNERS_CAR_HTML_CLASS = 'table__car';
const WINNERS_CAR_HTML_ID = 'table-car-image';

const createWinner = (winner: Winner, car: Car) => {
  return ` 
  <tr class="table__row">
    <td id="table-id">${winner.id}</td>
    <td>${createCar(car.color, WINNERS_CAR_HTML_CLASS, WINNERS_CAR_HTML_ID)}</td>
    <td id="table-name">${car.name}</td>
    <td id="table-wins">${winner.wins}</td>
    <td id="table-time">${winner.time}</td>
  </tr>`;
};

export const renderWinners = async (winners: Array<Winner>) => {
  let result = '';
  for (const winner of winners) {
    const car = await getCar(winner.id);
    result += createWinner(winner, car);
  }
  return result;
};

export const renderWinnersPage = async (winnersProps: GetWinnersResponse, page = '1') => {
  const winnersTable = await renderWinners(winnersProps.winners);
  return `
  <div class="wrapper__winners winners hide">
    <h1 class="winners__header">Winners (<span id="winners-amount">${winnersProps.amount}</span>)</h1>
    <h2 class="winners__page-num">Page #<span id="winners-page-num">${page}</span></h2>
    <table class="winners__table table">
      <thead>
        <tr class="table__head">
          <td>Number</td>
          <td>Car icon</td>
          <td>Car name</td>
          <td id="sort-wins">Wins</td>
          <td id="sort-time">Best time (sec)</td>
        </tr>
      </thead>
      <tbody id="table-body">
      ${winnersTable}
      </tbody>
    </table>
  </div>`;
};
