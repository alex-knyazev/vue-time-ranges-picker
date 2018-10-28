import { CIRCLE_RADIUS, ONE_HOUR_DEGREE } from './consts';
import { getTimeCoordinates, getTimeByDegree } from './helpers';

import MovePointer from './MovePointer';
import Range from './Range.js';

class RangesController {
  constructor(rangesData, stepOfMoving) {
    this.stepOfMoving = stepOfMoving;

    const movePointers = rangesData.map((pointerData, index) => {
      const { startTime } = pointerData;
      return new MovePointer({
        time: startTime,
        index,
        controller: this,
        coordinates: getTimeCoordinates(startTime),
      });
    });
    this.movePointers = movePointers;

    this.ranges = rangesData.map(({ scaleColor }, index) => {
      const startMovePointer = movePointers[index];
      const endMovePointer = movePointers[index + 1] ? movePointers[index + 1] : movePointers[0];
      return new Range({
        startMovePointer,
        endMovePointer,
        scaleColor,
      });
    });
  }

  setStepOfMoving(stepValue) {
    this.stepOfMoving = stepValue;
  }

  setBasicVector(center) {
    const [centerX, centerY] = center;
    const basicVector = [CIRCLE_RADIUS, 0];

    const vectorLength = Math.sqrt(basicVector[0] ** 2 + basicVector[1] ** 2);
    this.basicVector = {
      centerX,
      centerY,
      zeroAngleX: basicVector[0],
      zeroAngleY: basicVector[1],
      vectorLength,
    };
  }

  getPointer(name) {
    const pointer = this.movePointers.find(pointer => {
      return pointer.name === name;
    });
    return pointer;
  }

  getActiveMovePointers() {
    const pointers = this.movePointers.filter(pointer => pointer.isActive === true);
    return pointers;
  }

  handlePointerMove(pointer, degree) {
    const { coordinates, time } = this.getNewPointerData(degree);
    const rangeWithStartPointer = this.ranges.find(r => r.startMovePointer.name === pointer.name);
    const rangeWithEndPointer = this.ranges.find(r => r.endMovePointer.name === pointer.name);

    const isMovingAllowed = this.checkIfMovingAllowed(
      time,
      rangeWithEndPointer.startMovePointer.time,
      rangeWithStartPointer.endMovePointer.time,
    );
    if (!isMovingAllowed) {
      return;
    }

    pointer.coordinates = coordinates;
    pointer.time = time;

    rangeWithStartPointer.arcs = rangeWithStartPointer.createArcs(
      pointer,
      rangeWithStartPointer.endMovePointer,
    );
    rangeWithEndPointer.arcs = rangeWithEndPointer.createArcs(
      rangeWithEndPointer.startMovePointer,
      pointer,
    );
  }

  completeMove() {
    const pointers = this.getActiveMovePointers();
    pointers.forEach(pointer => {
      pointer.completeMove();
    });
  }

  getNewPointerData(degree) {
    let newDegree;
    const { stepOfMoving } = this;

    const stepDegree = ONE_HOUR_DEGREE * stepOfMoving;
    const halfStepDegree = stepDegree / 2;
    const remainder = degree % stepDegree;
    const floor = degree - remainder;
    if (remainder > halfStepDegree) {
      newDegree = floor + stepDegree;
    } else {
      newDegree = floor;
    }

    const newTime = getTimeByDegree(newDegree);
    const newCoordinates = getTimeCoordinates(newTime);
    return {
      coordinates: newCoordinates,
      time: newTime,
    };
  }

  checkIfMovingAllowed(movingTime, backBorderTime, forwardBorderTime) {
    if (forwardBorderTime >= backBorderTime) {
      if (movingTime <= backBorderTime || movingTime >= forwardBorderTime) {
        return false;
      }
    } else {
      if (movingTime >= forwardBorderTime && movingTime <= backBorderTime) {
        return false;
      }
    }

    return true;
  }
}

export default RangesController;
