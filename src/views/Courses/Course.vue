<template>
    <Navbar />
    <div class="flex min-h-screen bg-gray-100">
      <Sidebar />
  
      <div class="flex-1 p-6">
        <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 class="text-3xl font-semibold mb-6">Courses</h1>
          
          <ul class="space-y-4">
            <li 
              v-for="course in courses" 
              :key="course.id" 
              class="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm"
            >
              <span class="text-lg font-medium">{{ course.title }}</span>
              <button 
                @click="openModuleModal(course.id)" 
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Manage Content
              </button>
            </li>
          </ul>
  
          <!-- Modal for Adding Content -->
          <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 class="text-xl font-semibold mb-4">Manage Content for Course {{ selectedCourse }}</h2>
  
              <div class="mb-4 flex space-x-2">
                <button 
                  @click="addContent('text')" 
                  class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Add Text
                </button>
                <button 
                  @click="addContent('video')" 
                  class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Add Video
                </button>
                <button 
                  @click="addContent('image')" 
                  class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Add Image
                </button>
                <button 
                  @click="addContent('file')" 
                  class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Add File
                </button>
              </div>
  
              <!-- Content form -->
              <form @submit.prevent="submitContent" class="space-y-4">
                <div v-if="selectedContent === 'text'">
                  <label class="block text-sm font-medium mb-2">Text Content</label>
                  <textarea 
                    v-model="formData.text" 
                    class="w-full border border-gray-300 rounded px-3 py-2" 
                    rows="3"
                  ></textarea>
                </div>
  
                <div v-if="selectedContent === 'video'">
                  <label class="block text-sm font-medium mb-2">Video URL</label>
                  <input 
                    type="url" 
                    v-model="formData.video" 
                    class="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
  
                <div v-if="selectedContent === 'image'">
                  <label class="block text-sm font-medium mb-2">Upload Image</label>
                  <input 
                    type="file" 
                    @change="handleFileUpload('image')" 
                    class="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
  
                <div v-if="selectedContent === 'file'">
                  <label class="block text-sm font-medium mb-2">Upload File</label>
                  <input 
                    type="file" 
                    @change="handleFileUpload('file')" 
                    class="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
  
                <button 
                  type="submit" 
                  class="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
                >
                  Save Content
                </button>
              </form>
  
              <button 
                @click="closeModal" 
                class="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axiosInstance from '@/axiosconfig/axiosInstance';
  import Navbar from "@/components/Navbar.vue";
  import Sidebar from "@/components/Sidebar.vue";
  import Footer from "@/components/Footer.vue";
  
  const courses = ref([]);
  const showModal = ref(false);
  const selectedCourse = ref(null);
  const selectedContent = ref('');
  const formData = ref({
    text: '',
    video: '',
    image: null,
    file: null,
  });
  
  // Fetch courses on component mount
  onMounted(async () => {
    try {
      const response = await axiosInstance.get('course/courses/');
      courses.value = response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  });
  
  const openModuleModal = (courseId) => {
    selectedCourse.value = courseId;
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
    selectedContent.value = '';
    formData.value = {
      text: '',
      video: '',
      image: null,
      file: null,
    };
  };
  
  const addContent = (type) => {
    selectedContent.value = type;
  };
  
  const handleFileUpload = (type) => {
    const fileInput = event.target.files[0];
    formData.value[type] = fileInput;
  };
  
  const submitContent = async () => {
    const form = new FormData();
    form.append('course_id', selectedCourse.value);
  
    if (selectedContent.value === 'text') {
      form.append('content_type', 'text');
      form.append('text', formData.value.text);
    } else if (selectedContent.value === 'video') {
      form.append('content_type', 'video');
      form.append('video', formData.value.video);
    } else if (selectedContent.value === 'image') {
      form.append('content_type', 'image');
      form.append('image', formData.value.image);
    } else if (selectedContent.value === 'file') {
      form.append('content_type', 'file');
      form.append('file', formData.value.file);
    }
  
    try {
      await axiosInstance.post(`course/modules/${selectedCourse.value}/content/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Content added successfully');
      closeModal();
    } catch (error) {
      alert('Failed to add content');
      console.error('Error adding content:', error);
    }
  };
  </script>
  