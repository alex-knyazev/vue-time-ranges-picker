<template>
  <div class="range-picker-container">
    <svg
      ref="input-viewbox"
      :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
      class="circular-chart"
      touch-action="none"
      @pointerdown="handleStartMove"
      @pointermove="handleMove"
      @pointerup="handleEndMove"
      @mouseleave="handleEndMove"
      @mouseup="handleEndMove"
    >
      <!-- group with set of svg-paths drawing arcs -->
      <RangesScales :ranges="ranges" :circleStrokeWidth="combinedViewOptions.circleStrokeWidth"/>

      <!-- hours marks around circle -->
      <HoursMarks
        v-if="combinedViewOptions.isShowHoursMarks"
        :hoursMarksColor="combinedViewOptions.hoursMarksColor"
      />

      <!-- quarter hours labels inside circle -->
      <QuartersTexts
        v-if="combinedViewOptions.isShowQuartersText"
        :isTwelfthMode="isTwelfthMode"
        :quarterTextColor="combinedViewOptions.quarterTextColor"
      />

      <!-- buttons on circle to change ranges -->
      <ChosenTimePointers
        :isTwelfthMode="isTwelfthMode"
        :movePointers="movePointers"
        :chosenTimeColor="combinedViewOptions.chosenTimeColor"
        :pointerColor="combinedViewOptions.pointerColor"
        :activePointerColor="combinedViewOptions.activePointerColor"
        :pointerRadius="combinedViewOptions.pointerRadius"
        :activePointerRadius="combinedViewOptions.activePointerRadius"
        :isShowChosenTime="combinedViewOptions.isShowChosenTime"
        @startMove="handleStartMove"
      />

      <!-- invisible element for moving angle detecting -->
      <circle ref="input-center" :cx="viewBoxSize/2" :cy="viewBoxSize/2" r="0"/>
    </svg>
  </div>
</template>


<script src="./index.js"></script>
<style scoped src="./index.css"></style>
