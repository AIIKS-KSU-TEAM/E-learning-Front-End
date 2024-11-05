<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import useModuleContents from "@/composables/useModuleContents";
import axiosInstance from "@/axiosconfig/axiosInstance"; // Ensure you have axiosInstance imported

const route = useRoute();
const moduleId = ref(route.params.moduleId);
const showContentForm = ref(false);
const showAssignmentForm = ref(false);
const moduleTitle = ref(""); // State for module name

const {
  contents,
  newContent,
  newAssignment,
  createContent,
  createAssignment,
  editContent,
  deleteContent,
  viewContent,
  fetchContents,
} = useModuleContents(moduleId);

// Fetch contents and module name on mount
onMounted(async () => {
  await fetchContents();
  // Fetch module details separately
  try {
    const moduleResponse = await axiosInstance.get(
      `/api/modules/${moduleId.value}/`,
    );
    moduleTitle.value = moduleResponse.data.name; // Set the module name
  } catch (error) {
    console.error("Failed to fetch module details:", error);
  }
});
</script>
<template>
  <div>
    <Navbar />
    <div class="flex h-full">
      <Sidebar />
      <div class="p-6 bg-gray-50 rounded-lg shadow-md flex-1">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">
          {{ moduleTitle }} Module Contents
        </h2>

        <!-- Toggle buttons -->
        <button
          @click="showContentForm = !showContentForm"
          class="bg-blue-500 text-white rounded-lg p-3 mb-4 hover:bg-blue-600 transition duration-200"
        >
          {{ showContentForm ? "Cancel" : "Add Content" }}
        </button>
        <button
          @click="showAssignmentForm = !showAssignmentForm"
          class="bg-green-500 text-white rounded-lg p-3 mb-4 hover:bg-green-600 transition duration-200 ml-2"
        >
          {{ showAssignmentForm ? "Cancel Assignment" : "Add Assignment" }}
        </button>

        <!-- Forms -->
        <div v-if="showContentForm">
          <form
            @submit.prevent="
              createContent(newContent.contentType, newContent.content)
            "
            class="mb-6 space-y-4"
          >
            <select
              v-model="newContent.contentType"
              class="border border-gray-300 rounded-lg p-3 w-full"
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
              class="border border-gray-300 rounded-lg p-3 w-full"
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

        <div v-if="showAssignmentForm">
          <form
            @submit.prevent="
              createAssignment(newAssignment.title, newAssignment.file)
            "
            class="mb-6 space-y-4"
          >
            <input
              v-model="newAssignment.title"
              placeholder="Assignment Title"
              class="border border-gray-300 rounded-lg p-3 w-full"
              required
            />
            <input
              type="file"
              @change="handleFileUpload"
              class="border border-gray-300 rounded-lg p-3 w-full"
              required
            />
            <button
              type="submit"
              class="bg-green-500 text-white rounded-lg p-3 w-full hover:bg-green-600 transition duration-200"
            >
              Add Assignment
            </button>
          </form>
        </div>

        <!-- Display Contents and Assignments -->
        <div class="grid grid-cols-1 gap-4">
          <div
            v-for="content in contents"
            :key="content.id"
            :class="
              content.isAssignment
                ? 'border border-green-500 bg-green-100'
                : 'border border-gray-300'
            "
            class="rounded-lg p-4 shadow-md"
          >
            <div class="mb-4">
              <span class="text-gray-800">
                <strong
                  >{{
                    content.isAssignment
                      ? "ASSIGNMENT"
                      : content.content_type | capitalize
                  }}:</strong
                >
                {{ content.content || content.title }}
              </span>
            </div>
            <div class="flex space-x-2 mt-4">
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
