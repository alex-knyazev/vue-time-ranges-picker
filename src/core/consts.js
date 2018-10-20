export const CIRCLE_LENGTH = 360;
export const HOURS_AMOUNT = 24;
export const ONE_HOUR_DEGREE = CIRCLE_LENGTH / HOURS_AMOUNT;
export const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);
export const CIRCLE_DIAMETER = CIRCLE_RADIUS * 2;
export const CIRCLE_STROKE_WIDTH = 6;
export const VIEW_BOX_SIZE = 180;

export const DEFAULT_VIEW_OPTIONS = {
  chosenTimeColor: 'grey',
  pointerColor: 'white',
  activePointerColor: 'rgba(240, 240, 240, 0.9)',
  pointerRadius: 6,
  activePointerRadius: 5.5,
  circleStrokeWidth: 8,
  hoursMarksColor: 'grey',
  quarterTextColor: 'grey',
};
