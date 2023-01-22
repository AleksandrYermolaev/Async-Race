import { getWinners } from 'components/Api';
import { renderWinners } from 'components/Ui/WinnersUi';
import { getSpanElement } from './htmlGetters/getSpanElement';
import { SortByParam, SortOrder } from './types';
import { updateButtonStates } from './updateButtonStates';

export const updateWinners = async (
  page = 1,
  limit = 10,
  sortParam?: SortByParam,
  order?: SortOrder
): Promise<void> => {
  const winnersProps = await getWinners(page, limit, sortParam, order);
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
