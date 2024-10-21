<template>
    <div class="container mx-auto p-8">
      <h1 class="text-4xl font-bold mb-6 text-gray-800">Course Contents</h1>
      <div v-if="loading" class="text-center text-blue-500">Loading...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
      <ul v-else class="space-y-6">
        <li
          v-for="content in contents"
          :key="content.id"
          class="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ content.title }}</h2>
          <p class="text-gray-700">{{ content.description }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axiosconfig/axiosInstance';  

  export default {
    data() {
      return {
        contents: [], 
        loading: true,
        error: null, 
      };
    },
    props: {
      courseId: {
        type: Number,
        required: true,
      },
    },
    mounted() {
      this.fetchCourseContents();
    },
    methods: {
      async fetchCourseContents() {
        try {
          const response = await axiosInstance.get(
            `api/course/courses/video/`
          );
          this.contents = response.data; 
        } catch (err) {
          this.error = "Failed to load contents. Please try again later."; 
          console.error(err);
        } finally {
          this.loading = false; 
        }
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  