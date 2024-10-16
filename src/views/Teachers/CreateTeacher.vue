<template>
  <Navbar />
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 p-6">
      <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Add Teacher</h2>
        <form @submit.prevent="addTeacher" class="space-y-4">
          <div class="flex flex-col">
            <label for="first_name" class="text-sm font-medium"
              >First Name</label
            >
            <input
              v-model="newTeacher.first_name"
              id="first_name"
              placeholder="First Name"
              required
              class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex flex-col">
            <label for="last_name" class="text-sm font-medium">Last Name</label>
            <input
              v-model="newTeacher.last_name"
              id="last_name"
              placeholder="Last Name"
              required
              class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex flex-col">
            <label for="subject" class="text-sm font-medium">Subject</label>
            <input
              v-model="newTeacher.subject"
              id="subject"
              placeholder="Subject"
              required
              class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Teacher
          </button>
        </form>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref } from "vue";
import { useAddTeacher } from "@/composables/useAddTeacher";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";

const { newTeacher, addTeacher } = useAddTeacher();
</script>

<style scoped></style>
