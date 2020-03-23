<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        label="输入关键字搜索：试试课程名、授课老师名、PEDU、ENGL、119、授课地点"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="20"
      dense
      :search="search"
    >
      <template v-slot:item.operation="{ item }">
        <v-btn
          color="green"
          dark
          v-if="showOperation === 'select'"
          @click="select(item.cid)"
          >选中</v-btn
        >
        <v-btn
          color="green"
          dark
          v-if="showOperation === 'withdraw'"
          @click="withdraw(item.cid)"
          >退选</v-btn
        >
      </template>
      <template v-slot:item.timing="{ item }">
        <div v-for="t in item.timing.split('<br>')" :key="t">
          {{ t.trim() }}
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
function getHeaders(cols) {
  const header = [
    { text: '课号', value: 'num' },
    { text: '名称', value: 'name' },
    { text: '时间', value: 'timing' },
    { text: '地点', value: 'place' },
    { text: '教师', value: 'tutor' },
    { text: '院系', value: 'depart' },
    { text: '学分', value: 'credit' },
    { text: '容量', value: 'limit' },
    { text: '职称', value: 'title' },
    { text: 'ID', value: 'cid' },
    { text: '操作', value: 'operation' },
  ];
  const headers = [];
  cols.array.forEach((col) => {
    header.forEach((t) => {
      if (t.value === col) {
        headers.push(t);
      }
    });
  });
  // for (const col of cols) {
  //   for (const t of header) {
  //     if (t.value === col) {
  //       headers.push(t);
  //     }
  //   }
  // }
  return headers;
}
export default {
  props: {
    showColumns: Array[String],
    tableData: Array[Object],
    showOperation: String, // select, withdraw
    title: String,
  },
  data() {
    return {
      search: '',
      data: this.tableData,
      items: this.tableData,
      filter: this.showFilter,
      headers: getHeaders(this.showColumns),
    };
  },
  methods: {
    select(cid) {
      this.$emit('select', cid);
    },
    withdraw(cid) {
      this.$emit('withdraw', cid);
    },
  },
};
</script>

<style></style>
