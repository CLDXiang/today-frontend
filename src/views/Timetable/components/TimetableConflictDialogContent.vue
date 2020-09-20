<template>
  <v-card>
    <v-card-title>本地数据与服务器不一致</v-card-title>
    <v-divider />
    <v-card-text>
      <div v-if="selectedCoursesOnlyInLocal.length !== 0">
        本地比服务器多出的课程：
      </div>
      <v-list-item v-for="course in selectedCoursesOnlyInLocal" :key="course.codeId" two-line>
        <v-list-item-content>
          <v-list-item-title>{{ course.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ course.codeId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div v-if="selectedCoursesOnlyInDataBase.length !== 0">
        服务器比本地多出的课程：
      </div>
      <v-list-item v-for="course in selectedCoursesOnlyInDataBase" :key="course.codeId" two-line>
        <v-list-item-content>
          <v-list-item-title>{{ course.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ course.codeId }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
    <v-divider />
    <v-card-actions class="justify-between">
      <v-btn color="primary" @click="handleChooseBoth">
        合并两者
      </v-btn>
      <v-btn color="primary" @click="handleChooseDatabase">
        保留服务器数据
      </v-btn>
      <v-btn color="error" @click="handleChooseLocal">
        保留本地数据
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    selectedCoursesIds: Set,
    selectedCoursesIdsFromDatabase: Set,
    courses: Object,
  },
  computed: {
    selectedCoursesOnlyInLocal() {
      return [...this.selectedCoursesIds]
        .filter((x) => !this.selectedCoursesIdsFromDatabase.has(x))
        .map((courseId) => ({
          codeId: this.courses[courseId].code_id,
          name: this.courses[courseId].name,
        }));
    },
    selectedCoursesOnlyInDataBase() {
      return [...this.selectedCoursesIdsFromDatabase]
        .filter((x) => !this.selectedCoursesIds.has(x))
        .map((courseId) => ({
          codeId: this.courses[courseId].code_id,
          name: this.courses[courseId].name,
        }));
    },
  },
  methods: {
    handleChooseBoth() {
      const combinedSelectedCoursesIds = new Set([
        ...this.selectedCoursesIds,
        ...this.selectedCoursesIdsFromDatabase,
      ]);
      this.$emit('conflictResolved', combinedSelectedCoursesIds, true, true);
    },
    handleChooseDatabase() {
      this.$emit('conflictResolved', this.selectedCoursesIdsFromDatabase, true, false);
    },
    handleChooseLocal() {
      this.$emit('conflictResolved', this.selectedCoursesIds, false, true);
    },
  },
};
</script>

<style lang="scss" scoped></style>
