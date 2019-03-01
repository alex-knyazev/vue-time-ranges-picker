import {
  VIEW_BOX_SIZE,
  DEFAULT_VIEW_OPTIONS,
  STEP_OF_MOVING,
  EXTRA_POINTER_RADIUS,
} from '../core/consts';
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
    stepOfMoving: {
      type: Number,
      default: () => STEP_OF_MOVING,
    },
    extraPointerRadius: {
      type: Number,
      default: () => EXTRA_POINTER_RADIUS,
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

  computed: {
    combinedViewOptions() {
      return {
        ...DEFAULT_VIEW_OPTIONS,
        ...this.viewOptions,
      };
    },
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
    stepOfMoving(newValue) {
      this.rangesController.setStepOfMoving(newValue);
    },
  },

  methods: {
    timeNumberToText,

    getInfoFromValue(newValue) {
      const { isTwelfthMode, stepOfMoving } = this;
      const innerValue = newValue.map(range => {
        return {
          ...range,
          startTime: timeTextToNumber(range.startTime, isTwelfthMode),
          endTime: timeTextToNumber(range.endTime, isTwelfthMode),
        };
      });
      const rangesController = new RangesController(innerValue, stepOfMoving);

      this.innerValue = innerValue;
      this.rangesController = rangesController;
      this.ranges = rangesController.ranges;

      const newMovePointers = rangesController.movePointers;
      if (this.movePointers && this.movePointers.length == newMovePointers.length) {
        newMovePointers.map(newMovePointer => {
          const oldMovePointer = this.movePointers.find(movePointer => {
            if (movePointer.name === newMovePointer.name) {
              return true;
            }
          });
          newMovePointer.setRef(oldMovePointer.ref);
        });
        return (this.movePointers = newMovePointers);
      }

      this.movePointers = rangesController.movePointers;
    },

    handleStartMove(e) {
      const activePointName = e.target.id;
      let pointer = this.rangesController.getPointer(activePointName);
      if (!pointer) {
        pointer = this.tryToFindPointerNear(e);
      }
      if (!pointer) {
        return;
      }
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

    tryToFindPointerNear(e) {
      const { clientX, clientY } = e;
      const { movePointers } = this;
      let nearPointersData = movePointers
        .map(pointer => {
          const { ref } = pointer;

          const rect = ref.getBoundingClientRect();
          const { x: pointerX, y: pointerY } = rect;
          return {
            pointer,
            distance: Math.abs(clientX - pointerX) + Math.abs(clientY - pointerY),
          };
        })
        .filter(({ distance }) => {
          if (distance < this.extraPointerRadius) {
            return true;
          }
        });

      if (!nearPointersData.length) {
        return;
      }

      let nearestPointerData = nearPointersData.sort((a, b) => {
        return a.distance - b.distance;
      })[0];

      return nearestPointerData.pointer;
    },
  },
};
