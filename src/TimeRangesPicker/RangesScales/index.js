import { CIRCLE_RADIUS } from '../../core/consts';

export default {
  name: 'RangesScales',
  props: {
    ranges: {
      type: Array,
      required: true,
    },
    circleStrokeWidth: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      circleRadius: CIRCLE_RADIUS,
    };
  },
};
