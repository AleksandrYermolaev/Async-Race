import { driveCar } from 'components/Api';
import { getSvgElement } from './getSvgElement';
import { EngineStatus } from './types';

const tryDriveCar = async (carId: number): Promise<boolean> => {
  const { success } = await driveCar(carId, EngineStatus.Drive);
  return success;
};

const brokeCarEngine = (success: boolean, animation: number): boolean => {
  if (!success) {
    cancelAnimationFrame(animation);
    return false;
  }
  return true;
};

export const animationId = { id: 0 };

export const animateCar = async (track: Element, duration: number): Promise<boolean> => {
  const finishElem = getSvgElement(track, '.field__finish');
  const carElem = getSvgElement(track, '#car-image');
  const carId = Number(track.id);
  const finishX = finishElem.getBoundingClientRect().x + finishElem.getBoundingClientRect().width;
  const startX = carElem.getBoundingClientRect().x;
  const raceDistance = finishX - startX;
  let startMove = 0;
  let animation: number;

  const moveCar = (timestamp: number) => {
    if (!startMove) startMove = timestamp;
    const timeInMove = timestamp - startMove;
    const moveDistance = (raceDistance / duration) * timeInMove;
    carElem.style.transform = `translateX(${Math.min(moveDistance, raceDistance)}px)`;
    if (timeInMove < duration) {
      animation = requestAnimationFrame(moveCar);
    }
    animationId.id = animation;
  };

  animation = requestAnimationFrame(moveCar);
  return brokeCarEngine(await tryDriveCar(carId), animation);
};
