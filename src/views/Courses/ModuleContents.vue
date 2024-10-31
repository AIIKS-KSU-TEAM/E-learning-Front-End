<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <div class="flex">
      <!-- Sidebar -->
      <Sidebar />

      <div class="p-6 bg-gray-50 rounded-lg shadow-md flex-1">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">Module Contents</h2>

        <!-- Form to create content -->
        <form @submit.prevent="createContent" class="mb-6 space-y-4">
          <select
            v-model="newContent.moduleId"
            class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Module</option>
            <option v-for="module in modules" :key="module.id" :value="module.id">
              {{ module.title }}
            </option>
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

        <!-- List of contents -->
        <div class="grid grid-cols-1 gap-4">
          <div v-for="content in contents" :key="content.id" class="border border-gray-300 rounded-lg p-4 shadow-md">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-800">{{ content.content }} - {{ content.module.title }}</span>
              <div>
                <button
                  @click="editContent(content)"
                  class="border border-blue-500 text-blue-500 rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white transition duration-200"
                >
                  Edit
                </button>
                <button
                  @click="deleteContent(content.id)"
                  class="border border-red-500 text-red-500 rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition duration-200 ml-2"
                >
                  Delete
                </button>
                <button
                  @click="viewContent(content)"
                  class="border border-green-500 text-green-500 rounded-lg px-4 py-2 hover:bg-green-500 hover:text-white transition duration-200 ml-2"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import useModuleContents from '@/composables/useModuleContents';

export default {
  props: {
    moduleId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const {
      contents,
      newContent,
      modules,
      createContent,
      editContent,
      deleteContent,
      viewContent, // Function to view content details
    } = useModuleContents(props.moduleId);

    return {
      contents,
      newContent,
      modules,
      createContent,
      editContent,
      deleteContent,
      viewContent,
    };
  },
};
</script>
