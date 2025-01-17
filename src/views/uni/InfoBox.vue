<template>
        <div v-if="!error" class="stats-line">
        <div class="info-box">
            <span class="stat">文章数<br>{{ articleCount }}</span>
            <span class="stat">标签数<br>{{ tagCount }}</span>
            <span class="stat">类别数<br>{{ categoryCount }}</span>
        </div>
        </div>
        <div v-else class="error">
        <p class="info-box-error">{{ errorMessage }}</p>
        </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const articleCount = ref(0);
      const tagCount = ref(0);
      const categoryCount = ref(0);
      const error = ref(false);
      const errorMessage = ref('无法获取博客统计信息');
  
      const fetchBlogStats = async () => {
        try {
          const response = await fetch('https://api.snowyfox.icu/blog_info');
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const data = await response.json();
          articleCount.value = data.article_count || 0;
          tagCount.value = data.tag_count || 0;
          categoryCount.value = data.category_count || 0;
        } catch (err) {
          console.error('There has been a problem with your fetch operation:', err.message);
          error.value = true;
        }
      };
  
      onMounted(() => {
        fetchBlogStats();
      });
  
      return {
        articleCount,
        tagCount,
        categoryCount,
        error,
        errorMessage
      };
    }
  };
  </script>
  
  <style scoped>
    .stats-line {
        display: flex;
        justify-content: space-between; /* 确保子元素分别靠左、居中、靠右 */
        align-items: center;
        font-size: 18px;
        padding: 3px;

    }
    .info-box {
        width: 100%; /* 确保 .info-box 占据全部可用宽度 */
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 17px;
    }
  .info-box-error {
    font-size: 15px;
    color: pink;
  }
  </style>