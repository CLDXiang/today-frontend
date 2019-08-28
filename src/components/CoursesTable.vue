<template>
  
  <v-card>
    <v-card-title>
      {{ title }}
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="输入关键字搜索：试试课程名、授课老师名、PEDU、ENGL、119、授课地点"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="items" :items-per-page="20" dense :search="search"></v-data-table>
    <!-- <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table> -->
  </v-card>
</template>

<script>
import { constants } from "crypto";
function getHeaders(cols) {
  const header = [
    // { text: "课号", value: "name" },
    { text: "名称", value: "name" },
    { text: "时间", value: "timing" },
    { text: "地点", value: "place" },
    { text: "教师", value: "tutor" },
    { text: "院系", value: "depart" }
    // { text: "", value: "" },
    // { text: "", value: "" },
    // { text: "", value: "" },
    // { text: "", value: "" },
  ];
  var headers = [];
  for (var col of cols) {
    for (var t of header) {
      if (t.value == col) {
        headers.push(t);
      }
    }
  }
  console.log("headers ", headers);
  return headers;
}
function applyFilter(data, col) {
  // var res = new Array();
  // for (var d of data) {
  //     var o = new Object();
  //     for (var t of col) {
  //         o[t] = data[t];
  //         console.log(t, col, data[t], o[t]);
  //     }
  //     res.push(o);
  // }
  // console.log(res);
  // return res;
  return data;
}
export default {
  props: {
    showColumns: Array[String],
    showFilter: Boolean,
    tableData: Array[Object],
    title: String,
  },
  data: function() {
    return {
      search: '',
      data: this.tableData,
      items: applyFilter(this.tableData, this.showColumns),
      filter: this.showFilter,
      headers: getHeaders(this.showColumns)
    };
  }
};
</script>

<style>
</style>