<template>
  <img
    v-if="userLoggedIn"
    class="w-9 h-9 rounded-full border-primary border-2"
    :src="processAvatar(user.avatar)"
    alt="avatar"
  >
  <div v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapGetters } from 'vuex';
import { useProcessAvatar } from '@/composables';
// TODO: 点击弹出侧栏

export default defineComponent({
  setup() {
    const { processAvatar } = useProcessAvatar();
    return {
      processAvatar,
    };
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userLoggedIn']),
  },
});
</script>
