<template>
  <g class="marks">
    <circle
      v-for="mark in marks"
      :key="mark.name"
      :style="{
        fill: hoursMarksColor,
        transform: `translate(${viewBoxSize/2}px, ${viewBoxSize/2}px) rotate(${mark.index * oneHourDegree}deg)`
      }"
      :cy="circleRadius + 9"
      cx="0"
      r="1.5"
    />
  </g>
</template>

<script src="./index.js"></script>

