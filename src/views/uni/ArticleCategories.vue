<template>
  <div class="category-module box">
    <div class="category-header">文章分类</div>
    <ul v-if="!error && categories.length" class="category-list">
      <li v-for="(category, index) in categories" :key="index" class="category-item">
        <span class="category-name">{{ category.name }}</span>
        <span class="category-count-container">
          <span class="category-count-background"></span>
          <span class="category-count">{{ category.count }}</span>
        </span>
      </li>
    </ul>
    <p v-else-if="error" class="error-message">{{ error }}</p>
    <p v-else class="loading-message">加载中...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'CategoryModule',
  setup() {
    const categories = ref([]);
    const error = ref(null);

    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.snowyfox.icu/blog_categories');
        if (!response.ok) {
          throw new Error('网络响应无效');
        }
        const data = await response.json();
        categories.value = data;
      } catch (err) {
        error.value = `网络链接失败喵~`;
      }
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      categories,
      error,
    };
  },
};
</script>

<style scoped>
.category-module {
  width: 100%;
  max-width: 300px;
  margin: 20px;
  padding: 20px;
  background-color: rgba(255, 154, 153);
  border-radius: 20px; /* 圆角大小 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* 更深更宽的阴影 */
}

.category-header {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.category-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px; /* 添加边框颜色 */
  position: relative;
  transition: all 0.3s;
  border-radius: 50px;
  min-height: 48px; /* 设定一个最小高度 */
  flex: 1; /* 让每个 item 尽可能占用相同的空间 */
}

/* 添加在每个分类项之间的横线 */
.category-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 10%; /* 保证线条居中并且宽度为80% */
  right: 10%;
  bottom: -1px; /* 调整位置以适应底部边框 */
  height: 1px; /* 线条的高度 */
  background-color: #ccc; /* 线条的颜色 */
}

/* 确保文字不会影响高度 */
.category-name {
  text-align: left;
  font-size: 16px;
  color: rgba(255, 154, 153);
  flex-grow: 1;
  line-height: 1.2; /* 固定行高 */
  overflow: hidden; /* 防止多行 */
  white-space: nowrap; /* 强制单行 */
}

.category-item:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 40px;
  bottom: 0;
  background-color: #000000;
  border-radius: inherit;
  z-index: -1;
}

.category-name {
  text-align: left;
  font-size: 16px;
  color: rgba(255, 154, 153);
  flex-grow: 1;
}

.category-count-container {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-left: 16px;
}

.category-count-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #007bff;
  border-radius: 50%;
  z-index: -1;
}

.category-count {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.error-message,
.loading-message {
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: 20px;
}
</style>