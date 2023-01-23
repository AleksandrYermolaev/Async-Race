import { getDivElement } from './htmlGetters/getDivElement';
import { RaceWinnerProps } from './types';

const showWinnerMessage = (winner: RaceWinnerProps, modal: HTMLDivElement): void => {
  const finishTime = (winner.raceDuration / 1000).toFixed(2);
  modal.textContent = `${winner.carName} finished first in ${finishTime} seconds!`;
  modal.classList.remove('hide');
};

const hideWinnerMessage = (modal: HTMLDivElement): void => {
  modal.classList.add('hide');
};

export const toggleWinnerMessage = (winner?: RaceWinnerProps): void => {
  const modal = getDivElement(document, '.modal');
  if (modal.classList.contains('hide') && winner) {
    showWinnerMessage(winner, modal);
  } else {
    hideWinnerMessage(modal);
  }
};
