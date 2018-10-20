<template>
  <!-- scales -->
  <g>
    <g
      v-for="range in ranges"
      :key="range.name"
      :id="range.name"
    >
      <path
        v-for="arc in range.arcs"
        :key="arc.name"
        :id="range.name"
        :style="{stroke: range.scaleColor}" 
        :d="`
          M${arc.start.x},${arc.start.y} 
          A${circleRadius},${circleRadius} 
          0 0 1 ${arc.end.x}, ${arc.end.y}`"
        :stroke-width="circleStrokeWidth"
        fill="transparent" 
      />
    </g>
  </g>

</template>

<script src="./index.js"></script>

