import { VIEW_BOX_SIZE, DEFAULT_VIEW_OPTIONS } from '../core/consts';
import { timeTextToNumber, timeNumberToText } from '../core/helpers';
import RangesController from '../core/RangesController';

import RangesScales from './RangesScales/index.vue';
import HoursMarks from './HoursMarks/index.vue';
import QuartersTexts from './QuartersTexts/index.vue';
import ChosenTimePointers from './ChosenTimePointers/index.vue';

export default {
  name: 'TimeRangesPicker',

  components: {
    RangesScales,
    HoursMarks,
    QuartersTexts,
    ChosenTimePointers,
  },

  props: {
    value: {
      type: Array,
      default: () => {},
    },
    isTwelfthMode: {
      type: Boolean,
      default: () => false,
    },
    viewOptions: {
      type: Object,
      default: () => DEFAULT_VIEW_OPTIONS,
    },
  },

  data() {
    const viewBoxSize = VIEW_BOX_SIZE;

    return {
      viewBoxSize,
      innerValue: [],
      rangesController: null,
      ranges: [],
      movePointers: [],
    };
  },

  created() {
    this.getInfoFromValue(this.value);
  },

  watch: {
    value: {
      handler(newValue) {
        this.getInfoFromValue(newValue);
      },
    },
  },

  methods: {
    timeNumberToText,

    getInfoFromValue(newValue) {
      const { isTwelfthMode } = this;
      const innerValue = newValue.map(range => {
        return {
          ...range,
          startTime: timeTextToNumber(range.startTime, isTwelfthMode),
          endTime: timeTextToNumber(range.endTime, isTwelfthMode),
        };
      });
      const rangesController = new RangesController(innerValue, isTwelfthMode);

      this.innerValue = innerValue;
      this.rangesController = rangesController;
      this.ranges = rangesController.ranges;
      this.movePointers = rangesController.movePointers;
    },

    handleStartMove(e) {
      const activePointName = e.target.id;
      const pointer = this.rangesController.getPointer(activePointName);

      const inputCenterElement = this.$refs['input-center'];
      const { x: centerX, y: centerY } = inputCenterElement.getBoundingClientRect();
      this.rangesController.setBasicVector([centerX, centerY]);

      pointer.startMove();
    },

    handleMove(e) {
      const activeMovePointers = this.rangesController.getActiveMovePointers();
      if (!activeMovePointers.length) {
        return;
      }
      const currentX = e.clientX;
      const currentY = e.clientY;
      for (let i = 0; i < activeMovePointers.length; i++) {
        const pointer = activeMovePointers[i];
        pointer.move(currentX, currentY);
      }
    },

    handleEndMove() {
      const activeMovePointers = this.rangesController.getActiveMovePointers();
      if (!activeMovePointers.length) {
        return;
      }
      this.rangesController.completeMove();
      const ranges = this.rangesController.ranges;
      const { isTwelfthMode } = this;
      const rangesData = ranges.map(range => {
        return {
          startTime: timeNumberToText(range.startMovePointer.time, isTwelfthMode),
          endTime: timeNumberToText(range.endMovePointer.time, isTwelfthMode),
        };
      });
      this.$emit('change', rangesData);
    },
  },
};
