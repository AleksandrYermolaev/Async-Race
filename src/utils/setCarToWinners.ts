import { createWinner, getWinner, updateWinner } from 'components/Api';
import { Winner } from './types';

export const setCarToWinners = async (id: number, time: number): Promise<void> => {
  const oldWinnerResponse = await getWinner(id);
  const oldWinnerData: Winner = await oldWinnerResponse.json();
  const finishTime = Number((time / 1000).toFixed(2));
  const sendData: Winner = {
    id: id,
    wins: 0,
    time: 0,
  };
  if (oldWinnerResponse.ok) {
    sendData.wins = oldWinnerData.wins + 1;
    sendData.time = finishTime > oldWinnerData.time ? oldWinnerData.time : finishTime;
    await updateWinner(sendData);
  } else {
    sendData.wins = 1;
    sendData.time = finishTime;
    await createWinner(sendData);
  }
};
