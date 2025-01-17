<template>
    <div class="container">
      <div class="about-container">
        <div class="about">
          <LeftPage />
        </div>
      </div>

      <div class="blog-list-container">
        <div class="blog-list">
          <BlogList />
        </div>
      </div>
    </div>

</template>

<script>
import LeftPage from '../uni/LeftPage.vue';
import BlogList from '../index/BlogList.vue';

export default {
  components: {
    LeftPage,
    BlogList,
  }
};
</script>

<style>
.container {
  display: flex;
}
.about-container {
  position: relative;
  width: 30%; /* Adjusted to take the remaining space */
  height: 100vh; /* Full viewport height */
  overflow-y: auto; /* Enable vertical scrolling */
  box-sizing: border-box;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.about-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.about {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  height: auto;
  box-sizing: border-box;
  overflow-y: auto;
}

.blog-list-container {
  position: relative;
  width: 70%; /* Adjusted to take the remaining space */
  height: 100vh; /* Full viewport height */
  overflow-y: auto; /* Enable vertical scrolling */
  box-sizing: border-box;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.blog-list {
  display: flex; /* 设置为 Flex 容器 */
  flex-direction: column; /* 子元素从上到下排列 */
  align-items: center; /* 水平居中对齐 */
  justify-content: center; /* 如果你希望内容在容器内垂直居中可以保留此属性 */
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin:  left; /* 使用 margin 自动调整左右外边距以实现水平居中 */
  box-sizing: border-box;
  overflow-y: auto;
}
.blog-list-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}



/* 当屏幕宽度小于750px时应用以下样式 */
@media (max-width: 950px) {
  .container {
    flex-direction: column;
  }
  .about-container {
    display: none;
    width: 0%;
  }
  .blog-list-container {
    width: 100%;
  }
}
</style>



