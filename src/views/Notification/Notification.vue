<template>
  <div class="content-box">
    <div class="center-content">
      <div>技术重构中，敬请期待 😊</div>
    </div>
  </div>
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
