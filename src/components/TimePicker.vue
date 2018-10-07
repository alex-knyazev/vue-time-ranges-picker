<template>
  <div class="hello">
    <svg viewBox="0 0 140 140" class="circular-chart">
      <path class="circle3"
        stroke-dasharray="360, 360"
        stroke-width="6"
        d="M70 12.74025
          a 57.2958 57.2958 0 0 1 0 114.5915
          a 57.2958 57.2958 0 0 1 0 -114.5915"
      />
      <path class="circle2"
        stroke-dasharray="150, 360"
        stroke-width="6"
        d="M70 12.74025
          a 57.2958 57.2958 0 0 1 0 114.5915
          a 57.2958 57.2958 0 0 1 0 -114.5915"
      />
      <path class="circle"
        stroke-dasharray="30, 360"
        stroke-width="6"
        d="M70 12.74025
          a 57.2958 57.2958 0 0 1 0 114.5915
          a 57.2958 57.2958 0 0 1 0 -114.5915"
      />
      <g class="marks">
        <circle 
          v-for="mark in marks" 
          :key="mark.name"
          cx="67.1" 
          y1="0"
          style="fill: grey;"
          r="1.5"
        />
        <circle class="circle-picker  circle-picker-1" cx="0" cy="-57.2958" r="5" style="fill: fuchsia;"/>
        <circle class="circle-picker circle-picker-2" cx="0" cy="-57.2958" r="5" style="fill: fuchsia;"/>
        <circle class="circle-picker circle-picker-3" cx="0" cy="-57.2958" r="5" style="fill: fuchsia;"/>
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
    let marks = [];
    for (let i = 0; i < 24; i++) {
      marks[i] = { name: i }
    }
    return {
      marks,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.marks {
  transform: translate(70px, 70px);
  stroke-width: 0.2;
}

.marks > circle:nth-child(1) {
  transform: rotate(15deg);
}
.marks > circle:nth-child(2) {
  transform: rotate(calc(2 * 15deg));
}
.marks > circle:nth-child(3) {
  transform: rotate(calc(3 * 15deg));
  stroke-width: 0.5;
}
.marks > circle:nth-child(4) {
  transform: rotate(calc(4 * 15deg));
}
.marks > circle:nth-child(5) {
  transform: rotate(calc(5 * 15deg));
}
.marks > circle:nth-child(6) {
  transform: rotate(calc(6 * 15deg));
  stroke-width: 0.5;
}
.marks > circle:nth-child(7) {
  transform: rotate(calc(7 * 15deg));
}
.marks > circle:nth-child(8) {
  transform: rotate(calc(8 * 15deg));
}
.marks > circle:nth-child(9) {
  transform: rotate(calc(9 * 15deg));
  stroke-width: 0.5;
}
.marks > circle:nth-child(10) {
  transform: rotate(calc(10 * 15deg));
}
.marks > circle:nth-child(11) {
  transform: rotate(calc(11 * 15deg));
}
.marks > circle:nth-child(12) {
  transform: rotate(calc(12 * 15deg));
  stroke-width: 0.5;
}

.marks > circle:nth-child(13) {
  transform: rotate(calc(13 * 15deg));
}
.marks > circle:nth-child(14) {
  transform: rotate(calc(14 * 15deg));
}
.marks > circle:nth-child(15) {
  transform: rotate(calc(15 * 15deg));
  stroke-width: 0.5;
}
.marks > circle:nth-child(16) {
  transform: rotate(calc(16 * 15deg));
}
.marks > circle:nth-child(17) {
  transform: rotate(calc(17 * 15deg));
}
.marks > circle:nth-child(18) {
  transform: rotate(calc(18 * 15deg));
  stroke-width: 0.5;
}
.marks > circle:nth-child(19) {
  transform: rotate(calc(19 * 15deg));
}
.marks > circle:nth-child(20) {
  transform: rotate(calc(20 * 15deg));
}
.marks > circle:nth-child(21) {
  transform: rotate(calc(21 * 15deg));
  stroke-width: 0.5;
}
.marks > circle:nth-child(22) {
  transform: rotate(calc(22 * 15deg));
}
.marks > circle:nth-child(23) {
  transform: rotate(calc(23 * 15deg));
}
.marks > circle:nth-child(24) {
  transform: rotate(calc(24 * 15deg));
  stroke-width: 0.5;
}

.circular-chart {
  display: block;
  margin: 10px auto;
  max-width: 80%;
  max-height: 300px;
}

.circle {
  stroke: blue;
  fill: none;
  stroke-width: 7;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

.circle2 {
  stroke: #00ff1f;
  fill: none;
  stroke-width: 7;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

.circle3 {
  stroke: #f6e046;
  fill: none;
  stroke-width: 7;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

.circle-picker-1 {
  transform: rotate(calc(2 * 15deg));
}
.circle-picker-2 {
  transform: rotate(calc(10 * 15deg));
}
.circle-picker-3 {
  transform: rotate(calc(24 * 15deg));
}
/* @keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
} */
</style>
