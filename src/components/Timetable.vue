<template>
  <div class="timetable">
    <div class="timetable__body">
      <div class="timetable__time">
        <div class="timetable__time__title"></div>
        <div class="timetable__time__cell" v-for="(section, index) in sections" :key="index">{{ section }}</div>
      </div>
      <div class="timetable__day-box">
        <timetable-day v-for="(title, index) in titles" :title="title" :key="index"></timetable-day>
      </div>
    </div>
  </div>
</template>

<script>
import TimetableDay from './TimetableDay.vue'

export default {
  props: {
  },
  data() {
    return {
      titles: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      sections: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四']
    };
  },
  components: {
    TimetableDay
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/_timetable';

.timetable {
  height: 100%;
  position: relative;

  display: flex;
  flex-direction: column;

  margin: 10px;
}

.timetable__body {
  display: flex;

  overflow-x: auto;
}

.timetable__time {
  position: sticky;
  left: 0;

  padding-right: 4px;

  flex: 0 0 auto;

  display: flex;
  flex-direction: column;
}

.timetable__time__title {
  flex: 1 0 $cell-height/2;
  @include flex-center;

  padding: 0 4px;

}

.timetable__time__cell {
  flex: 1 0 $cell-height;
  @include flex-center;

  padding: 0 4px;
  background: rgba(255, 255, 255, 0.5);

  color: #69707a;
  font-weight: 600;
}

.timetable__day-box {
  display: flex;

  border: 1px solid #ddd;
  border-radius: 6px;
}
</style>