<script setup>
import { ref } from "vue";

const isNavbarCollapsed = ref(true);
const isSubMenuCollapsed = ref(true);
</script>

<template>
  <div class="bg-gradient-to-l from-white to-blue-900 py-2">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Location with Icon -->
      <div class="flex items-center text-white mt-1">
        <i class="fas fa-map-marker-alt mr-2"></i>
        <span class="hidden lg:inline">Kisii, Kenya</span>
      </div>

      <div class="flex">
        <a href="/contact" class="text-black">
          <button
            class="bg-transparent text-black border border-black py-1 px-4 rounded hover:bg-white hover:text-blue-600 transition duration-300 flex items-center"
          >
            <i class="fas fa-envelope d-inline-block lg:hidden"></i>
            <span class="hidden lg:inline">Contact Us</span>
          </button>
        </a>
      </div>
    </div>
  </div>

  <nav class="bg-gray-800 sticky top-0 z-50">
    <div class="container mx-auto flex justify-between items-center p-4">
      <a class="navbar-brand flex items-center" href="/home">
        <div class="flex items-center">
          <div class="text-2xl font-bold text-white">
            <span class="text-blue-500">Kisii University</span>
          </div>
          <div
            class="h-14 w-1 bg-gradient-to-b from-white to-blue-500 mx-2"
          ></div>
          <div class="text-left text-gray-200">
            <div class="text-sm">University of The</div>
            <div class="text-sm">21st Centuary</div>
          </div>
        </div>
      </a>

      <button
        @click="isNavbarCollapsed = !isNavbarCollapsed"
        class="text-white focus:outline-none lg:hidden"
      >
        <i class="fas" :class="isNavbarCollapsed ? 'fa-bars' : 'fa-times'"></i>
      </button>

      <div
        :class="['lg:flex', { hidden: isNavbarCollapsed }]"
        class="flex-grow"
      >
        <div class="flex justify-center flex-grow">
          <ul class="flex space-x-4">
            <li>
              <a
                class="text-gray-200 hover:text-white flex items-center"
                href="/home"
              >
                <i class="fas fa-home mr-1"></i> Home
              </a>
            </li>
            <li>
              <a
                class="text-gray-200 hover:text-white flex items-center"
                href="/about"
              >
                <i class="fas fa-info-circle mr-1"></i> About Us
              </a>
            </li>
            <li>
              <a
                class="text-gray-200 hover:text-white flex items-center"
                href="/course"
              >
                <i class="fas fa-book-open mr-1"></i> Our Courses
              </a>
            </li>
          </ul>
        </div>
        <div class="ml-auto">
          <a href="/register">
            <button
              class="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-green-600 transition duration-300"
            >
              Resources
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
