export const getSvgElement = (parentNode: ParentNode, selector: string): SVGElement => {
  const elem = parentNode.querySelector(selector);
  if (!elem) {
    throw new Error('Element does not exists!');
  }
  if (!(elem instanceof SVGElement)) {
    throw new Error('Must be an SVGElement!');
  }
  return elem;
};
