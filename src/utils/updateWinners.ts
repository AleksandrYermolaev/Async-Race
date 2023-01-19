import { getWinners } from 'components/Api';
import { renderWinners } from 'components/Ui/WinnersUi';
import { getSpanElement } from './getSpanElement';
import { updateButtonStates } from './updateButtonStates';

export const updateWinners = async (page = 1): Promise<void> => {
  const winnersProps = await getWinners(page);
  const winnersTableMarkup = await renderWinners(winnersProps.winners);
  const winnersRows = document.querySelectorAll('.table__row');
  winnersRows.forEach((row) => row.remove());
  const winnersRowsWrapper = document.createElement('tbody');
  winnersRowsWrapper.id = 'table-body';
  winnersRowsWrapper.innerHTML = winnersTableMarkup;
  const winnersTable = document.querySelector('#table-body');
  if (winnersTable) {
    winnersTable.outerHTML = winnersRowsWrapper.outerHTML;
  }
  const winnersAmountElem = getSpanElement(document, '#winners-amount');
  winnersAmountElem.innerHTML = '';
  winnersAmountElem.textContent = winnersProps.amount;
  updateButtonStates();
};
