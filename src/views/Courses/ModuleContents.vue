<template>
  <div>
    <Navbar />
    <div class="flex">
      <Sidebar />
      <div class="p-6 bg-gray-50 rounded-lg shadow-md flex-1">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Module Contents</h2>

        <button
          @click="showForm = !showForm"
          class="bg-blue-500 text-white rounded-lg p-3 mb-4 hover:bg-blue-600 transition duration-200"
        >
          {{ showForm ? 'Cancel' : 'Add Content' }}
        </button>

        <div v-if="showForm">
          <form @submit.prevent="createContent(newContent.contentType, newContent.content)" class="mb-6 space-y-4">
            <select
              v-model="newContent.contentType"
              class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Content Type</option>
              <option value="text">Text</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="file">File</option>
            </select>
            <textarea
              v-model="newContent.content"
              placeholder="Content"
              class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
            <button
              type="submit"
              class="bg-blue-500 text-white rounded-lg p-3 w-full hover:bg-blue-600 transition duration-200"
            >
              Add Content
            </button>
          </form>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="content in contents"
            :key="content.id"
            class="border border-gray-300 rounded-lg p-4 shadow-md"
          >
            <div class="mb-4">
              <span class="text-gray-800">
                <strong>{{ content.content_type | capitalize }}:</strong> {{ content.content }}
              </span>
            </div>
            <div class="flex space-x-2 mt-4"> <!-- Reduced spacing between buttons -->
              <button
                @click="editContent(content)"
                class="border border-blue-500 text-blue-500 rounded-lg px-3 py-1 hover:bg-blue-500 hover:text-white transition duration-200"
              >
                Edit
              </button>
              <button
                @click="deleteContent(content.id)"
                class="border border-red-500 text-red-500 rounded-lg px-3 py-1 hover:bg-red-500 hover:text-white transition duration-200"
              >
                Delete
              </button>
              <button
                @click="viewContent(content)"
                class="border border-green-500 text-green-500 rounded-lg px-3 py-1 hover:bg-green-500 hover:text-white transition duration-200"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import useModuleContents from '@/composables/useModuleContents';

const route = useRoute();
const moduleId = ref(route.params.moduleId);
const showForm = ref(false);

const {
  contents,
  newContent,
  modules,
  createContent,
  editContent,
  deleteContent,
  viewContent,
  fetchContents,
} = useModuleContents(moduleId);

onMounted(() => {
  fetchContents();
});
</script>
