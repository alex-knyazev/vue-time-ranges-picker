import addZero from 'add-zero';
import toTwelve from 'twentyfour-to-twelve';
import toTwentyFour from 'twelve-to-twentyfour';

import { VIEW_BOX_SIZE, CIRCLE_RADIUS, HOURS_AMOUNT, ONE_HOUR_DEGREE } from './consts';

export const timeTextToNumber = (timeText, isTwelfthMode) => {
  let parsedTime = timeText;
  if (isTwelfthMode) {
    parsedTime = toTwentyFour(timeText);
  }
  const [hours, minutes] = parsedTime.split(':');
  return parseInt(hours, 10) + parseFloat(minutes / 60, 10);
};

export const timeNumberToText = (timeNumber, isTwelfthMode) => {
  let hours = Math.floor(timeNumber);
  const remainder = timeNumber - hours;
  let minutes = remainder * 60;
  const twentyFourText = addZero(hours) + ':' + addZero(minutes);
  if (isTwelfthMode) {
    return toTwelve(twentyFourText);
  }
  return twentyFourText;
};

export const getTimeByDegree = degree => {
  let time = (degree + 90) / ONE_HOUR_DEGREE;
  if (time >= HOURS_AMOUNT) {
    time = time - HOURS_AMOUNT;
  }
  return time;
};

export const getTimeCoordinates = (time, radiusOffset = 0) => {
  // minus 90 because time starts at top of circle
  let degree = time * ONE_HOUR_DEGREE - 90;
  if (degree <= 0) {
    degree = 360 + degree;
  }
  const x =
    VIEW_BOX_SIZE / 2 + (CIRCLE_RADIUS + radiusOffset) * Math.cos((degree * Math.PI) / 180);
  const y =
    VIEW_BOX_SIZE / 2 + (CIRCLE_RADIUS + radiusOffset) * Math.sin((degree * Math.PI) / 180);
  return {
    degree,
    x,
    y,
  };
};
