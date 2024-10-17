<template>
  <aside class="w-64 bg-blue-900 p-6 text-white">
    <router-link to="/dashboard">
      <h2 class="text-2xl font-semibold">School ERP</h2>
    </router-link>
    <nav class="mt-6">
      <ul>
        <li>
          <router-link
            to="/students"
            class="flex items-center py-2 px-4 hover:bg-blue-700"
          >
            <i class="fas fa-user-graduate mr-2"></i> Students
          </router-link>
        </li>
        <li>
          <router-link
            to="/teacher"
            class="flex items-center py-2 px-4 hover:bg-blue-700"
          >
            <i class="fas fa-chalkboard-teacher mr-2"></i> Teachers
          </router-link>
        </li>
        <li>
          <router-link
            to="/course-list"
            class="flex items-center py-2 px-4 hover:bg-blue-700"
          >
            <i class="fas fa-book mr-2"></i> Courses
          </router-link>
        </li>
        <li>
          <router-link
            to="/create-course"
            class="flex items-center py-2 px-4 hover:bg-blue-700"
          >
            <i class="fas fa-school mr-2"></i> Classes
          </router-link>
        </li>
        <li>
          <router-link
            to="/course"
            class="flex items-center py-2 px-4 hover:bg-blue-700"
          >
            <i class="fas fa-calendar-alt mr-2"></i> Module
          </router-link>
        </li>
        <li>
          <button
            @click="logout"
            class="block w-full text-left py-2 px-4 hover:bg-red-600"
          >
            <i class="fas fa-sign-out-alt mr-2"></i> Logout
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import useLogout from "../composables/useLogout";

const { logout } = useLogout();
</script>

<style scoped>
aside {
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}
</style>
