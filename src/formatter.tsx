import { Time } from './types';

export const formatTime = (time: Time) => {
  return {
    minutes: time.minutes < 10 ? '0' + time.minutes.toString() : time.minutes,
    seconds: time.seconds < 10 ? '0' + time.seconds.toString() : time.seconds,
  };
};

export const toSeconds = (minutes: number, seconds: number) => {
  return minutes * 60 + seconds;
};
