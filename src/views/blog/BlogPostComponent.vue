<template>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else v-html="compiledMarkdown"></div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { marked }from 'marked';
  
  // 获取当前路由对象
  const route = useRoute();
  
  // 定义响应式数据
  const loading = ref(true);
  const error = ref(null);
  const markdownContent = ref('');
  
  // 计算属性来编译 Markdown 内容为 HTML
  const compiledMarkdown = computed(() => {
    return marked(markdownContent.value || '', { sanitize: true });
  });
  
  // 方法：获取数据
  const fetchData = async () => {
    try {
      error.value = null;
      loading.value = true;
  
      const response = await fetch(`/api/blog/${route.params.id}`);
      
      if (!response.ok) {
        throw new Error('网络响应失败');
      }
  
      const data = await response.json();
      markdownContent.value = data.content; // 假设返回的数据有一个 content 字段
  
      loading.value = false;
    } catch (err) {
      error.value = err.toString();
      loading.value = false;
    }
  };
  
  // 监听路由变化，当路由参数改变时重新获取数据
  watch(() => route.params.id, fetchData);
  
  // 组件挂载后立即获取数据
  onMounted(fetchData);
  </script>