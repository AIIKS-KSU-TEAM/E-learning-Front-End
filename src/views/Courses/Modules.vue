<template>
  <Navbar />
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div class="flex-1 p-6">
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">
        {{ courseTitle }} / Modules
        </h2>

        <button 
          @click="toggleCreateForm" 
          class="bg-blue-500 text-white rounded-lg p-3 mb-4 hover:bg-blue-600 transition duration-200 flex items-center"
        >
          <span v-if="showCreateForm">❌</span>
          <span v-else class="hidden md:inline">Create Module</span>
        </button>

        <form 
          v-if="showCreateForm" 
          @submit.prevent="isEditing ? updateModuleHandler() : createModuleHandler()" 
          class="mb-6 space-y-4"
        >
          <select 
            v-model="newModule.courseId" 
            class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required
          >
            <option value="">Select Course</option>
            <option v-for="course in courses" :key="course.id" :value="course.id">
              {{ course.title }}
            </option>
          </select>
          <input
            v-model="newModule.title"
            type="text"
            placeholder="Module Title"
            class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            v-model="newModule.description"
            placeholder="Module Description"
            class="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
          <button 
            type="submit" 
            class="bg-blue-500 text-white rounded-lg p-3 w-full hover:bg-blue-600 transition duration-200"
          >
            {{ isEditing ? 'Update Module' : 'Add Module' }}
          </button>
        </form>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="module in modules" 
            :key="module.id" 
            class="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <h3 class="font-semibold text-lg text-gray-800">{{ module.title }}</h3>
              <p class="text-gray-600">{{ module.description }}</p>
            </div>
            <div class="mt-4 flex space-x-2">
              <button 
                @click="startEditModule(module)" 
                class="border border-blue-500 text-blue-500 rounded-lg px-4 py-2 hover:bg-blue-500 hover:text-white transition duration-200 flex items-center"
              >
                <span class="hidden md:inline">Edit</span>
                <span class="inline md:hidden">🖉</span>
              </button>
              <button 
                @click="deleteModuleHandler(module.id)" 
                class="border border-red-500 text-red-500 rounded-lg px-4 py-2 hover:bg-red-500 hover:text-white transition duration-200 flex items-center"
              >
                <span class="hidden md:inline">Delete</span>
                <span class="inline md:hidden">🗑️</span>
              </button>
              <button 
                @click="viewModule(module.id)" 
                class="border border-green-500 text-green-500 rounded-lg px-4 py-2 hover:bg-green-500 hover:text-white transition duration-200 flex items-center"
              >
                <span class="hidden md:inline">View</span>
                <span class="inline md:hidden">👁️</span>
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
import { useRouter, useRoute } from 'vue-router';
import useModules from '@/composables/useModules';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import axiosInstance from '@/axiosconfig/axiosInstance'; // Make sure to import axios for fetching course details

const route = useRoute();
const router = useRouter();
const courseId = ref(route.params.courseId);
const newModule = ref({ courseId: '', title: '', description: '' });
const showCreateForm = ref(false);
const isEditing = ref(false);
const courseTitle = ref('');


const { courses, modules, createModule, updateModule, deleteModule, fetchModulesByCourse } = useModules();

const toggleCreateForm = () => {
  showCreateForm.value = !showCreateForm.value;
  if (!showCreateForm.value) {
    newModule.value = { courseId: '', title: '', description: '' };
    isEditing.value = false;
  }
};

const startEditModule = (module) => {
  newModule.value = { ...module };
  isEditing.value = true;
  showCreateForm.value = true;
};

const createModuleHandler = () => {
  newModule.value.courseId = courseId.value;
  createModule(newModule.value, courseId.value);
  toggleCreateForm();
};

const updateModuleHandler = () => {
  updateModule(newModule.value.id, newModule.value, courseId.value);
  toggleCreateForm();
};

const deleteModuleHandler = (moduleId) => {
  deleteModule(moduleId, courseId.value);
};

const viewModule = (moduleId) => {
  console.log('Navigating to module with ID:', moduleId); 
  router.push({ name: 'ModuleContents', params: { moduleId } });
};

// Fetch course title based on courseId
const fetchCourseTitle = async (courseId) => {
  try {
    const response = await axiosInstance.get(`api/courses/${courseId}/`);
    return response.data.title; // Assuming the course title is in the response
  } catch (error) {
    console.error('Failed to fetch course title:', error);
    return '';
  }
};

const fetchCourseDetails = async () => {
  courseTitle.value = await fetchCourseTitle(courseId.value);
};

onMounted(() => {
  fetchModulesByCourse(courseId.value);
  fetchCourseDetails();
});
</script>
