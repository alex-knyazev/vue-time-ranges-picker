<template>
  <div id="app">
    <div class="time-picker-wrapper">
      
      <TimeRangesPicker 
        :value="timeRanges" 
        :isTwelfthMode="isTwelfthMode" 
        :stepOfMoving="parseFloat(stepOfMoving)"
        :extraPointerRadius="extraPointerRadius"
        :viewOptions="viewOptions"
        @input="handleInput" 
      />
      <div id="settings">
        <div>
          <input v-model="stepOfMoving" type="number" min="0.5">
          <span>step of moving</span>
        </div>

        
        <div>
          <input v-model="isTwelfthMode" type="checkbox" > 
          <span>twelfth mode</span>
        </div>

        <div>
          <input v-model="viewOptions.isShowChosenTime" type="checkbox" >
          <span>show chosen time</span>
        </div>

        <div>
          <input v-model="viewOptions.chosenTimeColor" type="text">        
          <span>chosen time color</span>
        </div>

        <div>
          <input v-model="viewOptions.isShowQuartersText" type="checkbox" > 
          <span>show quarters text</span>
        </div>

        <div>
          <input v-model="viewOptions.quarterTextColor" type="text">        
          <span>quarter text color</span>
        </div>

        <div>
          <input v-model="viewOptions.isShowHoursMarks" type="checkbox" > 
          <span>show hours marks</span>
        </div>

        <div>
          <input v-model="viewOptions.hoursMarksColor" type="text">        
          <span>hours marks color</span>
        </div>
       
        <div>
          <input v-model="viewOptions.pointerColor" type="text">        
          <span>pointers color</span>
        </div>

        <div>
          <input v-model="viewOptions.activePointerColor" type="text">        
          <span>active pointers color</span>
        </div>
        
        <div>
          <input v-model="viewOptions.pointerRadius" type="number" min="0">
          <span>radius of pointers</span>
        </div>

        <div>
          <input v-model="viewOptions.activePointerRadius" type="number" min="0">
          <span>radius of active pointers</span>
        </div>

        <div>
          <input v-model="viewOptions.circleStrokeWidth" type="number" min="0">
          <span>width of circle strokes</span>
        </div>

        <div>
          <input v-model="extraPointerRadius" type="number" min="0">
          <span>extra pointer radius</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import TimeRangesPicker from './TimeRangesPicker/index.vue';

export default {
  name: 'App',
  components: {
    TimeRangesPicker,
  },

  data() {
    const timeRanges = [
      {
        startTime: '00:00',
        endTime: '06:00',
        scaleColor: 'violet',
      },
      {
        startTime: '06:00',
        endTime: '08:00',
        scaleColor: 'yellow',
      },
      {
        startTime: '18:00',
        endTime: '00:00',
        scaleColor: 'aquamarine',
      },
    ]

    return {
      timeRanges,
      isTwelfthMode: true,
      stepOfMoving: 0.5,
      testData: {
        message: {
          value: "string"
        }
      },
      extraPointerRadius: 70,
      viewOptions: {
        isShowChosenTime: true,
        isShowQuartersText: true,
        isShowHoursMarks: true,
        chosenTimeColor: 'grey',
        pointerColor: 'white',
        activePointerColor: 'rgba(240, 240, 240, 0.9)',
        pointerRadius: 6,
        activePointerRadius: 5.5,
        circleStrokeWidth: 8,
        hoursMarksColor: 'grey',
        quarterTextColor: 'grey',
      },
    }
  },

  methods: {
    handleInput(value) {
      console.log(value);
    }
  }
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;

  margin-top: 60px;

  text-align: center;
}

.time-picker-wrapper {
  position: absolute;
  top: 10%;
  left: 50%;

  width: 420px;
  height: 370px;

  transform: translateX(-50%);
}

@media (max-width: 500px) {
  .time-picker-wrapper {
    height: 320px;
  }
}

#settings {
  display: fles;
  flex-direction: column;
}

#settings > div {
  display: grid;

  text-align: left;

  margin-bottom: 10px;
  grid-template-columns: 80px auto;
}

#settings span {
  margin-left: 10px;
}
</style>
