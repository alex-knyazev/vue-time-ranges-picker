<template>
  <div class="hello">
    <svg 
      :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`" 
      class="circular-chart"
    >
      <!-- scales -->
      <path
        v-for="timePoint in timePoints"
        :key="timePoint.name"
        :stroke-dasharray="`${timePoint.hourDegree}, ${circleInputLength}`"
        :stroke-width="strokeWidth"
        :style="{stroke: timePoint.scaleColor}"
        :d="`M${viewBoxSize/2} ${viewBoxSize/2 - circleInputRadius}
          a ${circleInputRadius} ${circleInputRadius} 0 0 1 0 ${circleInputDiameter}
          a ${circleInputRadius} ${circleInputRadius}  0 0 1 0 ${-circleInputDiameter}`"
        class="input-scale"
      />
      <!-- time marks around input -->
      <g class="marks">
        <circle 
          v-for="mark in marks" 
          :key="mark.name"
          :style="{
            fill: 'grey', 
            transform: 'rotate(calc('+ mark.name + ' * 15deg))'
          }"
          cx="0" 
          cy="-67.1"
          r="1.5"
        />
      </g>
      <filter id="dropshadow" height="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="0.49"/> <!-- stdDeviation is how much to blur -->
        <feOffset dx="0" dy="0" result="offsetblur"/> <!-- how much to offset -->
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.35"/> <!-- slope is the opacity of the shadow -->
        </feComponentTransfer>
        <feMerge> 
          <feMergeNode/> <!-- this contains the offset blurred image -->
          <feMergeNode in="SourceGraphic"/> <!-- this contains the element that the filter is applied to -->
        </feMerge>
      </filter>
      <g class="time-points">

        <circle
          v-for="timePoint in timePoints"
          :key="timePoint.name"
          :id="timePoint.name"
          class="time-pointer"
          cx="0"
          :cy="-circleInputRadius"
          :style="{
            transform: 'rotate(calc('+ timePoint.hourDegree + 'deg))'
          }"
          filter="url(#dropshadow)"
          r="6"
          @pointerdown="handleMoveStart"
          @pointermove="handleMove"
          @pointerup="hanleMoveEnd"
        /> 
      </g>

    </svg>
  </div>
</template>

<script>
export default {
  name: 'TimePicker',
  props: {
    msg: String
  },

  data() {
    const circleInputLength = 360;
    const hoursAmount = 24;
    const circleInputRadius = circleInputLength / ( 2* Math.PI);
    const circleInputDiameter = circleInputRadius * 2;

    const strokeWidth = 6;
    const marks = [];
    for (let i = 0; i < hoursAmount; i++) {
      marks.push({ name: i + 1 });
    }

    let timePoints = [
      {
        name: 'point-3',
        currentHour: 24,
        scaleColor: '#f6e046'
      },
      {
        name: 'point-2',
        currentHour: 6,
        scaleColor: '#00ff1f'        
      },
      {
        name: 'point-1',
        currentHour: 2,
        scaleColor: 'blue',
      }, 
    ];

    const oneHourDegree = circleInputLength / hoursAmount;
    timePoints = timePoints.map(tp => ({...tp, hourDegree: tp.currentHour * oneHourDegree }))

    return {
      viewBoxSize: 140,
      marks,
      timePoints,
      circleInputLength,
      circleInputRadius,
      circleInputDiameter,
      strokeWidth
    }
  },

  methods: {
    handleMoveStart(e) {
      // console.log('start', e.pageX, e.pageY);
    },
    handleMove(e) {
      console.log(e.target.id);
      console.log('process', e.offsetX, e.offsetY);
    },
    hanleMoveEnd(e) {
      // console.log('end', e.pageX, e.pageY);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.marks,
.time-points {
  /* relocate marks group to center of picker*/
  transform: translate(70px, 70px);
  stroke-width: 0.2;
}

.circular-chart {
  display: block;
  margin: 10px auto;
  max-width: 80%;
  max-height: 300px;
}

.input-scale {
  fill: none;
  stroke-width: 7;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

.time-pointer {
  cursor: pointer;
  fill: white;
  stroke-width: 3px;
}

.time-pointer:hover {
  fill: rgba(240, 240, 240, 0.9);
}

#point-1 {
}
#point-2 {
  transform: rotate(calc(10 * 15deg));
}
#point-3 {
  transform: rotate(calc(24 * 15deg));
}
/* @keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
} */
</style>
