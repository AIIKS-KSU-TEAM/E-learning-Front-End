<script setup>
import useAuth from "@/composables/useAuth";

const { email, password, login } = useAuth();

</script>

<template>
  <div>
    <div class="flex items-center justify-center min-h-screen bg-gray-500">
      <form @submit.prevent="login" class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <img src="@/assets/images/logo.jpg" class="img-fluid rounded h-12 mx-auto" alt="AI AA NGO" />
        <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <!-- <div class="mb-4">
          <label for="username" class="block text-md font-medium text-gray-700">Username:</label>
          <input v-model="username" type="text" id="username" placeholder="Enter your username"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required />
        </div> -->

        <div class="mb-4">
          <label for="email" class="block text-md font-medium text-gray-700">Email Address:</label>
          <input v-model="email" type="text" id="email" placeholder="Enter your email"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" type="password" id="password" placeholder="Enter your password"
            class="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required />
        </div>

        <button type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-300">
          Login
        </button>

        <p class="mt-4 text-center text-gray-600">
          Don't have an account?
          <router-link to="/signup" class="text-blue-500 hover:underline">Sign up</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100px;
  height: auto;
}
</style>
