<template>
  <div class="blog-list">
    <router-link v-if="!loading && !error "
                 v-for="(blog, index) in blogs"
                 :key="index"
                 :to="`/blog/${blog.id}`"
                 class="blog-item">
      <div class="blog-content"
           :style="{ backgroundImage: `url(${blog.image})` }"
           @error="handleImageError($event)">

            <h2 class="blog-title">{{ blog.title }}</h2>
            <p class="blog-info">{{ blog.info }}</p>
      </div>
    </router-link>
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <div v-if="error" class="error-message">获取博客列表失败喵~</div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';

export default {
  name: 'BlogList',
  setup() {
    const blogs = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const blogListRefreshTime = ref(0);
    const lastBlogListRefreshTime = ref(0);
    const localStorageKey = 'BlogList';
    const localStorageTimeKey = 'BlogListRefreshTime';


    const fetchBlogs = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetch(`https://api.snowyfox.icu/blog_list`);
            if (!response.ok) {
                throw new Error(`喵呜~获取博客列表失败：${response.statusText}`);
            }
            const data = await response.json();
            loading.value = false;
            return data;
        } catch (err) {
            error.value = err.message;
            return null;
        }
    };

    const fetchBlogsRefreshTime = async () => {
        error.value = null;
        try {
            const response = await fetch(`https://api.snowyfox.icu/blog_list_refresh_time`);
            if (!response.ok) {
                throw new Error(`喵~获取刷新时间失败：${response.statusText}`);
            }
            const data = await response.json();
            blogListRefreshTime.value = data.refresh_time;
        } catch (err) {
            error.value = err.message;
            return;
        }
      
        try{
          lastBlogListRefreshTime.value = localStorage.getItem(localStorageTimeKey) || 0;
        }catch(err){
          error.value = '喵~ 暂无缓存时间数据';
        }
        await updateBlogs();
    };

    const updateBlogs = async () => {
        if (blogListRefreshTime.value >= lastBlogListRefreshTime.value) {
            const fetchedBlogs = await fetchBlogs();
            if(fetchedBlogs){
                blogs.value = fetchedBlogs;
                try {
                    localStorage.setItem(localStorageKey, JSON.stringify(fetchedBlogs));
                    localStorage.setItem(localStorageTimeKey, blogListRefreshTime.value);
                } catch (err) {
                    error.value = '喵~ 缓存数据失败';
                }
            }
        } else {
             try {
                const cachedBlogs = localStorage.getItem(localStorageKey);
                if (cachedBlogs) {
                  blogs.value = JSON.parse(cachedBlogs);
                } else {
                  const fetchedBlogs = await fetchBlogs();
                  if(fetchedBlogs){
                    blogs.value = fetchedBlogs;
                  }
                }
              } catch (err) {
                error.value = '喵~读取缓存数据失败';
             }
        }
    }

    onMounted(() => {
        fetchBlogsRefreshTime();
    });

    
    return {
      blogs,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.blog-item {
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.blog-content {
  position: relative;
  height: 130px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;
  background-color: #f0f0f0; /* Fallback background color */
}

.blog-content:hover {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
}

.blog-title {
  font-size: 1.2em;
  margin: 0;
}

.blog-info {
  margin: 0;
  font-size: 0.9em;
}

.loading-indicator {
  text-align: center;
  color: #777;
}

.error-message {
  text-align: center;
  color: red;
}
</style>



