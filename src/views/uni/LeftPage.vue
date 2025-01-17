<template>
  <div class="about-container">
    <div class="profile-picture">
      <img src="/pic/mine.jpeg" alt="Profile Picture" />
    </div>
    <div class="content-boxes">
      <div class="box">
        <BlogInfo />
      </div>

      <div class="logo-box">
    <!-- 手动定义每个圆形图标和链接 -->
        <a href="https://example.com/1" target="_blank" class="circle-icon" style="--bg-color: #ffcccc;">
          <img src="/logo/bilibili.svg" alt="Bilibili Logo" class="logo" />
        </a>
        <a href="https://example.com/2" target="_blank" class="circle-icon" style="--bg-color: #ccffcc;">
          <img src="/logo/github.svg" alt="GitHub Logo" class="logo" />
        </a>
        <a href="https://example.com/3" target="_blank" class="circle-icon" style="--bg-color: #ccccff;">
          <img src="/logo/weibo.svg" alt="Weibo Logo" class="logo" />
        </a>
      </div>

      <RouterLink />
      <ArticleCategories />

      <div class="box">

      </div>
    </div>
  </div>
</template>

<script>
import BlogInfo from './InfoBox.vue';
import RouterLink from './RouterLink.vue'
import ArticleCategories from './ArticleCategories.vue'

export default {
  components: {
    BlogInfo,
    RouterLink,
    ArticleCategories,
  }
};
</script>

<style scoped>
.padding {
  height: 20px;
}
.about-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
}

.profile-picture img {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
}

.content-boxes {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.box {
  background-color: rgba(239, 228, 228, 0.473);
  border-radius: 15px;
  width: calc(100% - 20px);
  max-width: 300px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  burring: 10px;
}

.logo-box {
  background-color: rgba(239, 228, 228, 0.473);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  gap: 10px; /* 间距 */
  padding: 10px;
  width: calc(100% - 20px);
  max-width: 300px;
  flex-wrap: wrap; /* 允许换行 */
}

.circle-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px; /* 固定大小 */
  height: 50px; /* 固定大小 */
  background-color: var(--bg-color);
  border-radius: 50%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.circle-icon:hover {
  transform: translateY(-3px); /* 轻微上移 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 新增阴影 */
}

.circle-icon:hover {
  background-color: #e0e0e0; /* 悬停时的背景颜色 */
}

.logo {
  width: 40px; /* 固定大小 */
  height: 40px; /* 固定大小 */
}

</style>
