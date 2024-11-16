<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/axiosconfig/axiosInstance';
import Navbar from '@/components/Navbar.vue';
import StdSidebar from '@/components/StdSidebar.vue';

const route = useRoute();
const courses = ref([]);
const subjectName = ref('');
const currentCourse = ref('Courses');

onMounted(async () => {
  try {
    // Fetch the subject name using the subjectId from route
    const subjectResponse = await axiosInstance.get(`/api/subjects/${route.params.subjectId}/`);
    subjectName.value = subjectResponse.data.name;

    // Fetch courses for the specific subject
    const response = await axiosInstance.get(`/api/subjects/${route.params.subjectId}/courses`);
    courses.value = response.data;

    // Set the current page title based on the route
    if (route.name === 'courses') {
      currentCourse.value = `Courses for ${subjectName.value}`;
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
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
          / Courses
        </h1>
        <ul class="space-y-4">
          <li
            v-for="course in courses"
            :key="course.id"
            class="p-4 bg-gray-100 rounded shadow hover:bg-gray-200"
          >
            <router-link :to="`/subjects1/${route.params.subjectId}/courses/${course.id}/modules`" class="text-lg font-semibold text-blue-500">
              {{ course.title }}
            </router-link>
            <p class="text-gray-600">{{ course.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
