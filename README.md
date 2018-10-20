# Vue-time-ranges-picker

Vue.js component to select the time intervals of the day.

```
npm install vue-time-ranges-picker
```

## Using

```
<template>
  <div>
    <div class="time-picker-wrapper">
      <TimeRangesPicker
        :value="ranges"
        @change="handleRangesChange"
      />
    </div>
  </div>
</template>

<script>
import TimeRangesPicker from 'time-ranges-picker';

export default {
  data() {
    return {
      ranges: [
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
    }
  }
}
</script>
```

Component works in two modes: twenty-four hours and twelve hours. Default is twenty four but you can provide isTwelfthMode prop:

```
<template>
  <div>
    <div class="time-picker-wrapper">
      <TimeRangesPicker
        :value="ranges"
        isTwelfthMode
        @change="handleRangesChange"
      />
    </div>
  </div>
</template>

<script>
import TimeRangesPicker from 'time-ranges-picker';

export default {
  data() {
    return {
      ranges: [
        {
          startTime: '12:00 AM',
          endTime: '06:00 AM',
          scaleColor: 'violet',
        },
        {
          startTime: '06:00 AM',
          endTime: '06:00 PM',
          scaleColor: 'yellow',
        },
        {
          startTime: '06:00 PM',
          endTime: '00:00 AM',
          scaleColor: 'aquamarine',
        }
      ]
    }
  }
}
</script>
```

You can also pass some view options to rewrite default:

```
<TimeRangesPicker
  :value="ranges"
  :viewOptions="{
    chosenTimeColor: 'grey',
    pointerColor: 'white',
    activePointerColor: 'rgba(240, 240, 240, 0.9)',
    pointerRadius: 6,
    activePointerRadius: 5.5,
    circleStrokeWidth: 8,
    hoursMarksColor: 'grey',
    quarterTextColor: 'grey',
  }"
/>
```

This repo is project created by vue-cli. You can clone it to see example of component using.

## Project setup

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```
