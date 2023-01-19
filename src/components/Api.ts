import { ENGINE_ENDPOINT, GARAGE_ENDPOINT, WINNERS_ENDPOINT } from 'utils/constants';
import {
  Car,
  EngineStatus,
  GetCarsResponse,
  GetWinnersResponse,
  SortByParam,
  SortOrder,
  DriveParams,
  Winner,
} from 'utils/types';

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

export const updateCar = async (carProps: Car): Promise<Car> => {
  const response = await fetch(`${GARAGE_ENDPOINT}/${carProps.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: carProps.name, color: carProps.color }),
  });
  return response.json();
};

export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${GARAGE_ENDPOINT}/${id}`, { method: 'DELETE' });
};

export const startStopEngine = async (id: number, status: EngineStatus): Promise<DriveParams> => {
  const response = await fetch(`${ENGINE_ENDPOINT}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  return response.json();
};

export const driveCar = async (id: number, status: EngineStatus): Promise<{ success: boolean }> => {
  const response = await fetch(`${ENGINE_ENDPOINT}?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    return { success: false };
  }
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

export const getWinner = async (id: number): Promise<Response> => {
  const response = await fetch(`${WINNERS_ENDPOINT}/${id}`);
  return response;
};

export const createWinner = async (winner: Winner): Promise<Winner> => {
  const response = await fetch(WINNERS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  });
  return response.json();
};

export const updateWinner = async (winner: Winner): Promise<Winner> => {
  const response = await fetch(`${WINNERS_ENDPOINT}/${winner.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wins: winner.wins, time: winner.time }),
  });
  return response.json();
};

export const deleteWinner = async (id: number): Promise<void> => {
  await fetch(`${WINNERS_ENDPOINT}/${id}`, { method: 'DELETE' });
};
