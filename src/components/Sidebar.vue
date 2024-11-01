<script setup>
import useLogout from "@/composables/useLogout";

const { logout } = useLogout();
</script>

<template>
  <aside class="w-64 bg-blue-900 p-6 text-white shadow-lg">
    <router-link to="/dashboard">
      <h2 class="text-2xl font-bold mb-6">E-<span>Learning</span></h2>
    </router-link>
    <nav class="mt-4">
      <ul>
        <li>
          <router-link
            to="/subjects"
            class="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-blue-800"
          >
            <i class="fas fa-book-open mr-3"></i>
            <span>Subjects</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/courses"
            class="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-blue-800"
          >
            <i class="fas fa-user-graduate mr-3"></i>
            <span>Students</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/modules"
            class="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-blue-800"
          >
            <i class="fas fa-pencil-alt mr-3"></i>
            <span>Assessments</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/module-contents"
            class="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-blue-800"
          >
            <i class="fas fa-school mr-3"></i>
            <span>Classroom</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/course"
            class="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-blue-800"
          >
            <i class="fas fa-user-circle mr-3"></i>
            <span>Profile</span>
          </router-link>
        </li>
        <li>
          <button
            @click="logout"
            class="flex items-center py-2 px-4 w-full text-left rounded transition-colors duration-200 hover:bg-red-600"
          >
            <i class="fas fa-sign-out-alt mr-3"></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
aside {
  transition: transform 0.3s ease;
}
</style>
