<template>
  <Navbar />
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />

    <div class="flex-1 p-6">
      <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-semibold mb-4 text-center">
          {{ editing ? 'Edit Content' : 'Add New Content' }}
        </h2>

        <form @submit.prevent="saveContent">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Title:</label>
            <input type="text" v-model="form.title"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
              placeholder="Enter content title" required />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Description:</label>
            <textarea v-model="form.description"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
              placeholder="Enter content description" required></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Content Type:</label>
            <select v-model="form.content_type"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500"
              required>
              <option value="text">Text</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="file">File</option>
            </select>
          </div>
          <div>
            <input type="submit" :value="editing ? 'Update' : 'Create'"
              class="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200" />
          </div>
        </form>

        <div v-if="contents.length" class="mt-6">
          <h3 class="text-lg font-semibold mb-2">Existing Content</h3>
          <ul class="space-y-2">
            <li v-for="content in contents" :key="content.id"
              class="flex justify-between items-center p-4 border border-gray-300 rounded-md shadow-sm">
              <span>{{ content.title }}</span>
              <div>
                <button @click="editContent(content)"
                  class="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-200">
                  Edit
                </button>
                <button @click="deleteContent(content.id)"
                  class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200 ml-2">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axiosInstance from '@/axiosconfig/axiosInstance'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Sidebar from '@/components/Sidebar.vue'

const route = useRoute()

const module_id = route.params.module_id

const contents = ref([])
const editing = ref(false)
const form = ref({
  title: '',
  description: '',
  content_type: 'text'
})

const loadContents = async () => {
  try {
    const response = await axiosInstance.get(`api/course/modules/${module_id}/content/`)
    contents.value = response.data
  } catch (error) {
    console.error('Error loading content:', error)
  }
}

const saveContent = async () => {
  const url = editing.value
    ? `api/course/modules/${module_id}/content/${form.value.id}/`
    : `api/course/modules/${module_id}/content/`

  console.log(url);


  const method = editing.value ? 'put' : 'post'

  try {
    await axiosInstance[method](url, form.value)
    loadContents()
    editing.value = false
    form.value = { title: '', description: '', content_type: 'text' } // Reset the form
  } catch (error) {
    console.error('Error saving content:', error.response ? error.response.data : error.message)
  }
}

const editContent = (content) => {
  editing.value = true
  form.value = { ...content }
}

const deleteContent = async (contentId) => {
  try {
    await axiosInstance.delete(`api/course/modules/${module_id}/content/${contentId}/`)
    loadContents()
  } catch (error) {
    console.error('Error deleting content:', error)
  }
}

onMounted(() => {
  loadContents()
})
</script>

<style scoped>
/* Add any additional styles here if necessary */
</style>