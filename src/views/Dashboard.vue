<template>
      <Navbar />
  <div class="flex min-h-screen bg-gray-100">
    <aside class="w-64 bg-blue-900 p-6 text-white">
      <h2 class="text-2xl font-semibold">School ERP</h2>
      <nav class="mt-6">
        <ul>
          <li>
            <router-link to="/students" class="flex items-center py-2 px-4 hover:bg-blue-700">
              <i class="fas fa-user-graduate mr-2"></i> <!-- Student Icon -->
              Students
            </router-link>
          </li>
          <li>
            <router-link to="/teachers" class="flex items-center py-2 px-4 hover:bg-blue-700">
              <i class="fas fa-chalkboard-teacher mr-2"></i> <!-- Teacher Icon -->
              Teachers
            </router-link>
          </li>
          <li>
            <router-link to="/classes" class="flex items-center py-2 px-4 hover:bg-blue-700">
              <i class="fas fa-school mr-2"></i> <!-- Class Icon -->
              Classes
            </router-link>
          </li>
          <li>
            <router-link to="/subjects" class="flex items-center py-2 px-4 hover:bg-blue-700">
              <i class="fas fa-book mr-2"></i> <!-- Subject Icon -->
              Subjects
            </router-link>
          </li>
          <li>
            <router-link to="/timetable" class="flex items-center py-2 px-4 hover:bg-blue-700">
              <i class="fas fa-calendar-alt mr-2"></i> <!-- Timetable Icon -->
              Timetable
            </router-link>
          </li>
          <li>
            <button @click="logout" class="block w-full text-left py-2 px-4 hover:bg-red-600">
              <i class="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="flex-1 p-6">
      <h1 class="text-3xl font-bold mb-4">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Card Example -->
        <div class="bg-white shadow-md rounded-lg p-4">
          <div class="flex items-center">
            <i class="fas fa-user-graduate text-blue-500 text-3xl mr-3"></i>
            <div>
              <h3 class="text-lg font-semibold">Total Students</h3>
              <p class="text-gray-500">150</p>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4">
          <div class="flex items-center">
            <i class="fas fa-chalkboard-teacher text-blue-500 text-3xl mr-3"></i>
            <div>
              <h3 class="text-lg font-semibold">Total Teachers</h3>
              <p class="text-gray-500">20</p>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-md rounded-lg p-4">
          <div class="flex items-center">
            <i class="fas fa-school text-blue-500 text-3xl mr-3"></i>
            <div>
              <h3 class="text-lg font-semibold">Total Classes</h3>
              <p class="text-gray-500">10</p>
            </div>
          </div>
        </div>
      </div>
      <router-view />
    </main>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue'; // Adjust the path according to your project structure
import Footer from '@/components/Footer.vue'; // Adjust the path according to your project structure
</script>

<style scoped>
/* Optional styles for better visuals */
aside {
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
</style>
