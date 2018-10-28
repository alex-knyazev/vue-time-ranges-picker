import { VIEW_BOX_SIZE } from '../../core/consts';
import { getTimeCoordinates } from '../../core/helpers';

export default {
  name: 'QuartersTexts',
  props: {
    isTwelfthMode: {
      type: Boolean,
      default: () => false,
    },
    quarterTextColor: {
      type: String,
      required: true,
    },
  },

  data() {
    const offsetRadius = -15;
    return {
      viewBoxSize: VIEW_BOX_SIZE,
      offsetRadius,
    };
  },

  computed: {
    quarterTexts() {
      const { offsetRadius } = this;
      let quarterTexts = [
        {
          name: '06:00',
          ...getTimeCoordinates(6, offsetRadius),
        },
        {
          name: '12:00',
          ...getTimeCoordinates(12, offsetRadius),
        },
        {
          name: '06:00',
          ...getTimeCoordinates(18, offsetRadius),
        },
        {
          name: '12:00',
          ...getTimeCoordinates(0, offsetRadius),
        },
      ];
      if (this.isTwelfthMode) {
        quarterTexts = [
          {
            name: '6 AM',
            ...getTimeCoordinates(6, offsetRadius),
          },
          {
            name: '12 PM',
            ...getTimeCoordinates(12, offsetRadius),
          },
          {
            name: '6PM',
            ...getTimeCoordinates(18, offsetRadius),
          },
          {
            name: '12 AM',
            ...getTimeCoordinates(0, offsetRadius),
          },
        ];
      }
      return quarterTexts;
    },
  },
};
