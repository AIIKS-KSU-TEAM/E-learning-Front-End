<template>
  <div class="h-screen bg-gray-50 flex flex-col">
    <!-- Navbar at the top -->
    <Navbar />

    <div class="flex flex-1">
      <!-- Sidebar on the left -->
      <StdSidebar class="w-64 lg:w-72" />

      <!-- Main Content -->
      <div class="flex-1 p-8 space-y-6">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">All {{ currentSubject }}</h1>

        <!-- Subject List in Vertical Layout -->
        <ul class="space-y-4">
          <li
            v-for="subject in subjects"
            :key="subject.id"
            class="p-6 bg-white rounded-lg shadow-lg hover:shadow-l transition-all duration-200 border-l-4 border-blue-500"
          >
            <router-link
              :to="`/subjects1/${subject.id}/courses`"
              class="block text-blue-600"
            >
              <div class="flex items-center space-x-3">
                <i class="fas fa-book-open text-blue-500 text-xl"></i>
                <h3 class="text-xl font-semibold">{{ subject.name }}</h3>
              </div>
              <p class="mt-3 text-gray-600">{{ subject.description }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axiosInstance from '@/axiosconfig/axiosInstance';
import Navbar from '@/components/Navbar.vue';
import StdSidebar from '@/components/StdSidebar.vue';

const route = useRoute();
const subjects = ref([]);
const currentSubject = ref('Subjects');

onMounted(async () => {
  try {
    // Fetch the subjects list or update the title based on the route
    const response = await axiosInstance.get('/api/subjects/');
    subjects.value = response.data;

    // Set the current page title based on route
    if (route.name === 'subjects') {
      currentSubject.value = 'Subjects';
    }
  } catch (error) {
    console.error('Error fetching subjects:', error);
  }
});
</script>

<style scoped>
/* Additional styling for enhanced appearance */
h1 {
  color: #2d3748; /* Dark gray for the title */
}

ul {
  list-style-type: none;
  padding: 0;
}

li:hover {
  background-color: #f7fafc; /* Light gray background on hover */
}
</style>
