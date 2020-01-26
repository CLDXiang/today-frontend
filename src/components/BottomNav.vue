<template>
  <v-bottom-navigation
    app
    fixed
    grow
    v-model="activeItem"
    color="primary"
  >
    <v-btn value="top">
      <span>Top Stories</span>
      <v-icon>mdi-domain</v-icon>
    </v-btn>

    <v-btn value="code">
      <span>Code Examples</span>
      <v-icon>mdi-arrow-up-bold-box-outline</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Favorites</span>
      <v-icon>mdi-call-split</v-icon>
    </v-btn>
  </v-bottom-navigation>

</template>

<script lang="js">
export default {
    data: () => {
        return {
            activeItem: 'top',
        }
    }
}
</script>