import { SortOrder } from './types';

export const sortWinner = (sortedOption: HTMLTableCellElement): SortOrder => {
  if (sortedOption.classList.contains('sort-desc')) {
    sortedOption.classList.remove('sort-desc');
    sortedOption.classList.add('sort-asc');
    return SortOrder.ASC;
  }
  if (sortedOption.classList.contains('sort-asc')) {
    sortedOption.classList.remove('sort-asc');
    sortedOption.classList.add('sort-desc');
    return SortOrder.DESC;
  }
  sortedOption.classList.add('sort-desc');
  return SortOrder.DESC;
};
