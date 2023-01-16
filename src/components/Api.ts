import { GARAGE_ENDPOINT, WINNERS_ENDPOINT } from 'utils/constants';
import { Car, GetCarsResponse, GetWinnersResponse, SortByParam, SortOrder } from 'utils/types';

export const getCars = async (page: number, limit = 7): Promise<GetCarsResponse> => {
  const response = await fetch(`${GARAGE_ENDPOINT}?_page=${page}&_limit=${limit}`);
  return {
    cars: await response.json(),
    amount: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<Car> => {
  const response = await fetch(`${GARAGE_ENDPOINT}/${id}`);
  return response.json();
};

export const createCar = async (carProps: Omit<Car, 'id'>): Promise<Car> => {
  const response = await fetch(GARAGE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carProps),
  });
  return response.json();
};

export const getWinners = async (
  page: number,
  limit = 10,
  sortParam?: SortByParam,
  order?: SortOrder
): Promise<GetWinnersResponse> => {
  const response = await fetch(`${WINNERS_ENDPOINT}?_page=${page}&_limit=${limit}&_sort=${sortParam}&_order=${order}`);
  return {
    winners: await response.json(),
    amount: response.headers.get('X-Total-Count'),
  };
};
