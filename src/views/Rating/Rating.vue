<template>
  <div class="content-box">
    <div class="center-content">
      <div>技术重构中，敬请期待 😊</div>
      <div>预计于下学期前上线</div>
    </div>
    <div class="bottom-content">
      <div>希望关注项目进度吗？在这里联系我们：</div>
      <!-- <div v-if="!userLoggedIn" class="hide-img" @click="$router.push('./login')">
        <div>登录后显示 🙈</div>
        <div style="transform: rotate(30deg)">
          👉
        </div>
      </div>
      <img v-else :src="wxGroupImg" alt="群二维码"> -->
      <img
        :src="wxGroupImg"
        alt="群二维码"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { mapGetters } from 'vuex';
import wxGroupImg from '@/assets/wx_pr.png';

export default defineComponent({
  data() {
    return {
      wxGroupImg,
    };
  },
  computed: {
    // ...mapGetters(['userLoggedIn']),
  },
});
</script>

<style lang="scss" scoped>
.content-box {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  color: #444;
  font-size: 14px;

  > .center-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div:last-child {
      color: #aaa;
      font-size: 12px;
    }
  }
  > .bottom-content {
    justify-self: flex-end;
    padding-bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;

    > .hide-img {
      width: 100px;
      height: 100px;
      background-color: #e3f1f3;
      border-radius: 6px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    > img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
