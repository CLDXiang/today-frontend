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
          class="cell"
        >
          {{ slot.d }} - {{ slot.s }}
          <br />
          {{ slot.available.length }}
        </td>
      </tr>
    </table>
    <hr />
    <v-dialog v-model="showAvailableDialog">
      <courses-table :show-columns='["name", "tutor", "timing", "place", "depart"]' :table-data="availableDialogData" :key="getId(queryDay, querySection)" title="选课面板"></courses-table>
    </v-dialog>
    <courses-table :show-columns='["name", "tutor", "timing", "place", "depart"]' :table-data="selected" :key="selected.length" title="已选课程"></courses-table>
    <!-- <h1>{{ msg }}</h1> -->
  </div>
</template>

<script>
import CoursesTable from "./CoursesTable";
var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
function getId(day, section) {
  return `day${day}section${section}`;
}
function getCellByPosition(day, section) {
  return document.querySelector(`#${getId(day, section)}`);
}
var sections = [
  "第1节",
  "第2节",
  "第3节",
  "第4节",
  "第5节",
  "第6节",
  "第7节",
  "第8节",
  "第9节",
  "第10节",
  "第11节",
  "第12节",
  "第13节",
  "第14节"
];
var days = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日"
];
var slots = new Array();
for (var s = 0; s < sections.length; s++) {
  var tmp = new Array();
  for (var d = 0; d < days.length; d++) {
    tmp.push({ id: getId(d, s), d: d, s: s, available: new Array() });
  }
  slots.push(tmp);
}
export default {
  name: "HelloWorld",
  data: () => {
    return {
      showAvailableDialog: false,
      days: days,
      sections: sections,
      availableDialogData: [],
      selected: [],
      slots: slots,
      queryDay: 0,
      querySection: 0,
      courses: [],
    };
  },
  components: {
    // HelloWorld,
    CoursesTable
  },
  props: {
    msg: String
  },
  methods: {
    parseTime(timeStr) {
      // returns a list of time range, [(day, section)]
      var timeStrs = timeStr.split("<br>");
      var res = new Set();
      var temp = /(星期.) (\d*)-(\d*)/g;
      for (var i in timeStrs) {
        var t = temp.exec(timeStrs[i]);
        if (t) {
          // console.log(t);
          var day = this.days.indexOf(t[1]);
          for (var j = parseInt(t[2]) - 1; j <= parseInt(t[3]) - 1; j++) {
            if (
              0 <= day &&
              day < this.days.length &&
              0 <= j &&
              j < this.sections.length
            )
              res.add({ day: day, section: j });
            else {
              console.log(timeStr, timeStrs[i], t, day, j);
            }
          }
        }
      }
      return res;
    },
    getId: getId,
    calcAvailableCourses() {
      getJSON("courses.json", (err, data) => {
        if (!err) {
          var courses = new Array();
          for (var i in data) {
            var d = data[i];
            var timeStr = d.timing;
            var timeSections = this.parseTime(timeStr);
            d.timeSections = timeSections;
            d.timing = d.timing.replace('<br>', '\n');
            timeSections.forEach(t => {
              if (this.slots[t.section][t.day] != null) {
                this.slots[t.section][t.day].available.push(data[i]);
              } else {
                console.log(t);
              }
            });
            courses.push(d);
          }
          this.courses = courses;
        } else {
          // console.log(err);
          alert(err);
        }
      });
    },
    query(e, day, section) {
      this.queryDay = day;
      this.querySection = section;
      var c = getCellByPosition(day, section);
      if (c.classList.contains("select") != -1) {
        c.classList.remove("select");
      } else {
        c.classList.add("select");
      }
      // var data = new Array();

      // for (var cid in this.slots[section][day].available) {
      //   data.push(this.courses[cid]);
      // }
      this.availableDialogData = this.slots[section][day].available;
      console.log(this.availableDialogData);
      // console.log(data, this.courses, this.slots[section][day].available);
      this.showAvailableDialog = true;
    }
  },
  created() {
    this.calcAvailableCourses();
  },
  computed: {
    getNumAvailableCourses: function(d, s) {
      console.log(d, s);
      var id = getId(d, s);
      console.log(id, this.slots);
      return this.slots[s][d].available.length;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select {
  background: #42b983;
}
.head {
  border: 2px solid black;
}
.cell {
  border: 1px solid black;
}
.block {
  width: 50px;
  height: 10%;
  border: 1px solid black;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
