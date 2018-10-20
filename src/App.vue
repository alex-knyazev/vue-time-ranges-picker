<template>
  <div id="app">
    <div class="time-picker-wrapper">
      <TimeRangesPicker :value="timeRanges" :isTwelfthMode="isTwelfthMode" @input="handleInput" />
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

  created() {
    // setTimeout(() => {
    //   this.timeRanges = [
    //     {
    //       startTime: '03:00',
    //       endTime: '08:00',
    //       scaleColor: 'violet',
    //     },
    //     {
    //       startTime: '08:00',
    //       endTime: '09:00',
    //       scaleColor: 'yellow',
    //     },
    //     {
    //       startTime: '09:00',
    //       endTime: '03:00',
    //       scaleColor: 'aquamarine',
    //     }
    //   ]
    // }, 3000);
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

  color: #2c3e50;

  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.time-picker-wrapper {
  width: 600px;
  height: 400px;
}
</style>
