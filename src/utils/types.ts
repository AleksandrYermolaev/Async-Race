export type Car = {
  name: string;
  color: string;
  id: number;
};

export type GetCarsResponse = {
  cars: Array<Car>;
  amount: string | null;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type RaceWinnerProps = {
  carId: number;
  carName: string | null;
  raceDuration: number;
};

export type GetWinnersResponse = {
  winners: Array<Winner>;
  amount: string | null;
};

export type DriveParams = {
  velocity: number;
  distance: number;
};

export enum EngineStatus {
  Started = 'started',
  Stopped = 'stopped',
  Drive = 'drive',
}

export enum SortByParam {
  Id = 'id',
  Wins = 'wins',
  Time = 'time',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface ServerAPI {
  BASE_URL: string;
  GARAGE_ENDPOINT: string;
  ENGINE_ENDPOINT: string;
  WINNERS_ENDPOINT: string;
  getCars(page: number, limit?: number): Promise<GetCarsResponse>;
  getCar(id: number): Promise<Car>;
  createCar(name: string, color: string): Car;
  deleteCar(id: number): void;
  updateCar(id: number, name: string, color: string): Car;
  startStopEngine(id: number, status: EngineStatus): DriveParams;
  driveMode(id: number, status: EngineStatus): void;
  getWinners(
    page: number,
    limit?: number,
    sortParam?: SortByParam,
    order?: SortOrder
  ): { winners: Array<Winner>; amount: number };
  getWinner(id: number): Winner;
  createWinner(id: number, wins: number, time: number): Winner;
  deleteWinner(id: number): void;
  updateWinner(id: number, wins: number, time: number): Winner;
}
