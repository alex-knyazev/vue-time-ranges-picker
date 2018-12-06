<template>
  <g 
    :style="{
      transform: `translate(${viewBoxSize/2}px, ${viewBoxSize/2}px)`
    }"
    class="time-points"
  >
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
    <g>
      <g v-if="isShowChosenTime">
        <g
          v-for="pointer in movePointers"
          :key="pointer.name + '-text'"
		
          :style="{
            transform: `rotate(${pointer.coordinates.degree}deg) translate(${circleRadius + 12}px, 0px )`,
            'transform-origin': '-7.8% -0.5%',
          }"
        >
          <text

            :style="{
              'transform-origin': '0 -0.5%',
              fill: chosenTimeColor
            }"
            :transform="transformStyle(pointer.coordinates.degree)"
            class="chosen-time"
          >{{ timeNumberToText(pointer.time, isTwelfthMode) }}</text>
        </g>
      </g>
      
                    
      <circle
        v-for="pointer in movePointers"
        :ref="pointer.name"
        :key="pointer.name"
        :id="pointer.name"
        :cx="circleRadius"
        :class="{
          'time-pointer': true,
          'time-pointer_active': pointer.isActive
        }"
        :style="{
          transform: `rotate(${pointer.coordinates.degree}deg)`,
          fill: pointer.isActive ? activePointerColor : pointerColor
        }"
        :r="pointer.isActive ? activePointerRadius : pointerRadius"
        cy="0"
        filter="url(#dropshadow)"
        @pointerdown="handleStartMove"
      />
      
    </g>
  </g>
</template>

<script src="./index.js"></script>
<style scoped src="./index.css"></style>


