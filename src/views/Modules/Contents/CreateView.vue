<template>
  <Navbar />
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />

    <div class="flex-1 p-6">
      <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 class="text-3xl font-semibold mb-6">Create &lt;Module> Content </h1>

        <button @click="openModuleModal"
          class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
          Manage Content
        </button>

        <!-- Modal for Adding Content -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 class="text-xl font-semibold mb-4">Manage Content for &lt;Module></h2>

            <div class="mb-4 flex space-x-2">
              <button @click="addContent('text')"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                Add Text
              </button>
              <button @click="addContent('video')"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                Add Video
              </button>
              <button @click="addContent('image')"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                Add Image
              </button>
              <button @click="addContent('file')"
                class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
                Add File
              </button>
            </div>

            <!-- Content form -->
            <form @submit.prevent="submitContent" class="space-y-4">
              <div v-if="selectedContent === 'text'">
                <label class="block text-sm font-medium mb-2">Text Content</label>
                <textarea v-model="formData.content" class="w-full border border-gray-300 rounded px-3 py-2"
                  rows="3"></textarea>
              </div>

              <div v-if="selectedContent === 'video'">
                <label class="block text-sm font-medium mb-2">Video URL</label>
                <input type="url" v-model="formData.url" class="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div v-if="selectedContent === 'image'">
                <label class="block text-sm font-medium mb-2">Upload Image</label>
                <input type="file" @change="event => handleFileUpload(event, 'file')"
                  class="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div v-if="selectedContent === 'file'">
                <label class="block text-sm font-medium mb-2">Upload File</label>
                <input type="file" @change="event => handleFileUpload(event, 'file')"
                  class="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <button type="submit"
                class="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition duration-200">
                Save Content
              </button>
            </form>

            <button @click="closeModal"
              class="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200">
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
import { useRoute } from 'vue-router';
import axiosInstance from '@/axiosconfig/axiosInstance';
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Footer from "@/components/Footer.vue";

const route = useRoute()

const moduleId = route.params.id

const showModal = ref(false);

const selectedContent = ref('');

const formData = ref({
  title: '',
  content: '',
  url: '',
  file: null,
});

const resetForm = () => {
  formData.value = {
    title: '',
    content: '',
    url: '',
    file: null,
  }
}

onMounted(async () => {


});

const openModuleModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedContent.value = '';
  resetForm()
};

const addContent = (type) => {
  selectedContent.value = type;
};

const handleFileUpload = (event, type) => {
  const fileInput = event.target.files[0];
  formData.value[type] = fileInput;
};

const submitContent = async () => {

  const form = new FormData();

  if (selectedContent.value === 'text') {
    form.append('type', 'text');
    form.append('content', formData.value.content);
  } else if (selectedContent.value === 'video') {
    form.append('type', 'video');
    form.append('url', formData.value.url);
  } else if (selectedContent.value === 'image') {
    form.append('type', 'image');
    form.append('file', formData.value.file);
  } else if (selectedContent.value === 'file') {
    form.append('type', 'file');
    form.append('file', formData.value.file);
  }

  try {
    await axiosInstance.post(`course/modules/${moduleId}/content/`, form, {
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