class MovePointer {
  constructor(pointData) {
    const { time, index, controller, coordinates } = pointData;
    this.name = 'point' + index;
    this.controller = controller;
    this.time = time;
    this.coordinates = coordinates;
    this.index = index;
    this.isActive = false;
  }

  startMove() {
    this.isActive = true;
  }

  completeMove() {
    this.isActive = false;
  }

  move(currentX, currentY) {
    if (this.isDisabled) {
      return;
    }

    const {
      centerX,
      centerY,
      zeroAngleX,
      zeroAngleY,
      vectorLength: basicVectorLength,
    } = this.controller.basicVector;

    const currentVector = [currentX - centerX, currentY - centerY];
    const scalarMultiple = zeroAngleX * currentVector[0] + zeroAngleY * currentVector[1];
    const currentVectorLength = Math.sqrt(currentVector[0] ** 2 + currentVector[1] ** 2);
    const angleInRadians = Math.acos(scalarMultiple / (basicVectorLength * currentVectorLength));
    let angleInDegrees = (angleInRadians * 180) / Math.PI;
    if (!angleInDegrees) {
      return;
    }
    if (currentY < centerY) {
      angleInDegrees = 360 - angleInDegrees;
    }

    this.controller.handlePointerMove(this, angleInDegrees);
  }
}

export default MovePointer;
