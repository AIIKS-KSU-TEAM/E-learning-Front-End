<script setup>
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4">Welcome to School ERP</h1>
      <p class="text-lg mb-6">Your one-stop solution for managing school operations efficiently.</p>
      <div class="flex space-x-4">
        <router-link to="/login" class="bg-white text-blue-500 hover:bg-blue-100 font-semibold py-2 px-4 rounded transition duration-300">
          Login
        </router-link>
        <router-link to="/signup" class="bg-white text-blue-500 hover:bg-blue-100 font-semibold py-2 px-4 rounded transition duration-300">
          Signup
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
