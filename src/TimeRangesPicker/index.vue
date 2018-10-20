<template>
  <div 
    class="range-picker-container"
  >
    <svg
      ref="input-viewbox"
      :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
      class="circular-chart"
      @pointermove="handleMove"
      @pointerup="handleEndMove"
      @mouseleave="handleEndMove"
      @mouseup="handleEndMove"
    >
      <!-- group with set of svg-paths drawing arcs -->
      <RangesScales 
        :ranges="ranges" 
      />

      <!-- hours marks around circle -->
      <HoursMarks
        :hoursMarksColor="viewOptions.hoursMarksColor"
      />

      <!-- quarter hours labels inside circle --> 
      <QuartersTexts
        :isTwelfthMode="isTwelfthMode"
        :quarterTextColor="viewOptions.quarterTextColor"
      />
      
      <!-- buttons on circle to change ranges --> 
      <ChosenTimePointers 
        :isTwelfthMode="isTwelfthMode"
        :movePointers="movePointers"
        :chosenTimeColor="viewOptions.chosenTimeColor"
        :pointerColor="viewOptions.pointerColor"
        :activePointerColor="viewOptions.activePointerColor"
        :pointerRadius="viewOptions.pointerRadius"
        :activePointerRadius="viewOptions.activePointerRadius"
        @startMove="handleStartMove"
      />

      <!-- invisible element for moving angle detecting -->
      <circle
        ref="input-center"
        :cx="viewBoxSize/2"
        :cy="viewBoxSize/2"
        r="0"
      />
      
    </svg>
  </div>
</template>


<script src="./index.js"></script>
<style scoped src="./index.css"></style>
