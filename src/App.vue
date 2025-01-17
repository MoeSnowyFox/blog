<template>
  <BackGround />
  <div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import BackGround from './views/uni/BackGround.vue';

export default {
  components: {
    BackGround,
  },
};
</script>

<style scoped>
.content {
  position: fixed;
  top: 0;
  left: 50%;
  width: calc(100% - 20px);
  height: 100%;
  transform: translate(-50%, 0);
  z-index: 1;
  overflow: hidden;
}
</style>