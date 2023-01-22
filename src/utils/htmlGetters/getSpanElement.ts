export const getSpanElement = (parentNode: ParentNode, selector: string): HTMLSpanElement => {
  const elem = parentNode.querySelector(selector);
  if (!elem) {
    throw new Error('Element does not exists!');
  }
  if (!(elem instanceof HTMLSpanElement)) {
    throw new Error('Must be an HTMLSpanElement!');
  }
  return elem;
};
