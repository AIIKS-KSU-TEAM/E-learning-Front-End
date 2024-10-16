<script setup>
import { ref } from "vue";

const isNavbarCollapsed = ref(true);
const isSubMenuCollapsed = ref(true); // State for the sub-navbar menu
</script>

<template>
  <div class="bg-gradient-to-l from-white to-blue-900 py-1">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Location with Icon -->
      <div class="flex items-center text-white mt-1">
        <i class="fas fa-map-marker-alt mr-2"></i>
        <span class="hidden lg:inline">Nairobi, Kenya</span>
        <!-- Hidden on small screens -->
      </div>

      <div class="flex">
        <a href="/gallery" class="text-black mr-2">
          <button
            class="bg-transparent text-black border border-black py-1 px-4 rounded hover:bg-white hover:text-blue-600 transition duration-300 flex items-center"
          >
            <i class="fas fa-images d-inline-block lg:hidden"></i>
            <!-- Show only icon on small screens -->
            <span class="hidden lg:inline">Gallery</span>
            <!-- Show text only on large screens -->
          </button>
        </a>

        <a href="/contact" class="text-black">
          <button
            class="bg-transparent text-black border border-black py-1 px-4 rounded hover:bg-white hover:text-blue-600 transition duration-300 flex items-center"
          >
            <i class="fas fa-envelope d-inline-block lg:hidden"></i>
            <!-- Show only icon on small screens -->
            <span class="hidden lg:inline">Contact Us</span>
            <!-- Show text only on large screens -->
          </button>
        </a>
      </div>
    </div>
  </div>

  <nav class="bg-gray-800 sticky top-0">
    <div class="container mx-auto flex justify-between items-center p-4">
      <a class="navbar-brand flex items-center" href="/">
        <div class="flex items-center">
          <div class="text-2xl font-bold text-white">
            ER<span class="text-blue-500">P</span>
          </div>
          <div
            class="h-14 w-1 bg-gradient-to-b from-white to-blue-500 mx-2"
          ></div>
          <div class="text-left text-gray-200">
            <div class="text-sm">Precious Blood</div>
            <div class="text-sm">Girls, Riruta</div>
          </div>
        </div>
      </a>

      <button
        @click="isNavbarCollapsed = !isNavbarCollapsed"
        class="text-white focus:outline-none lg:hidden"
      >
        <i class="fas" :class="isNavbarCollapsed ? 'fa-bars' : 'fa-times'"></i>
        <!-- Hamburger icon -->
      </button>

      <div
        :class="['lg:flex', { hidden: isNavbarCollapsed }]"
        class="flex-grow"
      >
        <div class="flex justify-center flex-grow">
          <ul class="flex space-x-4">
            <li>
              <a class="text-gray-200 hover:text-white" href="/">Home</a>
            </li>
            <li>
              <a class="text-gray-200 hover:text-white" href="/about"
                >About Us</a
              >
            </li>
            <li>
              <a class="text-gray-200 hover:text-white" href="/impact"
                >Our Impact</a
              >
            </li>
            <li>
              <a class="text-gray-200 hover:text-white" href="/blog">Blog</a>
            </li>
          </ul>
        </div>
        <div class="ml-auto">
          <a href="/get-involved">
            <button
              class="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-green-600 transition duration-300"
            >
              Get Involved
            </button>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Custom styles can be added here if necessary */
</style>
