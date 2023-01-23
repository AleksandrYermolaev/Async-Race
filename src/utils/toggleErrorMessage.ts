import { getDivElement } from './htmlGetters/getDivElement';

const showErrorMessage = (modal: HTMLDivElement): void => {
  modal.textContent = `Oh, no! All cars are broken, there are no winner!`;
  modal.classList.remove('hide');
};

const hideErrorMessage = (modal: HTMLDivElement): void => {
  modal.classList.add('hide');
};

export const toggleErrorMessage = (): void => {
  const modal = getDivElement(document, '.modal');
  if (modal.classList.contains('hide')) {
    showErrorMessage(modal);
  } else {
    hideErrorMessage(modal);
  }
};
