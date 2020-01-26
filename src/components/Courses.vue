<template>
  <div class="hello">
    <!-- The basic idea is we do mobile first design -->
    <table style="height: 100%; width: 100%; overflow: true;">
      <tr>
        <th class="head"></th>
        <th v-for="d in days.length" :key="d" class="head">{{ days[d - 1] }}</th>
      </tr>
      <tr v-for="s in sections.length" :key="s">
        <th class="head">{{ sections[s - 1] }}</th>
        <td
          v-for="slot in slots[s - 1]"
          :key="slot.id"
          @click="query($event, slot.d, slot.s)"
          :id="slot.id"
          :class="{ cell: true, select: slot.selected.length == 1, conflict: slot.selected.length > 1 }"
        >
          <div v-if="slot.selected.length == 0">{{ slot.available.length }}</div>
          <div v-else>
            <div v-for="course in slot.selected" :key="course.cid">{{ course.name }}</div>
          </div>
        </td>
      </tr>
    </table>
    <hr />
    <v-dialog v-model="showAvailableDialog">
      <courses-table
        :show-columns="['num', 'name', 'tutor', 'timing', 'place', 'depart', 'operation', ]"
        :table-data="availableDialogData"
        :key="getId(queryDay, querySection)"
        title="选课面板"
        show-operation="select"
        @select="select"
      ></courses-table>
    </v-dialog>
    <v-alert v-model="showHasSelected" type="info">
      <p>您已选过该课程</p>
    </v-alert>
    <v-alert v-model="showNotSelected">
      <p>您尚未选中该课程</p>
    </v-alert>

    <v-tabs>
      <v-tab>所有课程</v-tab>
      <v-tab>已选课程</v-tab>
      <v-tab-item>
        <courses-table
          :show-columns="['num', 'name', 'tutor', 'timing', 'place', 'depart', 'operation', ]"
          :table-data="courses"
          :key="courses.length"
          title="所有课程"
          show-operation="select"
          @select="select"
        ></courses-table>
      </v-tab-item>
      <v-tab-item>
        <courses-table
          :show-columns="['num', 'name', 'tutor', 'timing', 'place', 'depart', 'operation', ]"
          :table-data="selected"
          :key="selected.length"
          title="已选课程"
          show-operation="withdraw"
          @withdraw="withdraw"
        ></courses-table>
      </v-tab-item>
    </v-tabs>

    <!-- <h1>{{ msg }}</h1> -->

    <!-- <div id="tile" style="background: black; width: 100px; height: 100px">
      233
    </div>-->
  </div>
</template>

<script>
import CoursesTable from './CoursesTable';
import { setTimeout } from 'timers';
import { spans2segments, getId, spans2slots } from './utils';
import log from '../utils/log.js';
const axios = require('axios');

var sections = [
  '第1节',
  '第2节',
  '第3节',
  '第4节',
  '第5节',
  '第6节',
  '第7节',
  '第8节',
  '第9节',
  '第10节',
  '第11节',
  '第12节',
  '第13节',
  '第14节',
];
var days = [
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
  '星期日',
];
var slots = new Array();
for (var s = 0; s < sections.length; s++) {
  var tmp = new Array();
  for (var d = 0; d < days.length; d++) {
    tmp.push({
      id: getId(d, s),
      d: d,
      s: s,
      available: new Array(),
      selected: new Array(),
    });
  }
  slots.push(tmp);
}
export default {
  name: 'Courses',
  data: () => {
    return {
      showAvailableDialog: false,
      showHasSelected: false,
      showNotSelected: false,
      days: days,
      sections: sections,
      availableDialogData: [],
      selected: [],
      slots: slots,
      queryDay: 0,
      querySection: 0,
      courses: [],
      data: null,
    };
  },
  components: {
    CoursesTable,
  },
  props: {
    msg: String,
  },
  methods: {
    parseTime(timeStr) {
      // returns a list of time range, [(day, section)]
      const timeStrs = timeStr.split('<br>');
      const spans = new Set();
      const temp = /(星期.) (\d*)-(\d*)/g;
      for (var i in timeStrs) {
        var t = temp.exec(timeStrs[i].trim());
        temp.lastIndex = 0;
        if (t) {
          // log.info(t);
          let day = this.days.indexOf(t[1]);
          let start = parseInt(t[2]) - 1;
          let end = parseInt(t[3]) - 1;
          spans.add({ day: day, start: start, end: end });
        } else {
          log.info(timeStr, t, timeStrs[i]);
        }
      }
      return spans;
    },
    getId: getId,
    calcAvailableCourses() {
      axios
        .get('courses.json')
        .then((response) => {
          const data = response.data;
          const courses = new Array();
          for (let i in data) {
            const d = data[i];
            const timeStr = d.timing;
            const spans = this.parseTime(timeStr);
            d.spans = spans;
            spans2slots(spans).forEach((s) => {
              this.slots[s.s][s.d].available.push(data[i]);
            });
            courses.push(d);
          }
          this.courses = courses;
          this.data = data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    query(e, day, section) {
      this.queryDay = day;
      this.querySection = section;
      // var c = getCellByPosition(day, section);
      // var data = new Array();

      // for (var cid in this.slots[section][day].available) {
      //   data.push(this.courses[cid]);
      // }
      this.availableDialogData = this.slots[section][day].available;
      this.showAvailableDialog = true;
    },
    select(cid) {
      var d = this.data[cid];
      if (this.selected.includes(d)) {
        log.info('Has selected');
        this.showHasSelected = true;
        setTimeout(() => {
          this.showHasSelected = false;
        }, 2000);
      } else {
        this.selected.push(d);
        var segments = spans2segments(d.spans);
        log.info(d.spans, spans2slots(d.spans), segments);
        segments.forEach((s) => {
          for (let c = s.s; c <= s.e; c++) {
            this.slots[c][s.d].selected.push(d);
          }
          // const l = s.e - s.s + 1;
          // const c = getCellByPosition(s.d, s.s);
          // log.info(c);
          // place a tile? or

          // c.setAttribute('rowspan', l);
          // log.info(s);
          // for (var i = s.s + 1; i <= s.e; ++i) {
          //   c = getCellByPosition(s.d, i);
          //   log.info("c: ", c);
          //   c.style.display = "None";
          // }
        });
      }
    },
    withdraw(cid) {
      var d = this.data[cid];
      var i = this.selected.indexOf(d);
      if (i == -1) {
        this.showNotSelected = true;
      } else {
        this.selected.splice(i, i + 1);
        var segments = spans2segments(d.spans);
        log.info(d.spans, spans2slots(d.spans), segments);
        segments.forEach((s) => {
          for (let c = s.s; c <= s.e; c++) {
            const i = this.slots[c][s.d].selected.indexOf(d);
            this.slots[c][s.d].selected.splice(i, i + 1);
          }
        });
      }
    },
  },
  created() {
    this.calcAvailableCourses();
  },
  computed: {
    getNumAvailableCourses: function(d, s) {
      log.info(d, s);
      var id = this.getId(d, s);
      log.info(id, this.slots);
      return this.slots[s][d].available.length;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select {
  background: #42b983;
}
.conflict {
  background: salmon;
}
.head {
  border: 2px solid black;
}
.cell {
  border: 1px solid black;
  text-align: center;
}

.block {
  width: 50px;
  height: 10%;
  border: 1px solid black;
}

a {
  color: #42b983;
}
</style>
