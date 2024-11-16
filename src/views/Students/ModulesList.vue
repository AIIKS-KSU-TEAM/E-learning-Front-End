<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/axiosconfig/axiosInstance';
import Navbar from '@/components/Navbar.vue';
import StdSidebar from '@/components/StdSidebar.vue';

const route = useRoute();
const modules = ref([]);
const courseName = ref('');
const subjectName = ref('');
const currentModule = ref('Modules');

onMounted(async () => {
  try {
    // Fetch subject and course names using route params
    const subjectResponse = await axiosInstance.get(`/api/subjects/${route.params.subjectId}/`);
    subjectName.value = subjectResponse.data.name;

    const courseResponse = await axiosInstance.get(`/api/courses/${route.params.courseId}/`);
    courseName.value = courseResponse.data.title;

    // Fetch modules for the specific course
    const response = await axiosInstance.get(`/api/courses/${route.params.courseId}/modules`);
    modules.value = response.data;

    // Set the current page title based on the route
    if (route.name === 'modules') {
      currentModule.value = `Modules for ${courseName.value} (${subjectName.value})`;
    }
  } catch (error) {
    console.error('Error fetching modules:', error);
  }
});
</script>

<template>
  <div class="h-screen bg-gray-50 flex flex-col">
    <!-- Navbar at the top -->
    <Navbar />

    <div class="flex flex-1">
      <!-- Sidebar on the left -->
      <StdSidebar class="w-64 lg:w-72" />

      <!-- Main Content -->
      <div class="flex-1 p-8 space-y-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          <router-link :to="`/subjects1`" class="text-blue-500 hover:underline">
            {{ subjectName }}
          </router-link>
          / 
          <router-link :to="`/subjects1/${route.params.subjectId}/courses`" class="text-blue-500 hover:underline">
            {{ courseName }}
          </router-link>
          / Modules
        </h1>
        <ul class="space-y-4">
          <li
            v-for="module in modules"
            :key="module.id"
            class="p-4 bg-gray-100 rounded shadow hover:bg-gray-200"
          >
            <router-link :to="`/subjects1/${route.params.subjectId}/courses/${route.params.courseId}/modules/${module.id}/contents`" class="text-lg font-semibold text-blue-500">
              {{ module.title }}
            </router-link>
            <p class="text-gray-600">{{ module.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
