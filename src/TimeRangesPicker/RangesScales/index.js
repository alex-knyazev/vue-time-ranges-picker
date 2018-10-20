import { CIRCLE_RADIUS } from '../../core/consts';

export default {
  name: 'RangesScales',
  props: {
    ranges: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      circleRadius: CIRCLE_RADIUS,
    };
  },
};
