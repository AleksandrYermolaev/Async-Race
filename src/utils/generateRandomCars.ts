import { Car } from './types';

const carMap = [
  { company: 'Ford', models: ['Mustang', 'Fiesta', 'Focus', 'GT', 'Fusion', 'Mondeo'] },
  { company: 'Opel', models: ['Astra', 'Vectra', 'Signum', 'Corsa', 'Insignia', 'Zafira'] },
  { company: 'Toyota', models: ['Camry', 'Crown', 'Supra', 'Corolla', 'GT86', 'Celica', 'MR2', '2000GT'] },
  { company: 'Tesla', models: ['Model X', 'Model S', 'Model Z'] },
  { company: 'Wolksvagen', models: ['Passat', 'Jetta', 'CC', 'Golf', 'Corrado', 'Scirocco', 'GTI', 'Desert'] },
  {
    company: 'Porshe',
    models: ['Cayene', 'Cayman', '911', 'Panamera', 'GT3', 'Macan Turbo', '718', '918', '968 Turbo S', '914'],
  },
  { company: 'Lamborghini', models: ['Diablo', 'Murchelago', 'Urus', 'Aventador', 'Veneno', 'Gallardo'] },
  { company: 'Buggatti', models: ['Veyron', 'Shiron', 'Divo'] },
  { company: 'Audi', models: ['R8', 'S1', 'RS7', 'RS6', 'RS4', 'RS3', 'TT'] },
  { company: 'BMW', models: ['Z4', 'M5', 'M2', 'M4', 'M6', 'X5', 'X6'] },
  { company: 'Dodge', models: ['Viper', 'Charger', 'Challenger'] },
  { company: 'Honda', models: ['Civic', 'S2000', 'CR-X', 'CR-V'] },
  { company: 'Lotus', models: ['Evija', '3-Eleven', 'Exige S', 'Elise'] },
  { company: 'Mazda', models: ['MX-5', 'RX-8', 'RX-7'] },
  { company: 'Nissan', models: ['Skyline', 'Titan', 'GT-R', '370Z', 'Fairlady', 'Silvia', 'R390', '240SX'] },
];

const generateRandomCarName = (): string => {
  const randomCompanyNumber = Math.round(Math.random() * (carMap.length - 1));
  const randomMarkNumber = Math.round(Math.random() * (carMap[randomCompanyNumber].models.length - 1));
  return `${carMap[randomCompanyNumber].company} ${carMap[randomCompanyNumber].models[randomMarkNumber]}`;
};

const generateRandomCarColor = (): string => {
  const randomRed = Math.floor(Math.random() * 256).toString(16);
  const randomGreen = Math.floor(Math.random() * 256).toString(16);
  const randomBlue = Math.floor(Math.random() * 256).toString(16);
  return `#${randomRed.padStart(2, '0')}${randomGreen.padStart(2, '0')}${randomBlue.padStart(2, '0')}`;
};

export const generateRandomCars = (amount: number = 100): Omit<Car, 'id'>[] => {
  const result = [];
  for (let i = 0; i < 100; i += 1) {
    result.push({
      name: generateRandomCarName(),
      color: generateRandomCarColor(),
    });
  }
  return result;
};
