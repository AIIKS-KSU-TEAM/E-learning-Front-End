<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/axiosconfig/axiosInstance';
import Navbar from '@/components/Navbar.vue';
import StdSidebar from '@/components/StdSidebar.vue';

const route = useRoute();
const contents = ref([]);
const assignments = ref([]); // New ref to store assignments
const moduleName = ref('');
const courseName = ref('');
const subjectName = ref('');
const currentContent = ref('Contents');

onMounted(async () => {
  try {
    // Fetch subject, course, and module names using route params
    const subjectResponse = await axiosInstance.get(`/api/subjects/${route.params.subjectId}/`);
    subjectName.value = subjectResponse.data.name;

    const courseResponse = await axiosInstance.get(`/api/courses/${route.params.courseId}/`);
    courseName.value = courseResponse.data.title;

    const moduleResponse = await axiosInstance.get(`/api/modules/${route.params.moduleId}/`);
    moduleName.value = moduleResponse.data.title;

    // Fetch contents for the specific module
    const contentResponse = await axiosInstance.get(`/api/modules/${route.params.moduleId}/contents`);
    contents.value = contentResponse.data;

    // Fetch assignments for the specific module
    const assignmentResponse = await axiosInstance.get(`/api/modules/${route.params.moduleId}/assignments/`);
    assignments.value = assignmentResponse.data;

    // Set the current page title based on the route
    if (route.name === 'contents') {
      currentContent.value = `Contents for ${moduleName.value} (${courseName.value} - ${subjectName.value})`;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
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
          /
          <router-link :to="`/subjects1/${route.params.subjectId}/courses/${route.params.courseId}/modules`" class="text-blue-500 hover:underline">
            {{ moduleName }}
          </router-link>
          / Content
        </h1>
        
        <!-- Display module contents -->
        <ul class="space-y-4">
          <li v-for="content in contents" :key="content.id" class="p-4 hover:bg-gray-200">
            <p class="text-gray-600">{{ content.content }}</p>
          </li>
        </ul>

        <!-- Display module assignments -->
        <h2 class="text-xl font-bold mt-8">Assignments</h2>
        <ul class="space-y-4">
  <li 
    v-for="assignment in assignments" 
    :key="assignment.id" 
    class="p-4 border border-gray-300 rounded-md bg-green-200 hover:bg-green-300" <!-- Updated colors -->
    <h3 class="text-lg font-semibold">{{ assignment.title }}</h3>
    <p class="text-gray-700">{{ assignment.description }}</p>
    <div v-if="assignment.file" class="mt-2">
      <a :href="assignment.file" target="_blank" class="text-blue-500 hover:underline">
        Download Assignment File
      </a>
    </div>
  </li>
</ul>

      </div>
    </div>
  </div>
</template>
