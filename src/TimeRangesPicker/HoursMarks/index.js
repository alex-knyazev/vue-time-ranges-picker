import { CIRCLE_RADIUS, VIEW_BOX_SIZE, HOURS_AMOUNT, ONE_HOUR_DEGREE } from '../../core/consts';

export default {
  name: 'HoursMarks',
  props: {
    hoursMarksColor: {
      type: String,
      required: true,
    },
  },

  data() {
    const marks = [];
    for (let i = 0; i < HOURS_AMOUNT; i++) {
      marks.push({ index: i + 1 });
    }

    return {
      marks,
      circleRadius: CIRCLE_RADIUS,
      viewBoxSize: VIEW_BOX_SIZE,
      oneHourDegree: ONE_HOUR_DEGREE,
    };
  },
};
