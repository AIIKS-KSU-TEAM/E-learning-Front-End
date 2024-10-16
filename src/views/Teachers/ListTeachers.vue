<template>
  <Navbar />
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />

    <div class="flex-1 p-6">
      <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Teacher List</h2>

        <router-link to="/create-teacher">
          <button
            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 mb-4"
          >
            Add Teacher
          </button>
        </router-link>
        <table class="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
          <thead>
            <tr class="bg-gray-200">
              <th class="py-2 px-4 text-left">First Name</th>
              <th class="py-2 px-4 text-left">Last Name</th>
              <th class="py-2 px-4 text-left">Subject</th>
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="teacher in teachers"
              :key="teacher.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-2 px-4">{{ teacher.first_name }}</td>
              <td class="py-2 px-4">{{ teacher.last_name }}</td>
              <td class="py-2 px-4">{{ teacher.subject }}</td>
              <td class="py-2 px-4 flex space-x-2">
                <button
                  @click="startEditing(teacher)"
                  class="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Update
                </button>

                <button
                  @click="deleteTeacher(teacher.id)"
                  class="bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="editingTeacher" class="mt-6">
          <h3 class="text-xl font-semibold mb-4">Edit Teacher</h3>
          <form @submit.prevent="updateTeacher">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2" for="first_name"
                >First Name</label
              >
              <input
                v-model="teacherForm.first_name"
                id="first_name"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2" for="last_name"
                >Last Name</label
              >
              <input
                v-model="teacherForm.last_name"
                id="last_name"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2" for="subject"
                >Subject</label
              >
              <input
                v-model="teacherForm.subject"
                id="subject"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <button
              type="submit"
              class="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
            >
              Save Changes
            </button>
            <button
              type="button"
              @click="cancelEditing"
              class="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200 ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { onMounted } from "vue";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";
import { useTeachers } from "@/composables/useTeachers";

const {
  teachers,
  editingTeacher,
  teacherForm,
  fetchTeachers,
  startEditing,
  cancelEditing,
  updateTeacher,
  deleteTeacher,
} = useTeachers();

onMounted(fetchTeachers);
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th,
td {
  padding: 12px;
}
</style>
