<template>
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Modules</h2>
      <form @submit.prevent="createModule" class="mb-4">
        <select v-model="newModule.courseId" class="border rounded p-2 mr-2" required>
          <option value="">Select Course</option>
          <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</option>
        </select>
        <input v-model="newModule.title" type="text" placeholder="Module Title" class="border rounded p-2 mr-2" required />
        <textarea v-model="newModule.description" placeholder="Module Description" class="border rounded p-2 mr-2" required></textarea>
        <button type="submit" class="bg-blue-500 text-white rounded p-2">Add Module</button>
      </form>
      <ul>
        <li v-for="module in modules" :key="module.id" class="flex justify-between items-center border-b py-2">
          <span>{{ module.title }} - {{ module.course.title }}</span>
          <div>
            <button @click="editModule(module)" class="text-blue-500">Edit</button>
            <button @click="deleteModule(module.id)" class="text-red-500 ml-2">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axiosInstance from '@/axiosconfig/axiosInstance';
  
  export default {
    props: {
      courseId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        modules: [],
        newModule: {
          courseId: this.courseId,
          title: '',
          description: '',
        },
      };
    },
    created() {
      this.fetchModules();
    },
    methods: {
      async fetchModules() {
        const response = await axios.get(`api/modules/?courseId=${this.courseId}`);
        this.modules = response.data;
      },
      async createModule() {
        await axios.post('api/modules/', this.newModule);
        this.newModule = { courseId: this.courseId, title: '', description: '' };
        this.fetchModules();
      },
      async editModule(module) {
        const title = prompt("Edit Module Title", module.title);
        const description = prompt("Edit Module Description", module.description);
        if (title && description) {
          await axios.patch(`api/modules/${module.id}/`, { title, description });
          this.fetchModules();
        }
      },
      async deleteModule(id) {
        if (confirm("Are you sure you want to delete this module?")) {
          await axios.delete(`api/modules/${id}/`);
          this.fetchModules();
        }
      },
    },
  };
  </script>
  