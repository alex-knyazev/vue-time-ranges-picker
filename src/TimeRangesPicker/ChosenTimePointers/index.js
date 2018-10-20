import { CIRCLE_RADIUS, VIEW_BOX_SIZE, ONE_HOUR_DEGREE } from '../../core/consts';
import { timeNumberToText } from '../../core/helpers';

export default {
  name: 'ChosenTimePointers',

  props: {
    isTwelfthMode: {
      type: Boolean,
      default: () => false,
    },
    movePointers: {
      type: Array,
      required: true,
    },
    chosenTimeColor: {
      type: String,
      required: true,
    },
    pointerColor: {
      type: String,
      required: true,
    },
    activePointerColor: {
      type: String,
      required: true,
    },
    pointerRadius: {
      type: Number,
      required: true,
    },
    activePointerRadius: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      circleRadius: CIRCLE_RADIUS,
      viewBoxSize: VIEW_BOX_SIZE,
      oneHourDegree: ONE_HOUR_DEGREE,
    };
  },

  methods: {
    timeNumberToText,

    handleStartMove(e) {
      this.$emit('startMove', e);
    },
  },
};
