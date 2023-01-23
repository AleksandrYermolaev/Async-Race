export const getDivElement = (parentNode: ParentNode, selector: string): HTMLDivElement => {
  const elem = parentNode.querySelector(selector);
  if (!elem) {
    throw new Error('Element does not exists!');
  }
  if (!(elem instanceof HTMLDivElement)) {
    throw new Error('Must be an HTMLDivElement!');
  }
  return elem;
};
