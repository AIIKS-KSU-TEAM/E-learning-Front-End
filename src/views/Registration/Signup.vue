<script setup>
import useAuth from "@/composables/useAuth";

const { name, email, password, signup } = useAuth();
</script>

<template>
  <div class="bg-gray-500 h-screen flex flex-col">
    <div class="flex-grow flex items-center justify-center mt-10">
      <form
        @submit.prevent="signup"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full"
      >
        <img
          src="@/assets/images/logo.jpg"
          class="img-fluid rounded h-12 mx-auto"
          alt="AI AA NGO"
        />
        <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <div class="mb-4">
          <input
            v-model="name"
            type="text"
            placeholder="Name"
            class="input-field"
            required
          />
        </div>

        <div class="mb-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="input-field"
            required
          />
        </div>

        <div class="mb-4">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="input-field"
            required
          />
        </div>

        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-900 transition duration-300"
        >
          Sign Up
        </button>

        <p class="mt-4 text-center text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-500 hover:underline"
            >Log in</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #3b82f6;
  outline: none;
}
img {
  width: 100px;
  height: auto;
}
</style>
