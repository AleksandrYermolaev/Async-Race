import { getCar } from 'components/Api';

export const getCarPropertyByID = async (id: number, prop: 'name' | 'color'): Promise<string> => {
  const car = await getCar(id);
  return car[prop];
};
