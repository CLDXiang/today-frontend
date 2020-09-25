<template>
  <content class="content-box">
    <section class="center-content">
      <div>技术重构中，敬请期待 😊</div>
      <div>预计于本学期期中退课前上线</div>
    </section>
    <footer class="bottom-content">
      如果你希望关注项目进度，在这里联系我们：
      <br>
      TODO: 这里放二维码
    </footer>
  </content>
</template>

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
  }
}
</style>
