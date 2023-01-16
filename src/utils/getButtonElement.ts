export const getButtonElement = (parentNode: ParentNode, selector: string): HTMLButtonElement => {
  const elem = parentNode.querySelector(selector);
  if (!elem) {
    throw new Error('Element does not exists!');
  }
  if (!(elem instanceof HTMLButtonElement)) {
    throw new Error('Must be an HTMLButtonElement!');
  }
  return elem;
};
