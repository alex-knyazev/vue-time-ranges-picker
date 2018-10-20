<template>
  <div id="app">
    <div class="time-picker-wrapper">
      <TimeRangesPicker 
        :value="timeRanges" 
        :isTwelfthMode="isTwelfthMode" 
        @input="handleInput" 
      />
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
        endTime: '03:00',
        scaleColor: 'violet',
      },
      {
        startTime: '03:00',
        endTime: '06:00',
        scaleColor: 'yellow',
      },
      {
        startTime: '06:00',
        endTime: '00:00',
        scaleColor: 'aquamarine',
      }
    ]

    return {
      timeRanges,
      isTwelfthMode: true,
      testData: {
        message: {
          value: "string"
        }
      }
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

  width: 400px;
  height: 350px;

  transform: translateX(-50%);
}
</style>
