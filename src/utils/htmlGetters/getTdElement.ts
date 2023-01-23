export const getTdElement = (parentNode: ParentNode, selector: string): HTMLTableCellElement => {
  const elem = parentNode.querySelector(selector);
  if (!elem) {
    throw new Error('Element does not exists!');
  }
  if (!(elem instanceof HTMLTableCellElement)) {
    throw new Error('Must be an HTMLTableCellElement!');
  }
  return elem;
};
