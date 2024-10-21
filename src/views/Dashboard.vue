<!-- src/pages/Dashboard.vue -->
<template>
  <!-- Navbar at the top of the page -->
  <Navbar />

  <!-- Main content area with sidebar and page content -->
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content area for the Dashboard page -->
    <main class="flex-1 p-6">
      <h1 class="text-3xl font-bold mb-4">Dashboard</h1>

      <!-- Dashboard content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card for Total Students -->
        <div class="p-6 bg-white rounded-lg shadow-lg flex items-center">
          <span class="text-4xl mr-4">👩‍🎓</span>
          <div>
            <h3 class="text-lg font-semibold mb-2">Total Students</h3>
            <p class="text-2xl font-bold">{{ totalStudents }}</p>
          </div>
        </div>

        <!-- Card for Total Teachers -->
        <div class="p-6 bg-white rounded-lg shadow-lg flex items-center">
          <span class="text-4xl mr-4">👨‍🏫</span>
          <div>
            <h3 class="text-lg font-semibold mb-2">Total Teachers</h3>
            <p class="text-2xl font-bold">{{ totalTeachers }}</p>
          </div>
        </div>

        <!-- Card for Active Classes -->
        <div class="p-6 bg-white rounded-lg shadow-lg flex items-center">
          <span class="text-4xl mr-4">📚</span>
          <div>
            <h3 class="text-lg font-semibold mb-2">Active Courses</h3>
            <p class="text-2xl font-bold">{{ activeClasses }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Footer at the bottom of the page -->
  <Footer />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";

const totalStudents = ref(0); // Placeholder for total students
const totalTeachers = ref(0); // Placeholder for total teachers
const activeClasses = ref(0); // Placeholder for active classes

// Fetch total teachers from the API
const fetchTeachersCount = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/teachers/");
    const data = await response.json();
    totalTeachers.value = data.length; // Assuming the API returns a list of teachers
  } catch (error) {
    console.error("Error fetching teachers:", error);
  }
};

// Fetch the data when the component is mounted
onMounted(() => {
  fetchTeachersCount();
  // Fetch other data like total students and active classes as needed
});
</script>
