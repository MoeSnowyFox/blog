<template>
  <div class="about-container">
    <div class="content-boxes">
      <!-- 使用 :to 动态绑定路径, 并使用 :class 来动态绑定 'active' 类 -->
      <router-link 
        v-for="(path, index) in paths" 
        :key="index"
        :to="path.to" 
        :class="[path.class, {'current-page': currentPage === path.to}]"
        class="button"
      >
        {{ path.text }}
      </router-link>
    </div>
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    // 定义页面路径和文本
    const paths = [
      { to: '/page1', text: '跳转到页面1', class: '' },
      { to: '/page2', text: '跳转到页面2', class: '' },
      { to: '/page3', text: '跳转到页面3', class: '' }
    ];
    // 计算属性，用于获取当前页面路径
    const currentPage = computed(() => route.path);
    return {
      paths,
      currentPage
    };
  }
};
</script>
<style scoped>
.about-container {
  width: 100%;
  height: auto;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
}
.content-boxes {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 5px; /* 更加紧凑 */
}
.button {
  display: inline-flex;
  width: calc(100% - 10px);
  max-width: 250px; /* 更加紧凑 */
  height: 50px; /* 更加紧凑 */
  font-size: 16px; /* 更加紧凑 */
  color: #fff;
  background: rgba(255, 154, 153, 0.8); /* 半透明背景 */
  border: none;
  border-radius: 20px; /* 更加紧凑 */
  cursor: pointer;
  text-decoration: none;
  margin: 5px; /* 更加紧凑 */
  transition: background-color 0.3s ease, transform 0.3s ease;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 6px rgba(130, 130, 130, 0.1);
}
.button:hover {
  background-color: rgba(255, 172, 173, 0.75); /* 更深的半透明背景 */
  transform: translateY(-3px); /* 轻微上移 */
  box-shadow: 0 8px 16px rgba(230, 130, 130, 0.2); /* 新增阴影 */
}
.current-page {
  background-color: rgba(135, 206, 250, 0.5); /* 半透明蓝色 */
}
.current-page:hover {
  background-color: rgba(135, 206, 250, 0.5); /* 保持半透明蓝色，不改变 */
}
</style>