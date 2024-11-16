<template>
    <div class="h-full bg-gray-800 text-white flex flex-col w-64 lg:w-72">
      <!-- Logo or Title -->
      <div class="px-6 py-4 text-2xl font-bold text-center border-b border-gray-700">
        Elearning Portal
      </div>
  
      <!-- Navigation Links -->
      <nav class="flex-1 px-4 py-6 space-y-4">
        <router-link
          to="/subjects1"
          class="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          <i class="fas fa-book text-xl mr-3"></i>
          View Courses
        </router-link>
  
        <router-link
          to="/assignments"
          class="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          <i class="fas fa-file-upload text-xl mr-3"></i>
          Submit Assignments
        </router-link>
  
        <router-link
          to="/stdprofile"
          class="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          <i class="fas fa-user text-xl mr-3"></i>
          Change Profile
        </router-link>
  
        <router-link
          to="/stdclassroom"
          class="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          <i class="fas fa-chalkboard-teacher text-xl mr-3"></i>
          Classroom
        </router-link>
  
        <router-link
          to="/support"
          class="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          <i class="fas fa-headset text-xl mr-3"></i>
          Support
        </router-link>
      </nav>
  
      <!-- Logout -->
      <div class="p-4 border-t border-gray-700">
        <button
          @click="logout"
          class="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded-lg w-full text-left"
        >
          <i class="fas fa-sign-out-alt text-xl mr-3"></i>
          Logout
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineComponent } from 'vue';
  import useLogout from '@/composables/useLogout';
  
  const { logout } = useLogout();
  
  defineComponent({});
  </script>
  