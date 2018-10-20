import { HOURS_AMOUNT } from './consts';
import { getTimeCoordinates } from './helpers';

class Range {
  constructor(args) {
    const { startMovePointer, endMovePointer, scaleColor, hoursAmount } = args;
    const arcs = this.createArcs(startMovePointer, endMovePointer);
    this.name = startMovePointer.name + '-' + endMovePointer.name + '-range';
    this.startMovePointer = startMovePointer;
    this.endMovePointer = endMovePointer;
    this.scaleColor = scaleColor;
    this.arcs = arcs;
  }

  createArcs(startPointer, endPointer) {
    const startTime = startPointer.time;
    const endTime = endPointer.time;

    const arcs = [];
    let diff = endTime - startTime;
    if (diff < 0) {
      diff = HOURS_AMOUNT - -diff;
    }

    /**
     * we cant create arc with more than 180 degrees, so,
     * if wen need more than 180, we create two arcs
     */
    if (diff <= HOURS_AMOUNT / 2) {
      const start = startPointer.coordinates;
      const end = endPointer.coordinates;
      arcs.push({
        name: startTime + '-' + endTime + '-arc',
        start,
        end,
      });
    } else {
      let borderTime = startPointer.time + HOURS_AMOUNT / 2;
      if (borderTime > HOURS_AMOUNT) {
        borderTime = borderTime - HOURS_AMOUNT;
      }
      const borderTimeCoordinates = getTimeCoordinates(borderTime);

      const firstStart = startPointer.coordinates;
      const firstEnd = borderTimeCoordinates;
      const secondStart = borderTimeCoordinates;
      const secondEnd = endPointer.coordinates;
      arcs.push({ name: startPointer.name + '-arc', start: firstStart, end: firstEnd });
      arcs.push({ name: endPointer.name + '-arc', start: secondStart, end: secondEnd });
    }
    return arcs;
  }
}

export default Range;
